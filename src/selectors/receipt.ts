import { createSelector } from 'reselect';
import { State } from '../reducers';

const getReceiptState = ((state: State) => state.receipt);

export const getReceiptContour = createSelector([getReceiptState], s => s.contour);
export const getReceiptImage = createSelector([getReceiptState], s => s.imageBase64);
