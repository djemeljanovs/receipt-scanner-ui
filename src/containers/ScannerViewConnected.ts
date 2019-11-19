import { connect } from 'react-redux';
import { State } from '../reducers';
import { Action, Dispatch } from 'redux';
import {ScannerView} from "../views/ScannerView";
import {getReceiptContour, getReceiptImage} from "../selectors/receipt";

const mapStateToProps = (state: State) => ({
    contour: getReceiptContour(state),
    imageBase64: getReceiptImage(state),
});

const mapDispatchToProps = (_dispatch: Dispatch<Action>) => ({

});

export const ScannerViewConnected = connect(mapStateToProps, mapDispatchToProps)(ScannerView);
