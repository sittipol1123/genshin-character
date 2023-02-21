import React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

type Data = Array<string>;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#001e3c",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#fff",
}));

export default function Artifacts() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetch("https://api.genshin.dev/artifacts");
      const json = await res.json();
      setData(json);
      // console.log(json);
    };
    fetchdata();
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{ bgcolor: "#0a1929", p: 2, borderRadius: 5, marginTop: 2 }}
    >
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {data?.map((value: string, index: number) => {
            return (
              <Grid item xs={3} key={index}>
                <Item>
                  <img
                    src={`https://api.genshin.dev/artifacts/${value}/flower-of-life`}
                    srcSet={`https://api.genshin.dev/artifacts/${value}/flower-of-life`}
                    loading="lazy"
                    style={{ height: 60, maxWidth: "100%" }}
                  />
                  <p>{value}</p>
                </Item>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
}
