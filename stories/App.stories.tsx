import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { object, withKnobs } from '@storybook/addon-knobs';
import { withRendition } from './helper';
import App from '../src/App';
import {configureStore} from '../src/store';
import {Provider} from 'react-redux';

storiesOf('App', module)
    .addDecorator(withKnobs)
    .addDecorator(withRendition)
    .add('Default', () => {
        const initialState = {
            user: {
                name: 'Name',
                surname: 'Surname',
            },
            menu: {
                heading: 'Lighting',
            },
            devices: {
                all: {
                    1: { id: 1, name: 'Balcony', active: true, brightness: 50 },
                    2: { id: 2, name: 'Bedroom 01', active: false, brightness: 70 },
                    3: { id: 3, name: 'Bedroom 02', active: false, brightness: 70 },
                    4: { id: 4, name: 'Entrance', active: true, brightness: 100 },
                    5: { id: 5, name: 'Kitchen', active: true, brightness: 100 },
                    6: { id: 6, name: 'Living Room', active: true, brightness: 40 },
                    7: { id: 7, name: 'Master Bedroom', active: false, brightness: 60 },
                    8: { id: 8, name: 'Storage', active: false, brightness: 100 }
                },
                selectedDeviceId: 4,
            },
        };
        const state = object('State', initialState);
        return (
            <Provider store={configureStore(state)}>
                <App />
            </Provider>
        );
    });