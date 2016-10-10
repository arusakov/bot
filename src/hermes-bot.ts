import { createConnection } from "ws";
import { wrap } from "co";

import * as Hermes from "./hermes";
import { HandlerBase } from "./HandlerBase";

const API_VERSION = 27;
const SID = (process.env as any).SID;
const HOST = "hermes.techops.ru";

const ws = createConnection(`wss://${HOST}/api/listen?sid=${SID}&version=${API_VERSION}`, () => {
    /* tslint:disable:no-console */
    console.log("WebSocket connected");
    /* tslint:disable:no-console */
});

const handlers: HandlerBase[] = [];

handlers.push(new HandlerBase());

ws.on("error", (err: Error) => {
    console.error(err);
});

function parseJSON<T>(str: string): T|null {
    try {
        return JSON.parse(str);
    } catch (e) {
        // do nothing
    }
    return null;
}

ws.on("message", (data: string) => {
    const update = parseJSON<Hermes.Update>(data);
    if (!update) {
        return;
    }
    switch (update.type) {
        case Hermes.UPDATE_TYPE_EVENT_NEW:
            handlers.forEach((h) => wrap(h.onUpdateEventNew.bind(h, update))());
            break;
        case Hermes.UPDATE_TYPE_USER_STATUS:
            handlers.forEach((h) => h.onUpdateUserStatus(update));
            break;
        default:
            /* tslint:disable:no-console */
            console.log(`Unhandled Update type = ${(update as any).type}`, update);
            /* tslint:enable:no-console */
            break;
    }
});
