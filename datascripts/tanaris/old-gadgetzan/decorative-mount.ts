import { std } from "wow/wotlk";
import type { CreatureTemplate } from "wow/wotlk/std/Creature/CreatureTemplate";

export function CreateDecorativeMounts(MOD_ID: string): void {
    const RIDING_HORSE = CreateMount(
        MOD_ID,
        "riding-horse",
        "Riding Horse",
        [2402, 2405, 2408, 2410]
    );

    const RIDING_RAM = CreateMount(
        MOD_ID,
        "riding-ram",
        "Riding Ram",
        [2736, 2784, 2785, 2786]
    );

    const RIDING_RAPTOR = CreateMount(
        MOD_ID,
        "riding-raptor",
        "Riding Raptor",
        [4806, 6468, 6469, 6473]
    );

    const RIDING_TIGER = CreateMount(
        MOD_ID,
        "riding-tiger",
        "Riding Tiger",
        [6448, 6079, 9952, 6080]
    );

    const RIDING_WOLF = CreateMount(
        MOD_ID,
        "riding-wolf",
        "Riding Wolf",
        [207, 2320, 2326, 2328]
    );

    const SKELETAL_MOUNT = CreateMount(
        MOD_ID,
        "riding-skeletal-mount",
        "Skeletal Mount",
        [5228]
    );

    const SPAWNS: TSPosition[] = [
        { map: 1, x: -7101.985352, y: -3798.973145, z: 8.375954, o: 3.174241 }, // Mount
        { map: 1, x: -7102.708984, y: -3793.174561, z: 8.370071, o: 2.891497 }, // Mount
        { map: 1, x: -7102.866699, y: -3789.95166, z: 8.375412, o: 3.394152 }, // Mount
        { map: 1, x: -7103.438965, y: -3785.792236, z: 8.487234, o: 3.209584 }, // Mount
        { map: 1, x: -7104.36377, y: -3767.378174, z: 8.580461, o: 2.856154 }, // Mount
        { map: 1, x: -7105.623047, y: -3764.00293, z: 8.414208, o: 3.767217 }, // Mount
        { map: 1, x: -7108.85498, y: -3758.406494, z: 8.370469, o: 3.833976 }, // Mount
        { map: 1, x: -7104.029785, y: -3771.002686, z: 8.843977, o: 2.988667 }, // Skeletal Mount
    ];

    // Alliance
    RIDING_HORSE.Spawns.add(MOD_ID, "riding-horse-spawn", [SPAWNS[0]]);
    RIDING_RAM.Spawns.add(MOD_ID, "riding-ram-spawn", [SPAWNS[1], SPAWNS[2]]);
    RIDING_TIGER.Spawns.add(MOD_ID, "riding-tiger-spawn", [SPAWNS[3]]);

    // Horde
    RIDING_RAPTOR.Spawns.add(MOD_ID, "riding-raptor-spawn", [SPAWNS[5]]);
    RIDING_WOLF.Spawns.add(MOD_ID, "riding-wolf-spawn", [SPAWNS[4], SPAWNS[6]]);
    SKELETAL_MOUNT.Spawns.add(MOD_ID, "skeletal-mount-spawn", [SPAWNS[7]]);
}

function CreateMount(
    MOD_ID: string,
    id: string,
    display_name: string,
    models: uint32[]
): CreatureTemplate {
    return std.CreatureTemplates.create(MOD_ID, id)
        .Name.enGB.set(display_name)
        .Level.set(1, 2)
        .PvPFlags.set(16)
        .FactionTemplate.NEUTRAL_PASSIVE.set()
        .Type.CRITTER.set() // prevent nameplate w/ healthbar
        .FlagsExtra.CIVILIAN.set(1)
        .FlagsExtra.NO_XP.set(1)
        .Models.addIds(...models);
}
