/**
 * This file is for the PVE cave with Caliph Scorpidsting.
 */

import type { CreatureInstancePosition } from "wow/wotlk/std/Creature/CreatureTemplate";
import { std } from "wow/wotlk";
import { Tanaris } from "..";

const MOD_ID = "dh-kalimdor" as const;

const $ = {
    Bandit: [
        { map: 1, x: -7569.538574, y: -3969.681152, z: -24.252348, o: 5.717 },
        { map: 1, x: -7536.655273, y: -4012.266602, z: -25.126141, o: 3.793 },
        { map: 1, x: -7595.371582, y: -4075.4729, z: -15.312482, o: 4.468 },
        { map: 1, x: -7646.634277, y: -4125.045898, z: -5.323936, o: 1.256 },
        { map: 1, x: -7593.872559, y: -3958.64624, z: -32.67218, o: 3.333 },
    ] as CreatureInstancePosition[],
    Thief: [
        { map: 1, x: -7602.072266, y: -4046.066895, z: -19.399874, o: 3.408 },
        { map: 1, x: -7541.337402, y: -3985.231201, z: -23.125072, o: 0.003 },
        { map: 1, x: -7558.992676, y: -4082.070068, z: -18.694712, o: 2.159 },
        { map: 1, x: -7556.441406, y: -4025.090576, z: -19.534155, o: 3.573 },
    ] as CreatureInstancePosition[],
    Assassin: [
        { map: 1, x: -7663.515625, y: -4109.909668, z: -2.521825, o: 3.671 },
        { map: 1, x: -7595.905273, y: -4005.493408, z: -29.242067, o: 2.489 },
        { map: 1, x: -7527.365723, y: -3961.822998, z: -24.740343, o: 4.747 },
        { map: 1, x: -7576.83252, y: -4085.925537, z: -16.150032, o: 1.483 },
        { map: 1, x: -7613.595215, y: -3929.118408, z: -23.705347, o: 5.85 },
        { map: 1, x: -7653.687988, y: -3992.890137, z: -14.071614, o: 0.86 },
    ] as CreatureInstancePosition[],
    ShadowMage: [
        { map: 1, x: -7689.281738, y: -4112.715332, z: 6.379376, o: 3.31 },
        { map: 1, x: -7644.225098, y: -4056.553223, z: -6.897985, o: 5.096 },
        { map: 1, x: -7613.61084, y: -4004.118408, z: -25.634802, o: 0.011 },
        { map: 1, x: -7554.270996, y: -4061.765625, z: -18.639122, o: 3.549 },
        { map: 1, x: -7617.549805, y: -4081.401855, z: -11.788242, o: 2.709 },
        { map: 1, x: -7592.249512, y: -3927.247803, z: -27.277893, o: 2.599 },
        { map: 1, x: -7611.885742, y: -3952.186035, z: -28.265406, o: 4.943 },
        { map: 1, x: -7652.42627, y: -4032.043701, z: -8.077308, o: 5.179 },
        { map: 1, x: -7636.688965, y: -4108.262695, z: -6.232012, o: 4.46 },
        { map: 1, x: -7630.237793, y: -4076.278076, z: -8.795037, o: 4.539 },
        { map: 1, x: -7594.870605, y: -3982.487061, z: -28.777155, o: 3.486 },
        { map: 1, x: -7564.181641, y: -4042.865479, z: -15.778288, o: 4.625 },
        { map: 1, x: -7616.811523, y: -4055.364258, z: -15.616364, o: 0.942 },
        { map: 1, x: -7623.379395, y: -4034.847412, z: -12.517757, o: 5.795 },
    ] as CreatureInstancePosition[],
} as const;

function CreateWastewanderSpawns(): void {
    const ShadowMage = std.CreatureTemplates.load(
        Tanaris.Creatures["Wastewander Shadow Mage"]
    );

    const Assassin = std.CreatureTemplates.load(
        Tanaris.Creatures["Wastewander Assassin"]
    );

    const Thief = std.CreatureTemplates.load(
        Tanaris.Creatures["Wastewander Thief"]
    );

    const Bandit = std.CreatureTemplates.load(
        Tanaris.Creatures["Wastewander Bandit"]
    );

    ShadowMage.Spawns.add(
        MOD_ID,
        "cave-wastewander-shadow-mage-spawn",
        $.ShadowMage.map((entry) => {
            return {
                ...entry,
                wander: 8,
                spawnTime: 5.5 * 60,
            };
        }),
        (instance) => {
            instance.EquipmentID.set(1);
        }
    );

    Assassin.Spawns.add(
        MOD_ID,
        "cave-wastewander-assassin-spawn",
        $.Assassin.map((entry) => {
            return {
                ...entry,
                wander: 10,
                spawnTime: 5 * 60,
            };
        }),
        (instance) => {
            instance.EquipmentID.set(1);
        }
    );

    Thief.Spawns.add(
        MOD_ID,
        "cave-wastewander-thief-spawn",
        $.Thief.map((entry) => {
            return {
                ...entry,
                wander: 5,
                spawnTime: 5 * 60,
            };
        }),
        (instance) => {
            instance.EquipmentID.set(1);
        }
    );

    Bandit.Spawns.add(
        MOD_ID,
        "cave-wastewander-bandit-spawn",
        $.Bandit.map((entry) => {
            return {
                ...entry,
                wander: 5,
                spawnTime: 5 * 60,
            };
        }),
        (instance) => {
            instance.EquipmentID.set(1);
        }
    );
}

export default CreateWastewanderSpawns;
