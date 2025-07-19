import { std } from "wow/wotlk";
import { isPositionInside } from "../../shared/polygon";
import { Tanaris } from "..";

export function CreateFlightMaster(MOD_ID: string): void {
    const FLIGHT_END: TSPosition = {
        map: 1,
        x: -7201.140137,
        y: -3786.759766,
        z: 8.618362,
        o: 4.623188,
    };

    // TODO: Find a better way to just grab the FPs near Old Gadgetzan.
    std.Taxi.forEach((taxi) => {
        if (taxi.Nodes.length === 0) return;
        if (taxi.Start.is(-1)) return;
        if (taxi.End.is(-1)) return;

        // Go over every start+end node and move them if they are inside Tanaris.
        // TODO: Create some nicer paths
        [taxi.Start, taxi.End].forEach((ref) => {
            ref.modRef((node) => {
                const position = node.Position.toPosition();
                if (position.map !== 1) return;

                const isInside = isPositionInside(
                    position,
                    Tanaris.Polygons.AllOfTanaris
                );

                if (isInside) {
                    console.log(`Modified Taxi:${taxi.ID} start position.`);
                    node.Position.set(FLIGHT_END);
                }
            });
        });
    });

    const flightmaster = std.CreatureTemplates.create(MOD_ID, "flight-master")
        .Name.enGB.set("Skimz Throttlebank")
        .Subname.enGB.set("Flight Master")
        .Level.set(55)
        .Rank.ELITE.set()
        .FactionTemplate.GADGETZAN.set()
        .Type.HUMANOID.set()
        .UnitClass.WARRIOR.set()
        .UnitFlags.CAN_SWIM.set(true)
        .NPCFlags.FLIGHT_MASTER.set(true)
        .NPCFlags.GOSSIP.set(true)
        /*
        // Doesn't work. Can FMs not have gossip in wotlk?
        .TypeFlags.FORCE_GOSSIP.set(true)
        .Gossip.modNew((gossip) => {
            gossip.Text.add({
                enGB: "Cheapest flights on this side of the desert. Give or take a surcharge.",
            });
        })
        */
        .Spawns.add(MOD_ID, "flight-master-spawn", {
            map: 1,
            x: -7201.650879,
            y: -3791.285889,
            z: 9.34785,
            o: 1.443173,
        });

    flightmaster.Models.copyFrom(std.CreatureTemplates.load(23612).Models);
}
