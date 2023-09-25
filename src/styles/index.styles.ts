import { styled } from "@stitches/react";

export const Container = styled("main", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "50px 25px 30px",
  gap: "10px",
});

export const Content = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-end",
  gap: "10px",
});
