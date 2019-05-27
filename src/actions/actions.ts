import { createAction } from "./actionHelpers";
import { ActionsUnion } from '../types';
import Contour from "../models/Contour";

export enum ActionTypes {
    GET_RECEIPT_CONTOUR = 'GET_RECEPT_CONTOUR',
    SET_RECEIPT_CONTOUR = 'SET_RECEPT_CONTOUR',
    SET_RECEIPT_IMAGE = 'SET_RECEIPT_IMAGE',
}

export const Actions = {
    createGetReceiptContourAction: (imageBase64: string) => createAction(ActionTypes.GET_RECEIPT_CONTOUR, imageBase64),
    createSetReceiptContourAction: (contour: Contour) => createAction(ActionTypes.SET_RECEIPT_CONTOUR, contour),
    createSetReceiptImageAction: (imageBase64: string) => createAction(ActionTypes.SET_RECEIPT_IMAGE, imageBase64),

};

export type Actions = ActionsUnion<typeof Actions>
