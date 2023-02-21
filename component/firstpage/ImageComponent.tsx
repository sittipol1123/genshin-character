import * as React from 'react';
import { useState, useEffect } from 'react';
import ImageListItemBar from '@mui/material/ImageListItemBar';

type Props = {
    title: string
}

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
  
  interface Character {
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

export function ChildComponent({ title }: Props) {
    const [detail, setDetail] = useState<Character | null>(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            const res = await fetch(`https://api.genshin.dev/characters/${title}`);
            const json = await res.json();
            setDetail(json);
            // console.log(json);
        }

        fetchCharacter();
    }, []);

    return (
        <div>
            <ImageListItemBar
                title={detail?.name}
                subtitle={<span>vision: {detail?.vision}</span>}
                position="below"
                sx={{ bgcolor: '#0a1929', p: 1, marginTop: 1 }}
            />
        </div>
    );
}