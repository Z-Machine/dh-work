import SetupCaliphScorpidsting from "./bandits/caliph-scorpidsting";
import CreateWastewanderSpawns from "./bandits/pve-cave";
import {
    GenerateTanarisCreatures,
    GenerateTanarisGameObjects,
} from "./file-generators";
import NewGadgetzan from "./new-gadgetzan/new-gadgetzan";
import OldGadgetzan from "./old-gadgetzan/old-gadgetzan";
import { POLYGON } from "./polygons";
import GadgetzanIntroQuests from "./quests/gadgetzan-intro";
import HideTanarisQuests from "./quests/hidden";
import { Tanaris_Main } from "./tanaris";
import { CREATURE, GOBJECT } from "./tanaris_ids";

export namespace Tanaris {
    export const Main = Tanaris_Main;
    export const GameObjects = GOBJECT;
    export const Creatures = CREATURE;
    export const Polygons = POLYGON;
    export const FileGenerators = {
        Creatures: GenerateTanarisCreatures,
        GameObjects: GenerateTanarisGameObjects,
    };
    export const Scripts = [
        NewGadgetzan,
        OldGadgetzan,
        HideTanarisQuests,
        GadgetzanIntroQuests,
        SetupCaliphScorpidsting,
        CreateWastewanderSpawns,
    ];
}
