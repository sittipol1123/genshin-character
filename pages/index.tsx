import * as React from 'react';
import { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Container from '@mui/material/Container';
import Link from 'next/link'
import {ChildComponent} from '../component/firstpage/ImageComponent'

type Data = Array<string>;

export default function Home() {
  const [data, setData] = useState<Data | null>(null);
  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetch('https://api.genshin.dev/characters');
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
            <ImageListItem key={index} sx={{ bgcolor: '#001e3c', borderRadius: 2, p: 2, cursor: 'pointer' }}>
              {/* <Link href={`character/${value}`}> */}
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
              {/* </Link> */}
            </ImageListItem>
          ))}
          <ImageListItem></ImageListItem>
        </ImageList>
      </Container>
    </>
  )
}