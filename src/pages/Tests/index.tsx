import React, { Fragment, FunctionComponent } from 'react';

import { ButtonGoogle, Header } from '../../core/components';
import { Scrollable } from './styles';

export interface TestsProps { }

export const Tests: FunctionComponent<TestsProps> = () => {
  return (
    <Fragment>
      <Scrollable>
        <Header canGoBack={true} />
        {/* <Accordion title="Título" body="Conteúdo" /> */}
        {/* <Text>Teste</Text> */}
        <ButtonGoogle onPress={() => {}} text="Entrar com Google" />
      </Scrollable>
    </Fragment>
  );
}