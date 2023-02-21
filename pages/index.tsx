import * as React from "react";
import { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Container from "@mui/material/Container";
import { ChildComponent } from "../component/firstpage/ImageComponent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Character } from "@/models/CharacterModel";
import { Fade } from "../component/firstpage/FadeModal";
// import Subnavbar from '../component/Subnavbar';

type Data = Array<string>;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "#121212",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [data, setData] = useState<Data | null>(null);
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<Character | null>(null);
  const [name, setName] = useState<string | null>(null);

  const handleOpen = async (name: string) => {
    const res = await fetch(`https://api.genshin.dev/characters/${name}`);
    const json = await res.json();
    setDetail(json);
    setName(name);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetch("https://api.genshin.dev/characters");
      const json = await res.json();
      setData(json);
    };
    fetchdata();
  }, []);

  // const [vision, setvision] = useState<Data | null>(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch("https://api.genshin.dev/elements");
  //     const json = await res.json();
  //     setvision(json);
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      {/* <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
          }}
          mt={2}
        >
          {vision?.map((value: string, index: number) => {
            return (
              <Typography sx={{ minWidth: 100, cursor: 'pointer' }} key={index}>
                <img
                  src={`https://api.genshin.dev/elements/${value}/icon`}
                  srcSet={`https://api.genshin.dev/elements/${value}/icon`}
                  alt={value}
                  loading="lazy"
                />
              </Typography>
            );
          })}
        </Box>
      </Container> */}
      <Container
        maxWidth="lg"
        sx={{ bgcolor: "#0a1929", p: 2, borderRadius: 5, marginTop: 2 }}
      >
        <ImageList cols={4}>
          {data?.map((value: string, index: number) => (
            <ImageListItem
              key={index}
              sx={{
                bgcolor: "#001e3c",
                borderRadius: 2,
                p: 2,
                cursor: "pointer",
              }}
              onClick={() => handleOpen(value)}
            >
              <img
                src={`https://api.genshin.dev/characters/${value}/icon-big`}
                srcSet={`https://api.genshin.dev/characters/${value}/icon-big`}
                alt={value}
                loading="lazy"
              />
              <ChildComponent title={value}></ChildComponent>
            </ImageListItem>
          ))}
          <ImageListItem></ImageListItem>
        </ImageList>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {detail ? detail.name : ""}
              </Typography>
              <img
                src={`https://api.genshin.dev/characters/${name}/card`}
                srcSet={`https://api.genshin.dev/characters/${name}/card`}
                loading="lazy"
                style={{ maxHeight: 500 }}
              />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {detail ? detail.title : ""}
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </Container>
    </>
  );
}
