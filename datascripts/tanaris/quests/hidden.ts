/**
 * This file is for removing quests from Tanaris.
 */

import { std } from "wow/wotlk";

function HideQuest(quest: number): void {
    std.Quests.load(quest)
        .Flags.UNAVAILABLE.set(true)
        .MinLevel.set(100)
        .MaxLevel.set(100);
}

function RemoveRaidQuests(): void {
    [
        8303, 8305, 8519, 8555, 8575, 8576, 8577, 8578, 8584, 8585, 8586, 8587,
        8597, 8598, 8599, 8606, 8620, 8728, 8729, 8730, 8741, 8742, 8747, 8748,
        8749, 8750, 8751, 8752, 8753, 8754, 8755, 8756, 8757, 8758, 8759, 8760,
        8761, 8764, 8765, 8766, 8802, 9250, 9251, 9257, 9269, 9270, 9271,
    ].forEach((id) => HideQuest(id));
}

function RemoveYehkinyaQuests(): void {
    [3520, 3527, 4787, 3528, 8181, 8182, 5065, 4788].forEach((id) =>
        HideQuest(id)
    );
}

function RemoveTrolls(): void {
    [2606].forEach((id) => HideQuest(id));
}

function RemoveOgres(): void {
    [2278, 2279, 2280].forEach((id) => HideQuest(id));
}

export default function HideTanarisQuests(): void {
    RemoveRaidQuests();
    RemoveYehkinyaQuests();
    RemoveTrolls();
    RemoveOgres();
}
