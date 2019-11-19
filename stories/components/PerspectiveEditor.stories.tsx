import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {PerspectiveEditor} from "../../src/components/PerspectiveEditor";
import {object} from "@storybook/addon-knobs";

const contour = {
    "points": [
        {
            "x": 100,
            "y": 100
        },
        {
            "x": 100,
            "y": 300
        },
        {
            "x": 300,
            "y": 300
        },
        {
            "x": 300,
            "y": 100
        }
    ]
};


storiesOf('PerspectiveEditor', module)
    .add('Default', () => {
        return (
            <PerspectiveEditor
                contour={object("Contour", contour)}
            />
        );
    });
