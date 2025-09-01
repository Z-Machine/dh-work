import { std } from "wow/wotlk";
import { Tanaris } from "..";
import { GhostTroll } from "../trolls/village";

const MOD_ID = "dh-kalimdor" as const;

const $ = {
    Area: {
        Tanaris: 440,
    },
    Quests: {
        "The Thirsty Goblin": 2605,
        "Sprinkle's Secret Ingredient": 2641,
    },
} as const;

export default function TrollQuests(): void {
    const PleaseHelpUs = std.Quests.create(MOD_ID, "tanaris-please-help-us");
    const SuspiciousParasites = std.Quests.create(
        MOD_ID,
        "tanaris-sussy-parasites"
    );
    const CollectTrollSweat = std.Quests.create(MOD_ID, "tanaris-troll-sweat");
    const SprinklesElixir = std.Quests.create(
        MOD_ID,
        "tanaris-sprinkles-elixir"
    );

    // PleaseHelpUs Quest Item
    const TrollParasite = std.Items.create(MOD_ID, "tanaris-troll-parasite")
        .InventoryType.NON_EQUIPPABLE.set()
        .Quality.WHITE.set()
        .ItemLevel.set(40)
        .DisplayInfo.set(std.Items.load(3776).DisplayInfo.get())
        .Bonding.QUEST_ITEM.set()
        .Flags.HAS_QUEST_GLOW.set(true)
        .Price.set(0, 0, 1)
        .Name.enGB.set(`Troll Parasite Sample`);

    // SuspiciousParasites Quest Item
    const BundleOfParasites = std.Items.create(
        MOD_ID,
        "tanaris-bundle-parasites"
    )
        .InventoryType.NON_EQUIPPABLE.set()
        .Quality.WHITE.set()
        .ItemLevel.set(40)
        .DisplayInfo.set(std.Items.load(23568).DisplayInfo.get())
        .Bonding.QUEST_ITEM.set()
        .Flags.HAS_QUEST_GLOW.set(true)
        .Price.set(0, 0, 1)
        .Name.enGB.set(`Bundle of Parasites`);

    // Quests
    PleaseHelpUs.RaceMask.ALL.set(true)
        .PickupText.enGB.set(
            `Oh, thank the loa, $c. I need your help, our village has been infested by the Silithids.` +
                ` Losing their minds and their control. Please bring them peace.`
        )
        .IncompleteText.enGB.set(
            `Please $c, hurry and help my fellow villagers.`
        )
        .CompleteText.enGB.set(
            `Thank you! Without your help, I don't know what would have become of them.` +
                ` Please, take this small token of my appreciation for what you have done here.`
        )
        .Questgiver.addCreatureBoth(GhostTroll.ID)
        .Objectives.Item.add(TrollParasite.ID, 5)
        .QuestLevel.set(47)
        .MinLevel.set(40)
        .Rewards.Difficulty.DIFFICULTY_4.set()
        .Flags.SHARABLE.set(true)
        .AreaSort.set($.Area.Tanaris)
        .Name.enGB.set(`<TXT> Please Help Us!`)
        .NextQuest.set(SuspiciousParasites.ID);

    SuspiciousParasites.RaceMask.ALL.set(true)
        .PickupText.enGB.set(
            `Oh, thank the loa, $c. I need your help, our village has been infested by the Silithids.`
        )
        .IncompleteText.enGB.set(
            `Please $c, hurry and help my fellow villagers.`
        )
        .CompleteText.enGB.set(
            `Thank you! Without your help, I don't know what would have become of them.`
        )
        .Questgiver.addCreatureStarter(GhostTroll.ID)
        .Questgiver.addCreatureEnder(Tanaris.Creatures["Alchemist Pestlezugg"])
        .Objectives.Item.add(BundleOfParasites.ID, 1)
        .ProvidedItemCount.set(1)
        .QuestLevel.set(48)
        .MinLevel.set(40)
        .Rewards.Difficulty.DIFFICULTY_1.set()
        .AreaSort.set($.Area.Tanaris)
        .Name.enGB.set(`<TXT> Suspicious Parasites`)
        .NextQuest.set(CollectTrollSweat.ID);

    /*
    SuspiciousParasites.row.RequiredItemId1.set(BundleOfParasites.ID);
    SuspiciousParasites.row.RequiredItemCount1.set(1);
    */

    CollectTrollSweat.RaceMask.ALL.set(true)
        .Questgiver.addCreatureBoth(Tanaris.Creatures["Alchemist Pestlezugg"])
        .QuestLevel.set(48)
        .MinLevel.set(43)
        .Rewards.Difficulty.DIFFICULTY_4.set()
        .AreaSort.set($.Area.Tanaris)
        .Name.enGB.set(`<TXT> Troll Sweat`)
        .NextQuest.set(SprinklesElixir.ID);

    SprinklesElixir.RaceMask.ALL.set(true)
        .Questgiver.addCreatureStarter(
            Tanaris.Creatures["Alchemist Pestlezugg"]
        )
        .Questgiver.addCreatureEnder(Tanaris.Creatures.Sprinkle)
        .QuestLevel.set(48)
        .MinLevel.set(43)
        .Rewards.Difficulty.DIFFICULTY_1.set()
        .AreaSort.set($.Area.Tanaris)
        .Name.enGB.set(`<TXT> Sprinkle's Elixir`)
        .NextQuest.set($.Quests["The Thirsty Goblin"]);

    std.Quests.load($.Quests["The Thirsty Goblin"])
        .RaceMask.ALL.set(true)
        .CompleteText.enGB.set(
            `Oh, wonderful! Give it here -- let me try it! Oh, oh no, that is absolutely vile. Who could drink such a thing.`
        )
        .Questgiver.addObjectBoth(Tanaris.Creatures.Sprinkle)
        .NextQuest.set($.Quests["Sprinkle's Secret Ingredient"]);
}
