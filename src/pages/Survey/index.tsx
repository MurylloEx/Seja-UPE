import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import React, { Fragment, FunctionComponent, useRef, useState } from 'react';

import { AssetRobotNormalIcon } from '../../assets';
import { WelcomeNavigationProp } from '../../routes';
import { Survey as SurveyConfig, SurveyChoices, SurveyType } from '../../core/config';
import {
  Avatar,
  Button,
  CardBaloonBottom,
  HorizontalContent,
  PageLayout,
  Paragraph,
  Progress,
  Radio,
  Render,
  Spacer,
  useRadioGroup
} from '../../core/components';

import {
  ButtonContainer,
  ButtonSpacer,
  ChoiceContainer,
  RadioContainer,
  RobotContainer
} from './styles';
import { getSurveyResults } from '../../core/services';
import { useSurveyResults } from '../../core/hooks';

export interface SurveyProps { }

export const Survey: FunctionComponent<SurveyProps> = () => {
  const navigation = useNavigation<WelcomeNavigationProp>();

  const maxProgress = SurveyConfig.length;

  const [progress, setProgress] = useState(1);
  const [questions] = useState<SurveyType>(SurveyConfig);
  const [group, setGroup, clearGroup] = useRadioGroup(5);
  const [, setSurveyResults] = useSurveyResults();
  const choices = useRef<SurveyChoices>([]);
  const choiceId = useRef<number>(-1);

  function onChoiceChanged(e: number){
    choiceId.current = e;
  }

  function doSurveyBack(){
    choiceId.current = -1;
    setProgress(progress-1);
    clearGroup();
  }

  function doSurveyAdvance(isFinished: boolean){    
    if ((choiceId.current != -1) && !isFinished){
      choices.current.push(questions[progress - 1].Options[choiceId.current]);
      choiceId.current = -1;
      setProgress(progress+1);
      clearGroup();
    } else {
      Alert.alert(
        'Precisamos da sua resposta', 
        'Para prosseguir e visualizar a próxima ' + 
        'pergunta, responda esta primeiro e marque ' +
        'uma das opções que mais corresponde a você.'
      );
    }
    if (isFinished){
      setSurveyResults(getSurveyResults(choices.current));
      navigation.navigate('Suggestions');
    }
  }

  return (
    <PageLayout 
      showHeader
    >
      <Progress value={progress} maxValue={maxProgress} />
      <Spacer verticalSpace={16} />

      <RobotContainer>
        <Avatar source={AssetRobotNormalIcon} diameter={128} padding={16} />
      </RobotContainer>

      <Spacer verticalSpace={4} />

      <CardBaloonBottom>
        <Paragraph 
          fontSize="16px" 
          paddingLeft="8px" 
          paddingRight="8px" 
          paddingTop="8px" 
          paddingBottom="8px"
        >
          {questions[progress-1].Question}
        </Paragraph>
      </CardBaloonBottom>

      <Spacer verticalSpace={32} />

      {questions[progress - 1].Options.map((option, i) => (
        <Fragment key={String(i)}>
          <ChoiceContainer>
            <RadioContainer>
              <Radio
                reference={group[i]}
                group={group}
                onPress={onChoiceChanged}
                onHandle={setGroup}
              />
            </RadioContainer>
            <Paragraph>
              {option.Text} 
            </Paragraph>
          </ChoiceContainer>
          <Spacer verticalSpace={16} />
        </Fragment>
      ))}
      <Spacer verticalSpace={32} />

      <HorizontalContent>

        <Render if={progress > 1}>
          <ButtonContainer>
            <Button 
              text="Voltar" 
              bgColor="white" 
              color="blue" 
              onPress={doSurveyBack}
            />
          </ButtonContainer>

          <ButtonSpacer />
        </Render>

        <ButtonContainer>
          <Button
            text={progress == maxProgress ? "Finalizar" : "Avançar"}
            onPress={() => doSurveyAdvance(progress == maxProgress)}
            bgColor="blue"
            color="white"
          />
        </ButtonContainer>

      </HorizontalContent>

    </PageLayout>
  );
}
