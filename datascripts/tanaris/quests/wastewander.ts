import { std } from "wow/wotlk";
import { Tanaris } from "..";

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
        .MinLevel.set(40)
        .AreaSort.set($.Area.Tanaris)
        .PrevQuest.set($.Quests["Wastewander Justice"]);

    std.Quests.load($.Quests["Wanted: Caliph Scorpidsting"])
        .PickupText.enGB.set(
            `WANTED: Caliph Scorpidsting!` +
                `$B$BThe Old Gadgetzan Water Company of Gadgetzan, Tanaris will pay a high bounty for the head of Caliph Scorpidsting, leader of the Wastewander outlaws. His crimes include:` +
                `$B$B1. Murdering Old Gadgetzan Water Co. employees!` +
                `$B2. Stealing Old Gadgetzan Water Co. resources!` +
                `$B3. Seizing Old Gadgetzan Water Co. property!` +
                `$B$BBring proof of Caliph Scorpidsting's demise to Chief Engineer Bilgewhizzle for an immediate reward!`
        )
        .IncompleteText.enGB.set(
            `Yes $c, I am an official of the Old Gadgetzan Water Company.  What can I assist you with?`
        )
        .CompleteText.enGB.set(
            `"Finally - justice is served!  You have struck a mighty blow against those vile nomads!  With Scorpidsting's demise, this might be just the thing to finally push those squatters off of Gadgetzan's water wells!` +
                `$B$BBy the authority of the Old Gadgetzan Water Company, I gladly award you with this bounty.  You've done a great service for us all."`
        )
        .Questgiver.addCreatureEnder($.Creatures["Chief Engineer Bilgewhizzle"])
        .RaceMask.ALL.set(true)
        .QuestLevel.set(46)
        .MinLevel.set(38)
        .AreaSort.set($.Area.Tanaris)
        .PrevQuest.set($.Quests["More Wastewander Justice"]);

    std.Quests.load($.Quests["Gadgetzan Water Survey"])
        .PickupText.enGB.set(
            `We've got a position open for a temporary junior-grade surveyor in the Old Gadgetzan Water Company, if you're interested!` +
                `$B$BWith the nomads seizing all our wells, we need to exploit more free sources of water! There is water to be had in the desert, but only to those smart enough to survey them first.` +
                `$B$BTake this dowsing widget and tap a sample of the water by the pool near Sandsorrow Watch. It's right in sight of the trolls around there. Bring the tapped widget back to me when you're done!`
        )
        .CompleteText.enGB.set(
            `What's this?  You were ambushed by some sort of bad mojo creepy-crawly?  Oh, this does not bode well for the Old Gadgetzan Water Company, no indeed...` +
                `$B$BI guess I should have told you about the reports coming in on some crazy bug-creatures that appear to be sucking up all the water in the desert.  At first, I thought it was just a crock.  We have enough trouble with the nomads as is; I thought it was just more of their shenanigans.  Well, now we know at least!`
        )
        .RaceMask.ALL.set(true)
        .Questgiver.addCreatureBoth(
            Tanaris.Creatures["Senior Surveyor Fizzledowser"]
        )
        .QuestLevel.set(46)
        .MinLevel.set(38)
        .AreaSort.set($.Area.Tanaris);

    std.Quests.load($.Quests["Noxious Lair Investigation"])
        //.PickupText.enGB.set()
        //.CompleteText.enGB.set()
        .RaceMask.ALL.set(true)
        .Questgiver.addCreatureStarter(
            Tanaris.Creatures["Senior Surveyor Fizzledowser"]
        )
        .Questgiver.addCreatureEnder(Tanaris.Creatures["Alchemist Pestlezugg"])
        .QuestLevel.set(47)
        .MinLevel.set(39)
        .AreaSort.set($.Area.Tanaris);
}
