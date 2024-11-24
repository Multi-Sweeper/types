// Defines structure of all valid incomming websocket messages

import { z } from "zod";
import { nonceEventSchema } from "./common";

// Game Events
const clickGameEventSchema = z.object({
    type: z.literal("click"),
    data: z.object({
        type: z.enum(["mouse1", "mouse2"]),
        coords: z.object({
            x: z.number().int(),
            y: z.number().int(),
        }),
    }),
});

const gameStartEventSchema = z.object({
    type: z.literal("start"),
});

const gameEventSchema = z.object({
    type: z.literal("game-event"),
    data: z.union([clickGameEventSchema, gameStartEventSchema]),
});

// Session Events
const chatMessageGameEventSchema = z.object({
    type: z.literal("chat-message"),
    data: z.object({
        message: z.string(),
    }),
});

const updateSettingsSchema = z.object({
    type: z.literal("update-settings"),
    data: z.object({
        maxPlayers: z.number().int().min(1).max(4),
        maxSpectators: z.number().int().min(0).max(10),
        lives: z.number().int().min(1).max(5),
    }),
});

const sessionEventSchema = z.intersection(
    z.object({
        type: z.literal("session-event"),
        data: z.union([
            chatMessageGameEventSchema,
            updateSettingsSchema,
            gameEventSchema,
        ]),
    }),
    nonceEventSchema
);

// Server Events
const connectEventSchema = z.intersection(
    z.object({
        type: z.literal("connect"),
        data: z.object({
            sessionId: z.string().uuid(),
        }),
    }),
    nonceEventSchema
);

const disconnectEventSchema = z.intersection(
    z.object({
        type: z.literal("disconnect"),
    }),
    nonceEventSchema
);

export const messageSchema = z.union([
    connectEventSchema,
    disconnectEventSchema,
    sessionEventSchema,
]);

export type ClickEvent = z.infer<typeof clickGameEventSchema>;
export type GameStartEvent = z.infer<typeof gameStartEventSchema>;
export type GameEvent = z.infer<typeof gameEventSchema>;
export type ChatMessageEvent = z.infer<typeof chatMessageGameEventSchema>;
export type UpdateSettingsEvent = z.infer<typeof updateSettingsSchema>;
export type SessionEvent = z.infer<typeof sessionEventSchema>;
export type ConnectEvent = z.infer<typeof connectEventSchema>;
export type DisconnectEvent = z.infer<typeof disconnectEventSchema>;
export type Event = z.infer<typeof messageSchema>;
