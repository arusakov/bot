import * as request from "request-promise";

import * as Hermes from "./hermes";

const SID = (process.env as any).SID; 

/* tslint:disable:no-console */

export class HandlerBase {


    onUpdateEventNew = function* (update: Hermes.UpdateEventNew) {
        const { event } = update;
        console.log(`UpdateEventNew from user${event.senderId} to ${event.peer.type}${event.peer.peerId}`);
        console.log(`Text: ${event.text}`);

        if (event.peer.type === "group") {
            const resp = yield this.post("https://hermes.techops.ru/api/chats/send", {
                peer: event.peer,
                randomId: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
                text: `echo bot: ${event.text}`,
            });
            console.log(resp);
        }

    };
    onUpdateUserStatus = (update: Hermes.UpdateUserStatus): void => {
        console.log(update.id, update.status.type);
    }

    protected post<Req, Res>(url: string, data: Req): request.RequestPromise {
        return request.post(url, {
            body: data,
            headers: {
                Authorization: `sid ${SID}`,
            },
            json: true,
        });
    }
}
