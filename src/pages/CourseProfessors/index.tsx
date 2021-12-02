import { useNavigation } from '@react-navigation/core';
import React, { FunctionComponent } from 'react';

import { RobotContainer } from './styles';

import {
  Avatar,
  CardBaloon,
  CardProfessor,
  PageLayout,
  Paragraph,
  Spacer,
  TitleOutline
} from '../../core/components';

import { CourseProfessorNavigationProp } from '../../routes';
import { AssetRobotKindIcon, AssetWidgetProfessorsIcon } from '../../assets';

export interface CourseProfessorsProps { }

export const CourseProfessors: FunctionComponent<CourseProfessorsProps> = () => {
  const navigation = useNavigation<CourseProfessorNavigationProp>();
  
  const photo = 'https://images.generated.photos/Ra3atuRPvZSe0FkVXmykFEl-oiLNEuc_U1rTkZ3gZs8/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzI3MTAxLmpwZw.jpg';
  const areas = ['Engenharia', 'Computação', 'Design', 'Exatas'];
  const shortbio = 'É doutoranda pela Universidade Federal de Pernambuco (UFPE). Possui mestrado na área de Engenharia de Software pela Universidade de Pernambuco (2012). Possui graduação em Sistemas de Informação pela Universidade de Pernambuco (2010). Atualmente é professora assistente da Universidade de Pernambuco conduzindo pesquisas na área de Tecnologia e Educação e ensino de Computação baseado PBL.'
  
  function onDetailClick(){
    navigation.navigate('CourseProfessor');
  }

  return (
    <PageLayout 
      showHeader
      canGoBack
    >
      <TitleOutline title="Corpo docente" icon={AssetWidgetProfessorsIcon} />
      <Spacer verticalSpace={32} />

      <RobotContainer>

        <Avatar source={AssetRobotKindIcon} diameter={80} padding={16} />
        <CardBaloon direction="left">
          <Paragraph paddingLeft="16px" paddingRight="16px" paddingTop="16px" paddingBottom="16px" justify>
            Atualmente no curso de Engenharia de Software, 
            possuímos 33 professores.
          </Paragraph>
        </CardBaloon>

      </RobotContainer>

      <Spacer verticalSpace={32} />

      <TitleOutline title="Docentes do curso" bold={false} />
      <Spacer verticalSpace={32} />

      <CardProfessor 
        name="Ariane Nune Rodrigues" 
        photo={{ uri: photo }} 
        shortbio={shortbio} 
        areas={areas}
        onPress={onDetailClick} 
      />
      <Spacer verticalSpace={16} />

      <CardProfessor 
        name="Ariane Nune Rodrigues" 
        photo={{ uri: photo }} 
        shortbio={shortbio} 
        areas={areas}
        onPress={onDetailClick}
      />
      <Spacer verticalSpace={16} />

      <CardProfessor 
        name="Ariane Nune Rodrigues" 
        photo={{ uri: photo }} 
        shortbio={shortbio} 
        areas={areas}
        onPress={onDetailClick}
      />
      <Spacer verticalSpace={16} />

      <CardProfessor 
        name="Ariane Nune Rodrigues" 
        photo={{ uri: photo }} 
        shortbio={shortbio} 
        areas={areas} 
        onPress={onDetailClick}
      />

      <Spacer verticalSpace={16} />

    </PageLayout>
  );
}
