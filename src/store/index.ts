import 'promise/polyfill';
import { Store, compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { State, reducer } from '../reducers';
import apiSaga from '../sagas/apiSaga';

const composeEnhancers = window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore(initialState: State): Store<State> {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(
            sagaMiddleware,
        )));
    sagaMiddleware.run(apiSaga);
    return store;
}
