export type Int64 = number;

export const PEER_TYPE_GROUP: "group" = "group";
export const PEER_TYPE_USER: "user" = "user";

export type PeerGroup = {
    type: typeof PEER_TYPE_GROUP;
    peerId: Int64;
}
export type PeerUser = {
    type: typeof PEER_TYPE_GROUP;
    peerId: Int64;
}
export type Peer = PeerGroup | PeerUser;

export const EVENT_TYPE_MESSAGE: "message" = "message";

export type EventType = typeof EVENT_TYPE_MESSAGE;



export type Event = {
    type: EventType;
    senderId: Int64;
    peer: Peer;
    text: string;
}

export const STATUS_OFFLINE: "offline" = "offline";
export const STATUS_ONLINE: "online" = "online";

export type UserStatusOffline = { type: typeof STATUS_OFFLINE; seenAt: Date; }
export type UserStatusOnline = { type: typeof STATUS_ONLINE; }

export type UserStatus = UserStatusOffline | UserStatusOnline;

export const UPDATE_TYPE_EVENT_NEW: "UpdateEventNew" = "UpdateEventNew";
export const UPDATE_TYPE_USER_STATUS: "UpdateUserStatus" = "UpdateUserStatus";


export type UpdateEventNew = {
    type: typeof UPDATE_TYPE_EVENT_NEW;
    event: Event;
    useq: number;
}

export type UpdateUserStatus = {
    type: typeof UPDATE_TYPE_USER_STATUS;
    id: Int64;
    status: UserStatus;
}

export type Update = UpdateEventNew | UpdateUserStatus;

