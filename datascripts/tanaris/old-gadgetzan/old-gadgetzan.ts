import type { CreatureTemplate } from "wow/wotlk/std/Creature/CreatureTemplate";
import { std } from "wow/wotlk";
import { Tanaris } from "..";
import { isPositionInside } from "../../shared/polygon";
import { CreateFlightMaster } from "./flight-master";
import { CreateDecorativeMounts } from "./decorative-mount";

const MOD_ID = "dh-kalimdor" as const;

// TODO: Can remove a loop here by checking templates in instances loop.
function ProcessRemovals(remove: RemovalRegistry): void {
    // Phase out all instances of creature in Tanaris.
    remove.creature.forEach((id) => {
        const template = std.CreatureTemplates.load(id);

        template.Spawns.forEach((instance) => {
            const position = instance.Position.toPosition();
            if (position.map !== 1) return; // TODO: This sucks.

            const isInside = isPositionInside(
                position,
                Tanaris.Polygons.AllOfTanaris
            );

            if (!isInside) return;
            instance.PhaseMask.set(2);
        });
    });

    // Phase out specific creature instances.
    remove.creatureInstance.forEach((id) => {
        const instance = std.CreatureInstances.load(id);

        instance.PhaseMask.set(2);
    });

    // Phase out all instances of GameObject in Tanaris.
    std.GameObjectTemplates.All.forEach((template) => {
        if (!remove.gobject.includes(template.ID)) return;

        template.Spawns.forEach((instance) => {
            const position = instance.Position.toPosition();
            if (position.map !== 1) return; // TODO: This sucks.

            const isInside = isPositionInside(
                position,
                Tanaris.Polygons.AllOfTanaris
            );

            if (!isInside) return;
            instance.PhaseMask.set(2);
        });
    });

    // Phase out all specific GameObject instances.
    remove.gobjectInstance.forEach((id) => {
        const instance = std.GameObjectInstances.load(id);

        instance.PhaseMask.set(2);
    });
}

function CleanOldGadgetzan(remove: RemovalRegistry): void {
    // Signs outside of Old Gadgetzan
    remove.gobjectInstance.push(
        17358, // [Shimmering Flats X:-7070.470215 Y:-3756.780029 Z:8.570020 MapId:1]
        17359, // [Gadgetzan X:-7070.330078 Y:-3757.639893 Z:9.194170 MapId:1]
        17361, // [Steamwheedle Port X:-7069.450195 Y:-3757.330078 Z:9.713330 MapId:1]
        17439, // [Shimmering Flats X:-7079.279785 Y:-3799.449951 Z:8.119130 MapId:1]
        17440, // [Steamwheedle Port X:-7078.089844 Y:-3800.280029 Z:9.227670 MapId:1]
        17441 // [Gadgetzan X:-7078.330078 Y:-3800.169922 Z:8.554430 MapId:1]
    );

    // Clutter
    remove.gobjectInstance.push(
        17342, // [Old Hatreds - The Colonization of Kalimdor X:-7229.430176 Y:-3739.229980 Z:9.604930 MapId:1]
        17240, // [Forge X:-7199.049805 Y:-3766.189941 Z:8.659150 MapId:1]
        17243 // [Anvil X:-7197.149902 Y:-3764.290039 Z:8.781430 MapId:1]
    );

    // Mount decoration NPCs
    remove.creature.push(
        Tanaris.Creatures["Riding Horse"],
        Tanaris.Creatures["Riding Ram"],
        Tanaris.Creatures["Riding Raptor"],
        Tanaris.Creatures["Riding Tiger"],
        Tanaris.Creatures["Riding Wolf"],
        Tanaris.Creatures["Skeletal Mount"]
    );

    // Arena Vendors
    remove.creature.push(
        Tanaris.Creatures["Blazzek the Biter"],
        Tanaris.Creatures["Blazzek the Biter2"],
        Tanaris.Creatures["Blazzek the Biter3"],
        Tanaris.Creatures["Argex Irongut"],
        Tanaris.Creatures["Argex Irongut2"],
        Tanaris.Creatures["Argex Irongut3"],
        Tanaris.Creatures["Argex Irongut4"],
        Tanaris.Creatures["Evee Copperspring"],
        Tanaris.Creatures["Evee Copperspring2"],
        Tanaris.Creatures["Evee Copperspring3"],
        Tanaris.Creatures["Ecton Brasstumbler"],
        Tanaris.Creatures["Ecton Brasstumbler2"],
        Tanaris.Creatures["Ecton Brasstumbler3"]
    );

    // Arena Masters
    remove.creature.push(
        Tanaris.Creatures["Max Luna"],
        Tanaris.Creatures["Bip Nigstrom"]
    );

    // Guards
    remove.creature.push(
        Tanaris.Creatures["Gadgetzan Bruiser"],
        Tanaris.Creatures["Gadgetzan Sniper"]
    );

    // Event: Midsummer
    remove.creature.push(
        Tanaris.Creatures["Goblin Commoner"],
        Tanaris.Creatures["Fire Eater"],
        Tanaris.Creatures["Midsummer Bonfire"],
        Tanaris.Creatures["Midsummer Celebrant"],
        Tanaris.Creatures["Tanaris Flame Keeper"], // Horde
        Tanaris.Creatures["Tanaris Flame Warden"], // Alliance
        Tanaris.Creatures["Ribbon Pole Debug Target"]
    );
    remove.gobject.push(
        Tanaris.GameObjects["Ribbon Pole"], // CRASH: Not found for some reason?
        Tanaris.GameObjects["Midsummer Bonfire"],
        Tanaris.GameObjects["Camp Banner"],
        Tanaris.GameObjects["Camp Crate"],
        Tanaris.GameObjects["Camp Jug"],
        Tanaris.GameObjects["Camp Pavilion"]
    );

    // Event: Halloween
    remove.gobject.push(
        Tanaris.GameObjects.HangingSkullLight01,
        Tanaris.GameObjects.HangingSkullLight02,
        Tanaris.GameObjects.G_Pumpkin_01,
        Tanaris.GameObjects.G_Pumpkin_02,
        Tanaris.GameObjects.G_Pumpkin_03,
        Tanaris.GameObjects["Apple Bob"],
        Tanaris.GameObjects["Candy Bucket"]
    );

    // Wanted Posters
    remove.gobject.push(
        Tanaris.GameObjects["Wanted Poster"], // In steamwheedle but no questlist.
        Tanaris.GameObjects["Wanted Poster2"]
    );

    // Egg-O-Matic
    remove.gobject.push(Tanaris.GameObjects["Egg-O-Matic"]);

    // Fixtures
    remove.gobject.push(Tanaris.GameObjects["Styleen's Cart"]);

    // Guild Vaults
    remove.gobject.push(Tanaris.GameObjects["Guild Vault"]);

    // NPCs
    remove.creature.push(
        Tanaris.Creatures["Jhordy Lapforge"],
        Tanaris.Creatures["Curgle Cranklehop"],
        Tanaris.Creatures["Mux Manascrambler"],
        Tanaris.Creatures["Nixx Sprocketspring"],
        Tanaris.Creatures["Andi Lynn"],
        Tanaris.Creatures["Buzzek Bracketswing"],
        Tanaris.Creatures["Innkeeper Fizzgrimble"],
        Tanaris.Creatures["Dirge Quikcleave"],
        Tanaris.Creatures.Laziphus,
        Tanaris.Creatures["Spigot Operator Luglunket"],
        Tanaris.Creatures["Chief Engineer Bilgewhizzle"],
        Tanaris.Creatures.Qizzik,
        Tanaris.Creatures.Gimblethorn,
        Tanaris.Creatures["Auctioneer Beardo"],
        Tanaris.Creatures["Marin Noggenfogger"],
        Tanaris.Creatures["Krinkle Goodsteel"],
        Tanaris.Creatures["Trenton Lighthammer"],
        Tanaris.Creatures["Derotain Mudsipper"],
        Tanaris.Creatures.Pikkle,
        Tanaris.Creatures.Quinn,
        Tanaris.Creatures["Katrina Turner"],
        Tanaris.Creatures["Tran'rek"],
        Tanaris.Creatures.Sprinkle,
        Tanaris.Creatures["Alchemist Pestlezugg"],
        Tanaris.Creatures.Shreev,
        Tanaris.Creatures.Vizzklick,
        Tanaris.Creatures["Blizrik Buckshot"],
        Tanaris.Creatures["Wrinkle Goodsteel"],
        Tanaris.Creatures["Senior Surveyor Fizzledowser"],
        Tanaris.Creatures["Rumsen Fizzlebrack"]
    );

    // Flightmasters.
    remove.creature.push(
        Tanaris.Creatures["Bera Stonehammer"],
        Tanaris.Creatures["Bulkrek Ragefist"]
    );
}

/**
 * The gnomes standing around near the entrance
 */
function GnomeCorner(): void {
    std.CreatureTemplates.load(Tanaris.Creatures["Jhordy Lapforge"]).Spawns.add(
        MOD_ID,
        "jhordy-lapford-spawn",
        { map: 1, x: -7124.60791, y: -3827.774658, z: 8.410787, o: 1.575605 } // Jhordy Lapford
    );

    std.CreatureTemplates.load(
        Tanaris.Creatures["Curgle Cranklehop"]
    ).Spawns.add(
        MOD_ID,
        "curgle-cranklehop-spawn",
        { map: 1, x: -7118.077148, y: -3822.442383, z: 8.525474, o: 2.502061 } // Curgle Cranklehop2
    );

    // Egg-O-Matic GO
    std.GameObjectTemplates.QuestGivers.load(
        Tanaris.GameObjects["Egg-O-Matic"]
    ).Spawns.add(
        MOD_ID,
        "egg-o-matic-spawn",
        { map: 1, x: -7117.021973, y: -3820.496094, z: 8.513988, o: 3.028602 } // Egg-O-Matic
    );

    std.CreatureTemplates.load(Tanaris.Creatures["Andi Lynn"]).Spawns.add(
        MOD_ID,
        "andi-lynn-spawn",
        { map: 1, x: -7136.632324, y: -3816.152588, z: 8.943157, o: 0.075556 } // Andi Lynn
    );
}

function FrontTrainers(): void {
    std.CreatureTemplates.load(
        Tanaris.Creatures["Alchemist Pestlezugg"]
    ).Spawns.add(
        MOD_ID,
        "pestlezugg-spawn",
        { map: 1, x: -7117.459473, y: -3785.818359, z: 8.695258, o: 3.217144 } // Alchemist Pestlezugg
    );

    std.CreatureTemplates.load(Tanaris.Creatures.Vizzklick).Spawns.add(
        MOD_ID,
        "vizzklick-spawn",
        { map: 1, x: -7117.637695, y: -3791.180664, z: 8.407542, o: 2.643778 } // Vizzklick
    );

    std.CreatureTemplates.load(Tanaris.Creatures.Quinn).Spawns.add(
        MOD_ID,
        "quinn-spawns",
        { map: 1, x: -7117.745117, y: -3774.123779, z: 8.798793, o: 3.539146 } // Quinn
    );
}

function MoveQuestgiver(
    questgiver: number,
    position: TSPosition
): CreatureTemplate {
    const template = std.CreatureTemplates.load(questgiver);
    template.Spawns.getIndex(0).PhaseMask.set(0).Position.set(position);

    return template;
}

// For NPCs that are quest POIs that need to be moved instead of spawned.
function QuestGivers(): void {
    MoveQuestgiver(
        Tanaris.Creatures.Sprinkle,
        { map: 1, x: -7130.675293, y: -3767.755127, z: 8.71146, o: 0.906973 } // Sprinkle
    );

    MoveQuestgiver(
        Tanaris.Creatures["Chief Engineer Bilgewhizzle"],
        { map: 1, x: -7133.570801, y: -3764.895752, z: 8.790873, o: 0.573189 } // CE Bilgewhizzle
    );
}

function GoblinEngineers(): void {
    std.CreatureTemplates.load(
        Tanaris.Creatures["Mux Manascrambler"]
    ).Spawns.add(
        MOD_ID,
        "manascrambler-spawn",
        { map: 1, x: -7127.343262, y: -3838.988037, z: 8.965533, o: 2.800868 } // Mux Manascrambler
    );

    std.CreatureTemplates.load(
        Tanaris.Creatures["Nixx Sprocketspring"]
    ).Spawns.add(
        MOD_ID,
        "sprocketspring-spawn",
        { map: 1, x: -7132.061035, y: -3839.767822, z: 9.062946, o: 1.084773 } // Nixx Sprocketspring
    );

    std.CreatureTemplates.load(Tanaris.Creatures.Shreev).Spawns.add(
        MOD_ID,
        "shreev-spawn",
        { map: 1, x: -7137.322266, y: -3830.057617, z: 8.409834, o: 1.418555 } // Shreev
    );
}

function WantedPosters(): void {
    std.GameObjectTemplates.QuestGivers.load(
        Tanaris.GameObjects["Wanted Poster2"]
    )
        .Spawns.add(MOD_ID, "wanted-poster-spawn", [
            {
                map: 1,
                x: -7122.158203,
                y: -3748.858398,
                z: 8.370175,
                o: 0.706333,
            }, // Wanted1
            {
                map: 1,
                x: -7106.571777,
                y: -3805.031982,
                z: 8.388782,
                o: 5.949383,
            }, // Wanted2
            {
                map: 1,
                x: -7226.439941,
                y: -3783.508301,
                z: 8.902006,
                o: 0.231676,
            }, // Wanted3
        ])
        .QuestList.set(2875) // WANTED: Andre Firebeard
        .QuestList.set(2781); // WANTED: Caliph Scorpidsting
}

function Styleen(): void {
    std.GameObjectTemplates.Generic.load(
        Tanaris.GameObjects["Styleen's Cart"]
    ).Spawns.add(
        MOD_ID,
        "styleens-cart-spawn",
        { map: 1, x: -7163.748535, y: -3769.138428, z: 8.370174, o: 4.370401 } // Styleen's Cart
    );

    std.CreatureTemplates.load(10466).Spawns.add(
        MOD_ID,
        "styleen-spawn",
        { map: 1, x: -7158.234863, y: -3764.140625, z: 8.370105, o: 5.493763 } // Styleen
    );
}

function GoblinInn(): void {
    std.CreatureTemplates.load(
        Tanaris.Creatures["Innkeeper Fizzgrimble"]
    ).Spawns.add(
        MOD_ID,
        "fizzgrimble-spawn",
        { map: 1, x: -7158.248535, y: -3838.750488, z: 8.635854, o: 2.172636 } // Innkeeper Fizzgrimble
    );

    std.CreatureTemplates.load(
        Tanaris.Creatures["Dirge Quikcleave"]
    ).Spawns.add(
        MOD_ID,
        "quikcleave-spawn",
        { map: 1, x: -7170.63623, y: -3853.013184, z: 8.782666, o: 0.817823 } // Dirge Quikcleave
    );

    std.CreatureTemplates.load(
        Tanaris.Creatures["Buzzek Bracketswing"]
    ).Spawns.add(
        MOD_ID,
        "bracketswing-spawn",
        { map: 1, x: -7150.293457, y: -3830.093262, z: 8.512578, o: 1.245884 } // Buzzek Bracketswing
    );

    std.CreatureTemplates.load(Tanaris.Creatures.Laziphus).Spawns.add(
        MOD_ID,
        "laziphus-spawn",
        { map: 1, x: -7166.048828, y: -3825.800781, z: 8.552965, o: 1.245883 } // Laziphus
    );

    // Moved from Steamwheedle Port
    std.CreatureTemplates.load(Tanaris.Creatures.Stoley).Spawns.add(
        MOD_ID,
        "stoley-spawn",
        { map: 1, x: -7157.675781, y: -3855.813721, z: 8.782232, o: 1.616041 } // Stoley
    );

    // Moved from Steamwheedle Port
    std.CreatureTemplates.load(
        Tanaris.Creatures["Yorba Screwspigot"]
    ).Spawns.add(
        MOD_ID,
        "screwspigot-spawn",
        { map: 1, x: -7167.484863, y: -3836.404297, z: 8.507142, o: 5.264226 } // Yorba Screwspigot
    );
}

function GoblinStore(): void {
    std.CreatureTemplates.load(
        Tanaris.Creatures["Wrinkle Goodsteel"]
    ).Spawns.add(
        MOD_ID,
        "wrinkle-goodsteel-spawn",
        { map: 1, x: -7199.136719, y: -3830.675293, z: 8.840924, o: 1.749546 } // Wrinkle Goodsteel
    );

    std.CreatureTemplates.load(
        Tanaris.Creatures["Blizrik Buckshot"]
    ).Spawns.add(
        MOD_ID,
        "buckshot-spawn",
        { map: 1, x: -7204.915039, y: -3827.366455, z: 8.967457, o: 0.218021 } // Blizrik Buckshot
    );

    // Moved from Steamwheedle Port
    std.CreatureTemplates.load(Tanaris.Creatures.Jabbey).Spawns.add(
        MOD_ID,
        "jabbey-spawn",
        { map: 1, x: -7196.742676, y: -3826.910645, z: 8.705816, o: 1.443245 } // Jabbey
    );
}

function MiningArea(): void {
    std.GameObjectTemplates.Generic.load(Tanaris.GameObjects.Anvil).Spawns.add(
        MOD_ID,
        "gadgetzan-anvil-spawn",
        { map: 1, x: -7165.37207, y: -3792.992432, z: 9.041922, o: 0.790186 } // Anvil
    );

    std.GameObjectTemplates.Generic.load(Tanaris.GameObjects.Forge).Spawns.add(
        MOD_ID,
        "gadgetzan-forge-spawn",
        { map: 1, x: -7162.034668, y: -3788.690186, z: 9.062082, o: 0.144436 } // Forge
    );

    std.CreatureTemplates.load(
        Tanaris.Creatures["Krinkle Goodsteel"]
    ).Spawns.add(
        MOD_ID,
        "krinkle-goodsteel-spawn",
        { map: 1, x: -7159.585938, y: -3785.335938, z: 8.803042, o: 2.417452 } // Krinkle Goodsteel
    );

    std.CreatureTemplates.load(
        Tanaris.Creatures["Trenton Lighthammer"]
    ).Spawns.add(
        MOD_ID,
        "lighthammer-spawn",
        { map: 1, x: -7162.890137, y: -3788.100342, z: 9.034826, o: 4.212096 } // Trenton Lighthammer
    );

    std.CreatureTemplates.load(
        Tanaris.Creatures["Derotain Mudsipper"]
    ).Spawns.add(
        MOD_ID,
        "mudsipper-spawn",
        { map: 1, x: -7166.734863, y: -3792.254883, z: 8.896831, o: 0.752398 } // Derotain
    );

    //Mining Trainer
    std.CreatureTemplates.load(Tanaris.Creatures.Pikkle).Spawns.add(
        MOD_ID,
        "pikkle-spawn",
        { map: 1, x: -7157.633301, y: -3782.460938, z: 8.682006, o: 3.87831 } // Pikkle
    );

    //Moved from Steamwheedle Port
    std.CreatureTemplates.load(
        Tanaris.Creatures["Prospector Ironboot"]
    ).Spawns.add(
        MOD_ID,
        "ironboot-spawn",
        { map: 1, x: -7169.199219, y: -3796.443604, z: 8.62189, o: 3.00257 } // Prospector Ironboot
    );
}

function OutsidePeople(): void {
    // Moved from Steamwheedle Port
    std.CreatureTemplates.load(Tanaris.Creatures["Yeh'kinya"]).Spawns.add(
        MOD_ID,
        "yehkinya-spawn",
        { map: 1, x: -7065.891113, y: -3734.541748, z: 9.208703, o: 3.088969 } // Yeh'kinya
    );

    std.CreatureTemplates.load(
        Tanaris.Creatures["Rumsen Fizzlebrack"]
    ).Spawns.add(
        MOD_ID,
        "fizzlebrack-spawn",
        { map: 1, x: -7082.42627, y: -3697.180176, z: 9.436737, o: 0.485381 } // Rumsen Fizzlebrack
    );
}

function Clutter(): void {
    std.GameObjectTemplates.Text.load(
        Tanaris.GameObjects["Old Hatreds - The Colonization of Kalimdor"]
    ).Spawns.add(
        MOD_ID,
        "old-hatreds-spawn",
        { map: 1, x: -7202.712402, y: -3768.21167, z: 9.44312, o: 4.845875 } // Old Hatreds
    );
}

function TownGuards(): void {}

function OldGadgetzan(): void {
    const removalCollection: RemovalRegistry = {
        creature: [],
        creatureInstance: [],
        gobject: [],
        gobjectInstance: [],
    };

    // Clean up
    CleanOldGadgetzan(removalCollection);
    ProcessRemovals(removalCollection);

    // Spawn new
    Clutter();
    CreateDecorativeMounts(MOD_ID);
    CreateFlightMaster(MOD_ID);
    FrontTrainers();
    GnomeCorner();
    GoblinEngineers();
    GoblinInn();
    GoblinStore();
    MiningArea();
    OutsidePeople();
    Styleen();
    TownGuards();
    WantedPosters();
    QuestGivers();
}

type RemovalType =
    | "creature"
    | "creatureInstance"
    | "gobject"
    | "gobjectInstance";

type RemovalRegistry = {
    [K in RemovalType]: Array<uint32>;
};

export default OldGadgetzan;
