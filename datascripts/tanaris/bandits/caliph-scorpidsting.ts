import type { PatrolPosition } from "wow/wotlk/std/Creature/CreaturePatrolPath";
import { std } from "wow/wotlk";
import { Tanaris } from "..";

const MOD_ID = "dh-kalimdor" as const;

const SpawnPosition: TSPosition = {
    map: 1,
    x: -7588.043457,
    y: -4034.563232,
    z: -6.468433,
    o: 0.528685,
}; // SpawnPosition

const PatrolPath: PatrolPosition[] = [
    {
        ...SpawnPosition,
        delay: 5 * 1000,
    },
    {
        map: 1,
        x: -7574.276367,
        y: -4027.76709,
        z: -13.148903,
        o: 5.943991,
        delay: 10 * 1000,
    }, // Patrol1
    {
        ...SpawnPosition,
        delay: 2 * 1000,
    },
    {
        map: 1,
        x: -7592.663086,
        y: -4036.835205,
        z: -4.728808,
        o: 3.576025,
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
        { ...SpawnPosition, spawnTime: 10 * 60 },
        (instance) => {
            instance.EquipmentID.set(1);
            instance.PatrolPath.add("WALK", PatrolPath);
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
                o: 0.41605,
                spawnTime: 8.5 * 60,
            }, // Bodyguard1
            {
                map: 1,
                x: -7577.757324,
                y: -4025.444336,
                z: -11.96297,
                o: 5.792107,
                spawnTime: 8.5 * 60,
            }, // Bodyguard2
        ],
        (instance) => {
            instance.EquipmentID.set(1);
            instance.WanderDistance.set(0.2);
        }
    );
}

export default SetupCaliphScorpidsting;
