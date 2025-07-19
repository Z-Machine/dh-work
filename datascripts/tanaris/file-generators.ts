import path from "node:path";
import * as fs from "fs";
import { std } from "wow/wotlk";
import { Tanaris } from ".";
import { isPositionInside } from "../shared/polygon";

// TODO: Make these into a module for re-use in future zones.

export function GenerateTanarisCreatures(): void {
    const TanarisCreatures = new Set<uint32>();
    console.log(`Finding all creatures in Tanaris`);
    std.CreatureInstances.queryAll({}).forEach((instance) => {
        const position = instance.Position.toPosition();

        // We only care about map: 1
        if (position.map !== 1) return;

        const isInside = isPositionInside(
            position,
            Tanaris.Polygons.AllOfTanaris
        );

        if (isInside) {
            const template = instance.Template.get();
            TanarisCreatures.add(template);
        }
    });

    console.log("Writing Creatures to file.");

    const filepath = path.join(
        __dirname,
        "../../",
        "tanaris",
        "creatures.ts.txt"
    );

    let content = `/* === THIS FILE IS GENERATED, DO NOT EDIT === */\n\n`;
    content += `import { std } from "wow/wotlk"\n\n`;
    content += `const CREATURE = {\n`;

    let indent = "    ";
    TanarisCreatures.forEach((id) => {
        const template = std.CreatureTemplates.load(id);
        const name = template.Name.enGB.get() ?? `Missing Name ${id}`;
        content += addNPC(indent, name, id);
    });

    content += `} as const;\n`;

    fs.writeFile(filepath, content, (err) => {
        if (err) console.error(err);
    });

    function addNPC(indent: string, name: string, id: number): string {
        return `${indent}"${name}": ${id},\n`;
    }
}

export function GenerateTanarisGameObjects(): void {
    const TanarisGobjects = new Set<uint32>();
    console.log(`Finding all GameObjects in Tanaris`);

    std.GameObjectInstances.queryAll({}).forEach((instance) => {
        const position = instance.Position.toPosition();

        // We only care about map: 1
        if (position.map !== 1) return;

        const isInside = isPositionInside(
            position,
            Tanaris.Polygons.AllOfTanaris
        );

        if (isInside) {
            const template = instance.Template.get();
            TanarisGobjects.add(template);
        }
    });

    console.log("Writing GameObjects to file.");

    const filepath = path.join(
        __dirname,
        "../../",
        "tanaris",
        "gobjects.ts.txt"
    );

    let content = `/* === THIS FILE IS GENERATED, DO NOT EDIT === */\n\n`;
    content += `import { std } from "wow/wotlk"\n\n`;
    content += `const GOBJECTS = {\n`;

    let indent = "    ";

    // Loop over all GameObjects and match.
    std.GameObjectTemplates.All.forEach((template) => {
        const id = template.ID;
        if (!TanarisGobjects.has(id)) return;

        const name = template.Name.enGB.get() ?? `Missing Name ${id}`;
        content += addGO(indent, name, id);
    });

    content += `} as const;\n`;

    fs.writeFile(filepath, content, (err) => {
        if (err) console.error(err);
    });

    function addGO(indent: string, name: string, id: number): string {
        return `${indent}"${name}": ${id},\n`;
    }
}
