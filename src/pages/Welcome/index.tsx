import React, { FunctionComponent, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Alert, ImageSourcePropType } from 'react-native';

import { Container } from './styles';
import { OAuth2Payload } from '../../core/services';
import { SuggestionsNavigationProp } from '../../routes';

import {
  ApiResponse,
  CampusResponse,
  useAuthorize,
  useCampusWithCourses,
  useGlobal,
  useGoogleAuth,
  useIsSessionActive,
} from '../../core/hooks';

import {
  AssetRobotKindIcon,
  AssetRobotQuestionsIcon,
  AssetRobotSmileDownIcon,
  AssetRobotSmileIcon
} from '../../assets';

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
  const navigation = useNavigation<SuggestionsNavigationProp>();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const [doLogin] = useGoogleAuth({ onResponse: onGoogleResponse });
  const [authorization, success, authorize] = useAuthorize(onAuthorizeResponse);
  const isSessionActive = useIsSessionActive();
  const [global, setGlobal] = useGlobal();

  const [,,getCourses] = useCampusWithCourses((success: boolean, response: ApiResponse<CampusResponse>) => {
    if (success){
      setGlobal({...global, data: response.data.response});
      setShowSuggestions(true);
    }
    else {
      Alert.alert(
        'Oops, estamos passando por problemas!', 
        'Parece que não conseguimos obter a lista mais recente dos cursos da UPE. ' + 
        'Desculpe-nos pelo inconveniente, mas é possível que o aplicativo esteja em ' + 
        'manutenção ou você esteja desconectado da Internet. Tente novamente em alguns minutos.');
    }
    setTimeout(() => setIsLoading(false), 1000);
  });
  
  useEffect(() => {
    if (isSessionActive){
      getCourses();
      setIsLoading(true);
    }
  }, [isSessionActive]);

  useEffect(() => {
    if (showSuggestions) 
      navigation.navigate('Suggestions');
  }, [showSuggestions]);
  
  function onAuthorizeResponse() {
    if (success && !authorization?.data.error){
      getCourses();
    }
  }

  function onGoogleResponse(user: OAuth2Payload | undefined, isAuthenticated: boolean){
    if (isAuthenticated){
      authorize(String(user?.idToken));
    } else {
      Alert.alert('Erro ao acessar conta Google', 
        'Não foi possível acessar sua conta Google, ' + 
        'você cancelou o procedimento? Tente novamente.');
    }
  }

  function onGoogleButtonClick(){
    setIsLoading(true);
    doLogin();
  }

  function customBackHandler() {
    if (step > 0)
      setStep(step-1);
    return true;
  }

  function getRobotIcon(): ImageSourcePropType {
    return [
      AssetRobotSmileDownIcon,
      AssetRobotKindIcon,
      AssetRobotSmileDownIcon,
      AssetRobotQuestionsIcon
    ][step] ?? AssetRobotSmileIcon;
  }

  return (
    <PageLayout 
      showHeader
      showSpinner={isLoading}
      canGoBack
      onBackPressed={customBackHandler}
    >
      <Container>
        <Spacer verticalSpace={16} />

        <Avatar
          source={getRobotIcon()}
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
          <Paragraph justify>
            Eu sou o UPerson, daqui pra frente vou  ajudar você a decidir seu tão sonhado 
            curso ❤️!
          </Paragraph>
        </Render>

        <Render if={step == 1}>
          <Paragraph justify>
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
          <ButtonGoogle onPress={onGoogleButtonClick} text="Entrar com Google" />
        </Render>

      </Container>
    </PageLayout>
  );
}