import { std } from "wow/wotlk";
import { QuestStates } from "wow/wotlk/std/Conditions/Settings/QuestState";
import { Ids } from "wow/wotlk/std/Misc/Ids";

const MOD_ID = "dh-kalimdor";

export default function GadgetzanIntroQuests(): void {
    const AreaTanaris = 440;

    // NPCs
    const Sprinkle = std.CreatureTemplates.load(7583);
    const ChiefEngineerBilgewhizzle = std.CreatureTemplates.load(7407);
    const SecurityChiefBilgewhizzle = std.CreatureTemplates.load(7882);

    Sprinkle.Tags.addUnique(MOD_ID, "sprinkle-npc");

    const WELCOME_TO_OLD_GADGETZAN = std.Quests.create(
        MOD_ID,
        "WELCOME-TO-OLD-GADGETZAN"
    )
        .PickupText.enGB.set(
            `Welcome traveler, what brings you to the quaint town of Old Gadgetzan, most folks go straight to the city these days. So it is good to see a new face around here. Let me show you around`
        )
        .CompleteText.enGB.set(
            `Enjoy your stay and I hope you are able to help some of our citizens here. It has been tough lately.`
        )
        .ObjectiveText.enGB.set(
            `Speak to Sprinkle about the state of Old Gadgetzan`
        )
        .Questgiver.addCreatureBoth(Sprinkle.ID)
        .RaceMask.ALL.set(true)
        .QuestLevel.set(40)
        .MinLevel.set(38)
        .Flags.SHARABLE.set(true)
        .Rewards.Difficulty.set(1)
        .AreaSort.set(AreaTanaris)
        .Tags.addUnique(MOD_ID, "welcome-to-old-gadgetzan-quest")
        .Name.enGB.set("Welcome to Old Gadgetzan");

    const MEET_THE_OLD_GADGETZAN_WATER_CO = std.Quests.create(
        MOD_ID,
        "MEET-THE-OLD-GADGETZAN-WATER-CO"
    )
        .ObjectiveText.enGB.set(`Speak to Chief Engineer Bilgewhizzle`)
        .PickupText.enGB.set(
            `The first bunch of goblins you should introduce yourself too is the Old Gadgetzan Water Co. They are always looking for suckers <cough cough> I mean adventurers to help out around the pumps.`
        )
        .CompleteText.enGB.set(
            `Well, if it isn't the new help that Sprinkle promised us, I will put you to work right away. Just come back when you have the time.`
        )
        .Questgiver.addCreatureStarter(Sprinkle.ID)
        .Questgiver.addCreatureEnder(ChiefEngineerBilgewhizzle.ID)
        .RaceMask.ALL.set(true)
        .QuestLevel.set(42)
        .MinLevel.set(40)
        .Rewards.Difficulty.set(1)
        .AreaSort.set(AreaTanaris)
        .PrevQuest.set(WELCOME_TO_OLD_GADGETZAN.ID)
        .NextQuest.set(1690) // Wastewander Justice
        .Name.enGB.set("Meet the Old Gadgetzan Water Co.");

    const TO_THE_SLUMS_WTTH_YOU = std.Quests.create(
        MOD_ID,
        "to-the-slums-with-you"
    )
        .ObjectiveText.enGB.set(`Speak to Security Chief Bilgewhizzle`)
        .PickupText.enGB.set(
            `You have come in great help here for us at the Old Gadgetzan Water Co. I know just the goblin for you to go meet. My old brother is the Security Chief down in the Slums of New Gadgetzan. Why don't you follow the road east and see the big city, but be careful. He may be the Security Chief, but he can't keep an eye on you all the time and no I know what you're thinkin', all we do is operate near there okay?`
        )
        .IncompleteText.enGB.set(
            `My brother is waiting for you $c! Hurry up and get a move on.`
        )
        .CompleteText.enGB.set(
            `So you are the $c that helped my little brother and his water company. I hope you can help me as well.`
        )
        .Questgiver.addCreatureStarter(ChiefEngineerBilgewhizzle.ID)
        .Questgiver.addCreatureEnder(SecurityChiefBilgewhizzle.ID)
        .RaceMask.ALL.set(true)
        .QuestLevel.set(45)
        .MinLevel.set(40)
        .Rewards.Difficulty.set(1)
        .AreaSort.set(AreaTanaris)
        .PrevQuest.set(2781) // WANTED: Caliph Scorpidsting
        .NextQuest.set(8366) // Southsea Shakedown
        .Name.enGB.set(`To the Slums With You`);
}
