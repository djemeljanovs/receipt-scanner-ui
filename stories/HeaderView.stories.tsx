import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { HeaderView } from '../src/views';
import { withRendition } from './helper';

storiesOf('HeaderView', module)
    .addDecorator(withKnobs)
    .addDecorator(withRendition)
    .add('Default', () => {
        return (
                <HeaderView
                    name={text('Name', 'Name')}
                    surname={text('Surname', 'Surname')}
                />
        );
    });