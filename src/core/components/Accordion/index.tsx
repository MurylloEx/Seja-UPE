import React, { FunctionComponent, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons'; 

import { Render } from '../Render';
import { Container, Header, Title, Body, Text } from './styles';

export interface AccordionProps {
  onToggle?: (state: boolean) => void;
  title: string;
  body: string;
}

export const Accordion: FunctionComponent<AccordionProps> = ({ onToggle, title, body }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [paddingBottom, setPaddingBottom] = useState(0);
  const [borderRadius, setBorderRadius] = useState(8);
  
  function toggle(){
    if (!!onToggle)
      onToggle(!isOpen);
    setPaddingBottom(!isOpen ? 8 : 0);
    setBorderRadius(!isOpen ? 0 : 8);
    setIsOpen(!isOpen);
  }

  return (
    <Container paddingBottom={paddingBottom}>

      <Header 
        borderBottomRadius={borderRadius} 
        onPress={toggle}
      >
        <Title>{title}</Title>
        <FontAwesome 
          name={isOpen ? "caret-down" : "caret-right"} 
          size={24} 
          color="#fff" 
        />
      </Header>

      <Render if={isOpen}>
        <Body>
          <Text>
            {body}
          </Text>
        </Body>
      </Render>

    </Container>
  );
}
