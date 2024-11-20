// This file defines types for WebSocket messages that are sent from the server to the client
// For types of WebSocket messages received by the server from the client refer to src/lib/game/server/validation.ts

import { Cell, GameSessionSettings } from "./common";

// Game events
export type BoardUpdateEvent = {
    type: "board-update";
    data: {
        id: string;
        board: Cell[][];
    };
};

export type GameUpdateType = BoardUpdateEvent; // add more in future

// Session events
export type SessionSettingsUpdateEvent = {
    type: "settings-update";
    data: GameSessionSettings;
};

export type GameStartEvent = {
    type: "game-start";
    data: {
        boards: {
            id: string;
            cells: Cell[][];
        }[];
    };
};

export type GameUpdateEvent = {
    type: "game-update";
    data: GameUpdateType;
};

export type GameEndEvent = {
    type: "game-end";
    data: {
        boards: { id: string; board: Cell[][] }[];
    };
};

export type ChatMessageEvent = {
    type: "chat-message";
    data: {
        from: string;
        message: string;
    };
};

export type SessionEventType =
    | SessionSettingsUpdateEvent
    | GameStartEvent
    | GameUpdateEvent
    | GameEndEvent
    | ChatMessageEvent;

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

export type ConnectEvent = {
    type: "connect";
    data: {
        status: "success" | "error";
        message: string;
    };
};

export type DisconnectSuccessEvent = {
    type: "disconnect-success";
    data: {
        message: string;
    };
};

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

export type SessionEvent = {
    type: "session-event";
    data: SessionEventType;
};

export type Event =
    | ServerError
    | InvalidMessageEvent
    | ConnectEvent
    | DisconnectSuccessEvent
    | NoSessionEvent
    | UnknownSessionEvent
    | SessionEvent;
