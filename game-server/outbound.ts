// This file defines types for WebSocket messages that are sent from the server to the client
// For types of WebSocket messages received by the server from the client refer to src/lib/game/server/validation.ts

import { Cell, GameSessionSettings, NonceEvent } from "./common";

export type BoardData = {
    id: string;
    board: Cell[][];
};

// Board Events
export type BoardUpdateEvent = {
    type: "update";
    data: BoardData;
};

export type BoardEvent = {
    type: "board-event";
    data: BoardUpdateEvent;
};

// Game events
export type GameStartEvent = {
    type: "start";
    data: {
        boards: BoardData[];
    };
};

export type GameEndEvent = {
    type: "end";
    data: {
        boards: BoardData[];
    };
};

export type GameEvent = {
    type: "game-event";
    data: GameStartEvent | GameEndEvent | BoardEvent;
};

// Session events
export type SettingsUpdateEvent = {
    type: "settings-update";
    data: GameSessionSettings;
};

export type ChatMessageEvent = {
    type: "chat-message";
    data: {
        from: string;
        message: string;
    };
};

export type SessionEvent = {
    type: "session-event";
    data: SettingsUpdateEvent | ChatMessageEvent | GameEvent;
} & NonceEvent;

export type NoSessionEvent = {
    type: "no-session";
    data: {
        message: string;
    };
};

export type UnknownSessionEvent = {
    type: "unknown-session";
    data: {
        message: string;
    };
};

export type SessionErrorEvent = {
    type: "session-error";
    data: NoSessionEvent | UnknownSessionEvent;
} & NonceEvent;

// Server Events
export type ServerError = {
    type: "server-error";
    data: {
        message: string;
    };
};

export type InvalidMessageEvent = {
    type: "invalid-message";
    data: {
        message: string;
    };
};

export type ErrorEvent = {
    type: "error";
    data: ServerError | InvalidMessageEvent;
} & NonceEvent;

export type ConnectEvent = {
    type: "connect";
    data: {
        status: "success" | "error";
        message: string;
    };
} & NonceEvent;

export type DisconnectSuccessEvent = {
    type: "disconnect-success";
    data: {
        message: string;
    };
} & NonceEvent;

export type Event =
    | ErrorEvent
    | ConnectEvent
    | DisconnectSuccessEvent
    | SessionErrorEvent
    | SessionEvent;
