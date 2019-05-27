import { connect } from 'react-redux';
import { State } from '../reducers';
import { Action, Dispatch } from 'redux';
import {ScannerView} from "../views/ScannerView";
import {getReceiptContour, getReceiptImage} from "../selectors/receipt";
import {Actions} from "../actions/actions";

const mapStateToProps = (state: State) => ({
    contour: getReceiptContour(state),
    imageBase64: getReceiptImage(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onSelectImage: (imageBase64: string) => {
        dispatch(Actions.createSetReceiptImageAction(imageBase64));
        dispatch(Actions.createGetReceiptContourAction(imageBase64));
    },
});

export const ScannerViewConnected = connect(mapStateToProps, mapDispatchToProps)(ScannerView);
