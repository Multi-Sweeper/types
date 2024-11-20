export enum GameSessionStatus {
    LOBBY = "LOBBY",
    PLAYING = "PLAYING",
    END = "END",
}

export type GameSessionSettings = {
    maxPlayers: number;
    maxSpectators: number;
    lives: number;
};

export type CellOpened = {
    type: "opened";
    value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
};

export type CellUnknown = {
    type: "unknown";
};

export type CellFlag = {
    type: "flag";
};

export type CellBomb = {
    type: "bomb";
};

export type Cell = CellOpened | CellUnknown | CellBomb | CellFlag;
