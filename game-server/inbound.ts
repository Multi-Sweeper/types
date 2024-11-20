// Defines structure of all valid incomming websocket messages

import { z } from "zod";

const connectEventSchema = z.object({
    type: z.literal("connect"),
    data: z.object({
        sessionId: z.string().uuid(),
    }),
});

const disconnectEventSchema = z.object({
    type: z.literal("disconnect"),
});

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

const chatMessageGameEventSchema = z.object({
    type: z.literal("chat-message"),
    data: z.object({
        message: z.string(),
    }),
});

const gameEventSchema = z.object({
    type: z.literal("game-event"),
    data: clickGameEventSchema,
});

const updateSettingsSchema = z.object({
    type: z.literal("update-settings"),
    data: z.object({
        maxPlayers: z.number().int().min(1).max(4),
        maxSpectators: z.number().int().min(0).max(10),
        lives: z.number().int().min(1).max(5),
    }),
});

const gameStartEventSchema = z.object({
    type: z.literal("game-start"),
});

const sessionEventSchema = z.object({
    type: z.literal("session-event"),
    data: z.union([
        updateSettingsSchema,
        gameStartEventSchema,
        chatMessageGameEventSchema,
        gameEventSchema,
    ]),
});

export const messageSchema = z.union([
    connectEventSchema,
    disconnectEventSchema,
    sessionEventSchema,
]);

export type ConnectEvent = z.infer<typeof connectEventSchema>;
export type DisconnectEvent = z.infer<typeof disconnectEventSchema>;
export type ClickEvent = z.infer<typeof clickGameEventSchema>;
export type ChatMessageEvent = z.infer<typeof chatMessageGameEventSchema>;
export type GameEvent = z.infer<typeof gameEventSchema>;
export type UpdateSettingsEvent = z.infer<typeof updateSettingsSchema>;
export type StartGameEvent = z.infer<typeof gameStartEventSchema>;
export type SessionEvent = z.infer<typeof sessionEventSchema>;
export type Event = z.infer<typeof messageSchema>;
