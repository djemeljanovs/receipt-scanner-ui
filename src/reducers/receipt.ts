import { Actions, ActionTypes } from '../actions/actions';
import Contour from "../models/Contour";


export interface State {
    contour?: Contour;
    imageBase64?: string;
}

export const initialState: State = {};

export function reducer(state: State = initialState, action: Actions) {
    switch (action.type) {
        case ActionTypes.SET_RECEIPT_CONTOUR:
        {
            return { ...state, contour: action.payload };
        }
        case ActionTypes.SET_RECEIPT_IMAGE:
        {
            return { ...state, imageBase64: action.payload };
        }
        default:
            return state;
    }
}
