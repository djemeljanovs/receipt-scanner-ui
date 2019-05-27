import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import { configureStore } from './store';
import { Provider } from 'react-redux';
import { initialState } from './reducers';

import { library } from '@fortawesome/fontawesome-svg-core'

// Important! Use direct import to include only used icons into the bundle
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons/faLightbulb';
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun';

library.add(faCaretDown, faChevronLeft, faHome, faLightbulb, faSun);

const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root') as HTMLElement,
);
