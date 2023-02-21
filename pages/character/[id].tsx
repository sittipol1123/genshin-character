import React from 'react'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

interface Upgrade {
    name: string;
    value: string;
}

interface SkillTalent {
    name: string;
    unlock: string;
    description: string;
    upgrades: Upgrade[];
    type: string;
}

interface PassiveTalent {
    name: string;
    unlock: string;
    description: string;
    level: number;
}

interface Constellation {
    name: string;
    unlock: string;
    description: string;
    level: number;
}

interface Data {
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

export default function character() {
    const [data, setData] = useState<Data | null>(null);
    const router = useRouter();
    useEffect(() => {
        const { id } = router.query;
        const fetchData = async() =>{
            const res =  await fetch(`https://api.genshin.dev/characters/${id}`);
            const json = await res.json();
            setData(json);
            console.log(json);
        }
        fetchData();
    }, []);
    return (
        <div>{data?.name}</div>
    )
}
