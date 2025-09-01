import type { PatrolPosition } from "wow/wotlk/std/Creature/CreaturePatrolPath";
import { std } from "wow/wotlk";
import { Tanaris } from "..";

const MOD_ID = "dh-kalimdor" as const;

const CaliphSpawn: TSPosition = {
    map: 1,
    x: -7588.043457,
    y: -4034.563232,
    z: -6.468433,
    o: 0.52,
}; // SpawnPosition

const CaliphPatrol: PatrolPosition[] = [
    {
        ...CaliphSpawn,
        delay: 5 * 1000,
    },
    {
        map: 1,
        x: -7574.276367,
        y: -4027.76709,
        z: -13.148903,
        o: 5.94,
        delay: 10 * 1000,
    }, // Patrol1
    {
        ...CaliphSpawn,
        delay: 2 * 1000,
    },
    {
        map: 1,
        x: -7592.663086,
        y: -4036.835205,
        z: -4.728808,
        o: 3.57,
        delay: 5 * 1000,
    }, // Patrol2
];

function SetupCaliphScorpidsting(): void {
    // The two guards that follow Caliph.
    [23467, 23466].forEach((id) => {
        std.CreatureInstances.load(id).PhaseMask.set(2);
    });

    const CaliphScorpidsting = std.CreatureTemplates.load(
        Tanaris.Creatures["Caliph Scorpidsting"]
    );

    const Bodyguard = std.CreatureTemplates.load(
        Tanaris.Creatures["Wastewander Rogue"]
    );

    // Hide existing spawns.
    CaliphScorpidsting.Spawns.forEach((instance) => {
        instance.PhaseMask.set(2);
    });

    // Add new spawn to PVE cave.
    CaliphScorpidsting.Spawns.add(
        MOD_ID,
        "caliph-scorpidsting-spawn",
        { ...CaliphSpawn, spawnTime: 10 * 60 },
        (instance) => {
            instance.EquipmentID.set(1);
            instance.PatrolPath.add("WALK", CaliphPatrol);
        }
    );

    // TODO: Could and should these be tied to Caliph's spawn?
    Bodyguard.Spawns.add(
        MOD_ID,
        "caliph-bodyguard-spawns",
        [
            {
                map: 1,
                x: -7575.802246,
                y: -4031.540527,
                z: -12.382648,
                o: 0.41,
                spawnTime: 8.5 * 60,
            }, // Bodyguard1
            {
                map: 1,
                x: -7577.757324,
                y: -4025.444336,
                z: -11.96297,
                o: 5.79,
                spawnTime: 8.5 * 60,
            }, // Bodyguard2
        ],
        (instance) => {
            instance.EquipmentID.set(1);
        }
    );
}

export default SetupCaliphScorpidsting;
