export interface Upgrade {
    name: string;
    value: string;
}

export interface SkillTalent {
    name: string;
    unlock: string;
    description: string;
    upgrades: Upgrade[];
    type: string;
}

export interface PassiveTalent {
    name: string;
    unlock: string;
    description: string;
    level: number;
}

export interface Constellation {
    name: string;
    unlock: string;
    description: string;
    level: number;
}

export interface Character {
    name: string;
    title: string;
    vision: string;
    weapon: string;
    nation: string;
    affiliation: string;
    rarity: number;
    constellation: string;
    birthday: string;
    description: string;
    skillTalents: SkillTalent[];
    passiveTalents: PassiveTalent[];
    constellations: Constellation[];
    vision_key: string;
    weapon_type: string;
}