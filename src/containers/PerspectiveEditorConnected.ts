import { connect } from 'react-redux';
import { State } from '../reducers';
import {getReceiptContour, getReceiptImage} from "../selectors/receipt";
import {PerspectiveEditor} from "../components/PerspectiveEditor";

const mapStateToProps = (state: State) => ({
    contour: getReceiptContour(state),
    imageBase64: getReceiptImage(state),
});

export const PerspectiveEditorConnected = connect(mapStateToProps)(PerspectiveEditor);
