let creatureArray: TSArray<uint32> = CreateArray<uint32>([]);

/**
 * This didn't function as expected. So it's basically non-functional.
 *
 * OnCreatureCreate only fires for creatures that are populated around a player.
 */
function CreateCreatureCollector(events: TSEvents, eventID: uint32): void {
    console.log("Registering CreatureCollector for Tanaris.\n");
    creatureArray.reserve(100);

    // Collect all over Tanaris.
    events.Area.OnCreatureCreate((A, C) => {
        if (!isAreaOrAncestor(A, 440)) return;
        const ID = C.GetTemplate().GetEntry();
        if (!creatureArray.includes(ID)) return;
        creatureArray.push(ID);
    });

    events.Player.OnCommand((player, command, found) => {
        if (!command.get().startsWith("creatures")) return;
        found.set(true);

        player.SendBroadcastMessage(
            `Dumping ${creatureArray.length} creatures.`
        );
    });
}

export function RegisterCreatureCollectors(events: TSEvents): void {
    CreateCreatureCollector(events, 440);
}

// This could be recursive just didn't get around to it since
// the concept didn't pan out. Still useful to look at.
function isAreaOrAncestor(area: TSArea, search: uint32): boolean {
    if (area === undefined) return false;
    if (area.GetId() === search) return true;

    const parent = area.GetParent();
    if (parent === undefined) return false;
    if (parent.GetId() === search) return true;

    return false;
}
