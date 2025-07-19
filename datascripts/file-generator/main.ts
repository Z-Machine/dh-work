import path from "node:path";
import * as fs from "fs";
import type { CreatureTemplate } from "wow/wotlk/std/Creature/CreatureTemplate";
import { std } from "wow/wotlk";

() => {
    const filepath = path.join(
        __dirname,
        "../../",
        "file-generator",
        "creatures.d.ts"
    );

    let content = `/* === THIS FILE IS GENERATED, DO NOT EDIT === */\n\n`;
    content += `import { std } from "wow/wotlk"\n\n`;

    std.CreatureTemplates.queryAll({}).forEach((creature) => {
        creature.Spawns.get().forEach((spawn) => {
            const position = spawn.Position.toPosition();
        });
        addNPC(content, creature);
    });

    //console.log(filepath);

    fs.writeFile(filepath, content, (err) => {
        if (err) console.error(err);
    });

    function addNPC(file: string, creature: CreatureTemplate): void {
        const name = creature.Name.enGB.get();
        const id = creature.ID;
        const ident = getValidIdentifier(`${name}_ID`);

        content += `const ${ident} = std.CreatureTemplates.load(${id});\n`;
    }

    function getValidIdentifier(s: string): string {
        // Replace invalid characters with underscore.
        s = s.replace(/[^a-zA-Z0-9_$]/g, "_");

        // Cannot begin with a number
        if (/^[0-9]/.test(s)) {
            s = `_${s}`;
        }

        // UPPERCASE
        return s.toUpperCase();
    }
};
