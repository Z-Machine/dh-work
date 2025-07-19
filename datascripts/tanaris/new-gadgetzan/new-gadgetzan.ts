import { std } from "wow/wotlk";
import { Tanaris } from "..";
import { isPositionInside } from "../../shared/polygon";

function CleanNewGadgetzan(): void {
    let goCleaned = 0;
    let npcCleaned = 0;

    std.GameObjectInstances.queryAll({ map: 1 }).forEach((instance) => {
        const position = instance.Position.toPosition();
        if (position.map !== 1) return;
        const isInside = isPositionInside(
            position,
            Tanaris.Polygons.NewGadgetzan
        );

        if (isInside) {
            instance.PhaseMask.set(2);
            goCleaned++;
        }
    });

    std.CreatureInstances.queryAll({ map: 1 }).forEach((instance) => {
        const position = instance.Position.toPosition();
        const isInside = isPositionInside(
            position,
            Tanaris.Polygons.NewGadgetzan
        );

        if (isInside) {
            instance.PhaseMask.set(2);
            npcCleaned++;
        }
    });

    console.log(
        `Cleaned GO: ${goCleaned}, NPC: ${npcCleaned} inside New Gadgetzan.`
    );
}

function NewGadgetzan(): void {
    CleanNewGadgetzan();
}

export default NewGadgetzan;
