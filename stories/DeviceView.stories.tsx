import * as React from 'react';
import { storiesOf } from '@storybook/react';

import {object, withKnobs} from '@storybook/addon-knobs';

import { DeviceView } from '../src/views';
import { action } from '@storybook/addon-actions';
import { withRendition } from './helper';

storiesOf('DeviceView', module)
    .addDecorator(withKnobs)
    .addDecorator(withRendition)
    .add('Default', () => {
        const initialDevices = [
            { id: 1, name: 'Balcony', active: true, brightness: 50 },
            { id: 2, name: 'Bedroom 01', active: false, brightness: 70 },
            { id: 3, name: 'Bedroom 02', active: false, brightness: 70 },
            { id: 4, name: 'Entrance', active: true, brightness: 100 },
            { id: 5, name: 'Kitchen', active: true, brightness: 100 },
            { id: 6, name: 'Living Room', active: true, brightness: 40 },
            { id: 7, name: 'Master Bedroom', active: false, brightness: 60 },
            { id: 8, name: 'Storage', active: false, brightness: 100 }
        ];
        const devices = object('Devices', initialDevices)
        return (
            <DeviceView
                devices={devices}
                selectedDevice={initialDevices[0]}
                onSelectDevice={action('select device')}
                onDeviceStateToggle={action('toggle device')}
            />
        );
    });