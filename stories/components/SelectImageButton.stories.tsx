import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { SelectImageButton } from '../../src/components/SelectImageButton';

storiesOf('SelectImageButton', module)
    .add('Default', () => {
        return (
            <SelectImageButton
                loading={false}
                onSelectImage={() => {}}
            />
        );
    });
