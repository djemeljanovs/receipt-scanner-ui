import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { text, withKnobs } from '@storybook/addon-knobs';

import { Gravatar } from '../src/components';
import { withRendition } from './helper';

storiesOf('Gravatar', module)
    .addDecorator(withKnobs)
    .addDecorator(withRendition)
    .add('Default', () => {
        return (
            <Gravatar
                name={text('Name', 'Name')}
                surname={text('Surname', 'Surname')}
            />
        );
    });