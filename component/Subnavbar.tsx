import * as React from "react";
import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";

// type Data = {
//     message: string;
// };

type Data = Array<string>;

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

export default function Subnavbar() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://api.genshin.dev/elements");
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, []);
  return (
    <React.Fragment>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
          }}
          mt={2}
        >
          {data?.map((value: string, index: number) => {
            return (
              <Typography sx={{ minWidth: 100 }} key={index}>
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
      </Container>
    </React.Fragment>
  );
}
