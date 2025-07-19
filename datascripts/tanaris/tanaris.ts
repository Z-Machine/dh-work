import { Tanaris } from ".";

const runFileGenerators: boolean = false;

export function Tanaris_Main(): void {
    if (runFileGenerators) {
        Tanaris.FileGenerators.Creatures();
        Tanaris.FileGenerators.GameObjects();
    }

    Tanaris.Scripts.forEach((func) => {
        func();
    });
}
