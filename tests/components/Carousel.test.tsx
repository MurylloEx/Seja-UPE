import React from 'react';
import { Carousel } from '../../src/core/components';
import { render } from "../core";

test('render of Carousel', async () => {

  render(
    <Carousel
      length={4}
      currentIndex={0}
    />
  );

});