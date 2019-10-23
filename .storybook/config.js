import { configure, setAddon, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import JSXAddon from 'storybook-addon-jsx';
import {withStyle} from "./withStyle";

addDecorator(withKnobs);
addDecorator(withStyle);
setAddon(JSXAddon);

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.tsx$/);
function loadStories() {
    req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
