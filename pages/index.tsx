import * as React from 'react';
import { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Container from '@mui/material/Container';
import Link from 'next/link'

type Data = Array<string>;

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

export default function Home() {
  const [data, setData] = useState<Data | null>(null);
  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetch('https://api.genshin.dev/characters')
      const json = await res.json();
      setData(json);
    }
    fetchdata();

  }, []);

  return (
    <>
      <Container maxWidth="lg" sx={{ bgcolor: '#0a1929', p: 2, borderRadius: 5 }}>
        <ImageList cols={4}>
          {data?.map((value: string, index: number) => (
            <ImageListItem key={index} sx={{ bgcolor: '#001e3c', borderRadius: 2, p: 2 }}>
              <Link href={`character/${value}`}>
                <img
                  src={`https://api.genshin.dev/characters/${value}/icon-big`}
                  srcSet={`https://api.genshin.dev/characters/${value}/icon-big`}
                  alt={value}
                  loading="lazy"
                />
                {/* {fetchCharacter(`${value}`)} */}
                {/* <ImageListItemBar
                  title={value}
                  subtitle={<span>full name: {value}</span>}
                  position="below"
                /> */}
                <ChildComponent title={value}></ChildComponent>
              </Link>
            </ImageListItem>
          ))}
          <ImageListItem></ImageListItem>
        </ImageList>
      </Container>
    </>
  )
}

type Props = {
  title: string
}

function ChildComponent({title}: Props) {
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