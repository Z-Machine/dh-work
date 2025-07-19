let arr: TSArray<uint32> = CreateArray<uint32>([]);

function CreateCreatureCollector(events: TSEvents, eventID: uint32): void {
    console.log("Registering CreatureCollector for Tanaris.\n");
    arr.reserve(100);

    // Collect all over Tanaris.
    events.Area.OnCreatureCreate((A, C) => {
        //if (!isAreaOrAncestor(A, 440)) return;
        const ID = C.GetTemplate().GetEntry();
        if (!arr.includes(ID)) return;
        arr.push(ID);
    });

    events.Player.OnCommand((player, command, found) => {
        if (!command.get().startsWith("creatures")) return;
        found.set(true);

        player.SendBroadcastMessage(`Dumping ${arr.length} creatures.`);
    });
}

export function RegisterCreatureCollectors(events: TSEvents): void {
    CreateCreatureCollector(events, 440);
}

function isAreaOrAncestor(area: TSArea, search: uint32): boolean {
    if (area === undefined) return false;
    if (area.GetId() === search) return true;

    const parent = area.GetParent();
    if (parent === undefined) return false;
    if (parent.GetId() === search) return true;

    return false;
}
