import { styled } from "@stitches/react";
import { Input } from "antd";
const { TextArea } = Input;

export const Container = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "50px 25px 30px",
  gap: "10px",
});

export const ButtonContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
});

export const ContentInput = styled(TextArea, {
  opacity: 0.5,
  color: "red",
});
