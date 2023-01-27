import type { Event } from "@prisma/client";

type SeedEvent = Event & { groups: string[] };

const events: SeedEvent[] = [
    {
        fullName: "Floor Exercise",
        key: "FX",
        groups: [
            "Non-acrobatic elements",
            "Acrobatic elements forward",
            "Acrobatic elements backward",
        ],
    },
    {
        fullName: "Pommel Horse",
        key: "PH",
        groups: [
            "Single leg swings and scissors",
            "Circle and flairs, with and/or without spindles and handstands, Kehrswings, Russian w., flops and combined elements",
            "Travel type elements, including Krolls, Tong Fei, Wu Guonian, Roth and Traveling Spindles",
            "Dismounts",
        ],
    },
    {
        fullName: "Still Rings",
        key: "SR",
        groups: [
            "Kip and swing elements & swings through or to handstand",
            "Strength elements and hold elements (2 sec.)",
            "Swing to Strength hold elements (2 sec.)",
            "Dismounts",
        ],
    },
    {
        fullName: "Vault",
        key: "VT",
        groups: [
            "Single salto vaults with complex twists",
            "Handspring salto vaults with or without simple twists, and all double salto fwd",
            "Handspring with ¼ or ½ turn in the 1st flight phase",
            "Round off entry vaults",
        ],
    },
    {
        fullName: "Parallel Bars",
        key: "PB",
        groups: [
            "Elements in support or through support on 2 bars",
            "Elements starting in upper arm position",
            "Long swings in hang en 1 or 2 bars and underswings",
            "Dismounts",
        ],
    },
    {
        fullName: "High Bar",
        key: "HB",
        groups: [
            "Long hang swings and turns",
            "Flight elements",
            "In bar and Adler elements",
            "Dismounts",
        ],
    },
];

export { events };
