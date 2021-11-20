import React, { FunctionComponent, useState } from 'react';

import { Container } from './styles';
import { AssetRobotNormalIcon } from '../../assets';
import { OAuth2LoginAsync } from '../../core/services';
import {
  Avatar,
  ButtonGoogle,
  ButtonStep,
  Carousel,
  PageLayout,
  Paragraph,
  Render,
  Spacer,
  Title
} from '../../core/components';

export interface WelcomeProps { }

export const Welcome: FunctionComponent<WelcomeProps> = () => {
  const [step, setStep] = useState(0);

  async function OAuth2DoLogin(){
    let { error, cancelled, token, idToken, user } = await OAuth2LoginAsync();
    if (!error && !cancelled){
      //Login bem-sucedido!
      console.log(user, token, idToken);
    } else {
      //Login mal-sucedido!
      console.log('Error while logging in Google Account.');
    }
  }

  function customBackHandler() {
    if (step > 0)
      setStep(step-1);
    return true;
  }

  return (
    <PageLayout 
      showHeader
      canScroll
      canGoBack
      onBackPressed={customBackHandler}
    >
      <Container>
        <Spacer verticalSpace={16} />

        <Avatar 
          source={AssetRobotNormalIcon} 
          diameter={256} 
          padding={16} 
        />

        <Spacer verticalSpace={16} />

        <Render if={step == 0}>
          <Title align="center">BEM-VINDO(A)! 😄</Title>
        </Render>

        <Render if={step == 1}>
          <Title align="center">VOCÊ É QUEM DECIDE</Title>
        </Render>

        <Render if={step == 2}>
          <Title align="center">QUERO AJUDAR VOCÊ</Title>
        </Render>

        <Render if={step == 3}>
          <Title align="center">DEIXE-ME CONHECÊ-LO MELHOR</Title>
        </Render>

        <Render if={step == 4}>
          <Title align="center">VAMOS COMEÇAR?</Title>
        </Render>

        <Spacer verticalSpace={8} />

        <Render if={step == 0}>
          <Paragraph justify >
            Eu sou o UPerson, daqui pra frente vou  ajudar você a decidir seu tão sonhado 
            curso ❤️!
          </Paragraph>
        </Render>

        <Render if={step == 1}>
          <Paragraph justify >
            Nosso objetivo não é decidir o curso por você, mas fornecer informações que te 
            possibilitem identificar seus pontos fortes.
          </Paragraph>
        </Render>

        <Render if={step == 2}>
          <Paragraph justify>
            Quero ajudá-lo a encontrar o curso que você melhor se identifica. Na UPE, temos 
            vários cursos que podem se adequar a ao seu gosto e provavelmente você se encaixa 
            em algum deles...
          </Paragraph>
        </Render>

        <Render if={step == 3}>
          <Paragraph justify>
            Mas antes precisarei realizar algumas perguntas para te ajudar! Suas escolhas dizem 
            muito sobre você, então pense bem antes de fornecer suas respostas...
          </Paragraph>
        </Render>

        <Render if={step == 4}>
          <Paragraph justify>
            Vamos começar vendo quais são as suas áreas de interesse, o que você não gosta e ao 
            final farei algumas perguntas relacionadas ao seu tempo!
          </Paragraph>
        </Render>

        <Spacer verticalSpace={16} />

        <Render if={step < 4}>
          <Carousel 
            length={4} 
            currentIndex={step} 
          />
          <Spacer verticalSpace={32} />
          <ButtonStep text="Continuar" onPress={() => setStep(step+1)}/>
        </Render>

        <Render if={step == 4}>
          <Spacer verticalSpace={24} />
          <ButtonGoogle onPress={() => OAuth2DoLogin()} text="Entrar com Google" />
        </Render>

      </Container>
    </PageLayout>
  );
}