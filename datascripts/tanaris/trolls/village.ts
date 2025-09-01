import { DBC, std } from "wow/wotlk";
import { Tanaris } from "..";

const MOD_ID = "dh-tanaris" as const;

export const GhostTroll = std.CreatureTemplates.create(
    MOD_ID,
    "tanaris-ghost-troll"
);

export const DeadTroll = std.CreatureTemplates.create(
    MOD_ID,
    "tanaris-dead-troll"
);

export function SetupInfectedTrolls(): void {
    const SandfuryCretin = std.CreatureTemplates.load(7789);

    DeadTroll.Level.set(50)
        .UnitClass.WARRIOR.set()
        .Rank.NORMAL.set()
        .Type.HUMANOID.set()
        .FactionTemplate.NEUTRAL_PASSIVE.set()
        .DamageSchool.Normal.set()
        .UnitFlags.DISABLE_TURN.set(true)
        .UnitFlags.NON_ATTACKABLE.set(true)
        .Name.enGB.set(`Dead Troll`)
        .Models.copyFrom(SandfuryCretin.Models);

    DeadTroll.Spawns.add(
        MOD_ID,
        "tanaris-dead-troll-spawn",
        { map: 1, x: -7531.804688, y: -2766.947998, z: 9.531566, o: 6.0 }, // VillageBlood
        (instance) => {
            instance.EquipmentID.set(1);
            //instance.Emote.set(445);
            instance.Auras.set("69962"); // TODO: Figure out how to play dead.
        }
    );

    GhostTroll.Models.addDefaultBear()
        .UnitClass.WARRIOR.set()
        .UnitFlags.CAN_SWIM.set(true)
        .FactionTemplate.GADGETZAN.set()
        .Type.HUMANOID.set()
        .NPCFlags.GOSSIP.set(true)
        .NPCFlags.QUEST_GIVER.set(true)
        .Level.set(50)
        .Gossip.modNew((gossip) => {
            gossip.Text.add({
                enGB: "Who you be?",
            });
        })
        .Name.enGB.set("Troll Ghost")
        .Subname.enGB.set("Quest Giver")
        .Models.copyFrom(SandfuryCretin.Models);

    GhostTroll.Spawns.add(
        MOD_ID,
        "tanaris-village-troll-spawn",
        { map: 1, x: -7530.897949, y: -2768.82959, z: 9.547501, o: 6.17 }, // TrollGhost
        (instance) => {
            instance.EquipmentID.set(1);
            instance.Auras.set("22650"); // Ghost visual
        }
    );
}
