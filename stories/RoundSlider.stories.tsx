import * as React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { color, number, withKnobs } from '@storybook/addon-knobs';
import { RoundSlider } from '../src/components';

const stories = storiesOf('RoundSlider', module);
stories.addDecorator(withKnobs);

const Polar = styled.div`
  position: absolute;
  width: 225px;
  height: 225px;
  background: url('./static/polar.png') no-repeat center center;
  background-size: contain;
`;

stories.add('Default', () => {
    return (
        <RoundSlider
            activeStrokeColor={[
                color('Bg active color #1', 'red'),
                color('Bg active color #2', 'red'),
            ]}
            inactiveStrokeColor={color('Bg inactive color', 'grey')}
            strokeWidth={number('Stroke width', 20)}
            radius={number('Radius', 100)}
            values={{
                from: number('Min', 0),
                to: number('Max', 100),
            }}
            angles={{
                from: number('Start angle', 180,{range: true, min: 0, max: 360, step: 1}),
                to: number('End angle', 0, {range: true, min: 0, max: 360, step: 1}),
            }}
            initialValue={number('Value', 50)}
            handle={{
                inner: {
                    color: color('Handle inner color', 'red'),
                    radius: number('Handle inner radius', 13),
                }, outer: {
                    color: color('Handle outer color', 'white'),
                    radius: number('Handle outer radius', 20),
                },
            }}
            onChangeComplete={action('changed')}
        />
    );
});

stories.add('With angle explanation', () => {
    return (
        <div>
            <Polar/>
            <RoundSlider
                activeStrokeColor={'red'}
                inactiveStrokeColor={'grey'}
                strokeWidth={20}
                radius={100}
                values={{ from: 0, to: 100 }}
                angles={{
                    from: number('Start angle', 180),
                    to: number('End angle', 0),
                }}
                initialValue={number('Value', 50, {range: true, min: 0, max: 100, step: 1})}
                handle={{
                    inner: {
                        color: 'red',
                        radius: 13,
                    }, outer: {
                        color: 'white',
                        radius: 20,
                    },
                }}
                onChangeComplete={action('changed')}
            />
        </div>
    );
});
