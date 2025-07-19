import { std } from "wow/wotlk";
import type { CreatureInstance } from "wow/wotlk/std/Creature/CreatureInstance";
import type { GameObjectInstance } from "wow/wotlk/std/GameObject/GameObjectInstance";
/*
export function RelocateGameObjectInstance(
    instance: uint32 | GameObjectInstance,
    position: TSPosition,
    cb?: (instance: GameObjectInstance) => void
): void {
    if (typeof instance === "number") {
        instance = std.GameObjectInstances.load(instance);
    }

    instance.Position.set(position);

    if (cb) {
        cb(instance);
    }
}

export function RelocateCreatureInstance(
    instance: uint32 | CreatureInstance,
    position: TSPosition,
    cb?: (instance: CreatureInstance) => void
): void {
    if (typeof instance === "number") {
        instance = std.CreatureInstances.load(instance);
    }

    instance.Position.set(position);

    if (cb) {
        cb(instance);
    }
}
*/
