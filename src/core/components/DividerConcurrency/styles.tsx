import styled from "styled-components/native";
import { ThemeValue } from "../../providers";

export const Container = styled.View.attrs<ThemeValue>(props => props)<ThemeValue>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
  padding-left: 16px;
  padding-right: 16px;
  height: 49px;
  background-color: ${props => props.blue};
`;

export const Banner = styled.Image`
  height: 40px;
  width: 40px;
`;

export const Title = styled.Text.attrs<ThemeValue>(props => props)<ThemeValue>`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-left: 16px;
  color: ${props => props.textColor};
`;