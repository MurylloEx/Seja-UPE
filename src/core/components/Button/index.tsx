import React, { FunctionComponent } from "react";
import { GestureResponderEvent } from "react-native";

import { useTheme } from "../../hooks";
import { ThemeValue } from "../../providers";
import { Container, Label } from "./styles";

export interface ButtonProps {
  onPress?: (e: GestureResponderEvent) => void;
  text: string;
  bgColor: keyof ThemeValue;
  color?: keyof ThemeValue;
}

export const Button: FunctionComponent<ButtonProps> = ({ onPress, text, bgColor, color }) => {
  const [theme] = useTheme();

  return (
    <Container bgColor={bgColor} {...theme} onPress={onPress}>
      <Label numberOfLines={1} color="#e3e3e3" {...theme}>{text}</Label>
    </Container>
  );
}
