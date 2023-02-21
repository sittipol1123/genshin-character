import * as React from 'react';
import { useState, useEffect } from 'react';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Character, Constellation, PassiveTalent, SkillTalent, Upgrade } from '@/models/CharacterModel';

type Props = {
    title: string
    children?: JSX.Element | JSX.Element[]
}

export function ChildComponent({ title, children }: Props) {
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
            {children}
        </div>
    );
}