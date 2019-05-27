import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';

import styled from 'styled-components';
import { LightingSlider } from '../src/components';
import { withRendition } from './helper';

const Wrapper = styled.div`
  background-color: black;
  width: 100%;
  height: 500px;
`;

storiesOf('LightingSlider', module)
    .addDecorator(withKnobs)
    .addDecorator(withRendition)
    .add('Default', () => {
        return (
            <Wrapper>
                <LightingSlider
                    controlledDevice={
                        {
                            id: 100,
                            name: 'Test',
                            active: boolean('Device is active?', true, 'Device'),
                            brightness: number('Device brightness', 30, {range: true, min: 0, max: 100, step: 1}, 'Device'),
                        }
                    }
                    onChangeComplete={action('changed')}
                />
            </Wrapper>
        );
    });
