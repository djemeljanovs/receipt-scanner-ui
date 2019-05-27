import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';

import styled from 'styled-components';
import { ToggleSwitch } from '../src/components';
import { withRendition } from './helper';

const Wrapper = styled.div`
  padding: 10px;
`;

storiesOf('ToggleSwitch', module)
    .addDecorator(withKnobs)
    .addDecorator(withRendition)
    .add('Default', () => {
        return (
            <Wrapper>
                <ToggleSwitch on={boolean('On [#1]', true)} onChange={action('change [#1]')}/>
                <br/>
                <ToggleSwitch on={boolean('On [#2]', false)} onChange={action('change [#2]')}/>
            </Wrapper>
        );
    });