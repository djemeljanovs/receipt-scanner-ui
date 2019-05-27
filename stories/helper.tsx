import * as React from 'react';
import { RenderFunction, StoryDecorator } from '@storybook/react';
import { Provider as RenditionProvider} from 'rendition';

export const withRendition: StoryDecorator = (story: RenderFunction) => <RenditionProvider>{story()}</RenditionProvider>;