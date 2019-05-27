import * as receipt from './receipt';
import { combineReducers } from 'redux';

export interface State {
    receipt: receipt.State;
}

export const initialState = {
    receipt: receipt.initialState,
};

export const reducer = combineReducers<State>({
    receipt: receipt.reducer,
});
