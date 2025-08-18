import { std } from "wow/wotlk";

const MOD_ID = "dh-kalimdor" as const;

const $ = {
    Area: {
        Tanaris: 440,
    },
    Creatures: {
        Sprinkle: 7583,
        "Chief Engineer Bilgewhizzle": 7407,
        "Security Chief Bilgewhizzle": 7882,
    },
    Quests: {
        "Wastewander Justice": 1690,
        "More Wastewander Justice": 1691,
        "Wanted: Caliph Scorpidsting": 2781,
        "Gadgetzan Water Survey": 992,
        "Noxious Lair Investigation": 82,
    },
} as const;

export default function WastewaterQuests(): void {
    std.Quests.load($.Quests["Wastewander Justice"])
        .PickupText.enGB.set(
            `You there! It's time for you to be a big helper to the Old Gadgetzan Water Company.` +
                `$B$BThe Wastewander nomads south of the slums have seized almost all the water wells! Without access to them, our water supply will dry up in no time. If you want to get in our good graces, then you'll help us bring justice to those nomads!` +
                `$B$BHead south-east of here and bring down ten Wastewander Bandits and Thieves, then report back to me on the double. Justice waits for no man... goblin... bah, just get on it!`
        )
        .CompleteText.enGB.set(
            `Now that's what I call efficiency! You've helped thin out the nomad's numbers enough now that we can start to think about how we can win back those water wells. The Old Gadgetzan Water Company thanks you for your help, but we're far from done in dealing with those foul nomads. Listen close - here's what we need next...`
        )
        .Questgiver.addCreatureBoth($.Creatures["Chief Engineer Bilgewhizzle"])
        .RaceMask.ALL.set(true)
        .QuestLevel.set(43)
        .MinLevel.set(40)
        .AreaSort.set($.Area.Tanaris);

    std.Quests.load($.Quests["More Wastewander Justice"])
        .IncompleteText.enGB.set(
            `Well, were you able to take out those nomads like I asked?  The Old Gadgetzan Water Company is developing plans based on your success here!  Don't let us down, now...`
        )
        .Questgiver.addCreatureBoth($.Creatures["Chief Engineer Bilgewhizzle"])
        .RaceMask.ALL.set(true)
        .QuestLevel.set(44)
        .MinLevel.set(40);
}
