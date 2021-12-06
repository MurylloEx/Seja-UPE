import React, { Fragment, FunctionComponent, useState } from 'react';
import { FlatList, ImageSourcePropType } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';

import { RoutesParamList } from '../../routes';

import {
  CampusNavigationProp,
  CourseProfessorNavigationProp,
  CoursePlanningNavigationProp,
  CourseConcurrencyNavigationProp
} from '../../routes';

import {
  AssetCardCourseLogo,
  AssetWidgetCampusIcon,
  AssetWidgetClassificationIcon,
  AssetWidgetPlanningIcon,
  AssetWidgetProfessorsIcon
} from '../../assets';

import {
  Accordion,
  ButtonWidget,
  CardCourse,
  ModalEvaluation,
  PageLayout,
  Paragraph,
  Spacer,
  TitleOutline
} from '../../core/components';

import { useEnterScreen, useLeaveScreen } from '../../core/hooks';

type WidgetData = {
  key: string;
  title: string;
  route: keyof RoutesParamList;
  icon: ImageSourcePropType;
  params: any;
}

type NavigationProps =  CampusNavigationProp 
                      | CourseProfessorNavigationProp 
                      | CoursePlanningNavigationProp 
                      | CourseConcurrencyNavigationProp;

export interface CourseProps { }

export const Course: FunctionComponent<CourseProps> = () => {

  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<RoutesParamList, 'Course'>>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [widgets, setWidgets] = useState<WidgetData[]>([
    { key: '0', title: 'Sobre o Campus',      route: 'Campus',            icon: AssetWidgetCampusIcon,          params: route.params.Campus }, 
    { key: '1', title: 'Corpo docente',       route: 'CourseProfessors',  icon: AssetWidgetProfessorsIcon,      params: route.params.Course }, 
    { key: '2', title: 'Projeto Pedagógico',  route: 'CoursePlanning',    icon: AssetWidgetPlanningIcon,        params: route.params.Course }, 
    { key: '3', title: 'Notas de Corte',      route: 'CourseConcurrency', icon: AssetWidgetClassificationIcon,  params: route.params.Course }
  ]);

  useEnterScreen(() => {
    setIsLoading(false);
    setTimeout(() => setIsModalOpen(true), 6000);
  });

  useLeaveScreen(() => {
    setIsLoading(true);
  });

  function onWidgetClick(item: WidgetData){
    navigation.navigate(item.route, );
  }

  return (
    <PageLayout
      showHeader
      showSpinner={isLoading}
      canGoBack
    >

      <CardCourse text={route.params.Course.name ?? ""} banner={AssetCardCourseLogo} />
      <Spacer verticalSpace={32} />

      <FlatList
        data={widgets}
        renderItem={({ item }) => (
          <Fragment>
            <ButtonWidget legend={item.title} banner={item.icon} onPress={() => onWidgetClick(item)} />
          </Fragment>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      <Spacer verticalSpace={16} />

      <TitleOutline title="Detalhes do Curso" />
      <Spacer verticalSpace={32} />

      <Accordion title="Sobre o Curso" beginOpen>
        <Paragraph paddingLeft="16px" paddingRight="16px" paddingTop="16px">
          {route.params.Course.about ?? "Informação indisponível para este curso."}
        </Paragraph>
      </Accordion>
      <Spacer verticalSpace={24} />

      <Accordion title="Perfil do Curso">
        <Paragraph paddingLeft="16px" paddingRight="16px" paddingTop="16px">
          {route.params.Course.profile ?? "Informação indisponível para este curso."}
        </Paragraph>
      </Accordion>
      <Spacer verticalSpace={24} />

      <Accordion title="Contexto Histórico">
        <Paragraph paddingLeft="16px" paddingRight="16px" paddingTop="16px">
          {route.params.Course.history ?? "Informação indisponível para este curso."}
        </Paragraph>
      </Accordion>
      <Spacer verticalSpace={24} />

      <Accordion title="Áreas de Atuação">
        <Paragraph paddingLeft="16px" paddingRight="16px" paddingTop="16px">
          {route.params.Course.expertiseAreas ?? "Informação indisponível para este curso."}
        </Paragraph>
      </Accordion>
      <Spacer verticalSpace={24} />

      <Accordion title="Mercado de Trabalho">
        <Paragraph paddingLeft="16px" paddingRight="16px" paddingTop="16px">
          {route.params.Course.jobMarket ?? "Informação indisponível para este curso."}
        </Paragraph>
      </Accordion>
      <Spacer verticalSpace={24} />

      <Accordion title="Como Ingressar">
        <Paragraph paddingLeft="16px" paddingRight="16px" paddingTop="16px">
          {route.params.Course.ingress ?? "Informação indisponível para este curso."}
        </Paragraph>
      </Accordion>

      <ModalEvaluation 
        type="popularity" 
        isOpen={isModalOpen} 
        onResult={console.log} 
      />

    </PageLayout>
  );
}
