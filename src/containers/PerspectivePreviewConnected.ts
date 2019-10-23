import { connect } from 'react-redux';
import { State } from '../reducers';
import {getReceiptContour, getReceiptImage} from "../selectors/receipt";
import {PerspectivePreview} from "../components/PerspectivePreview";

const mapStateToProps = (state: State) => ({
    contour: getReceiptContour(state),
    imageBase64: getReceiptImage(state),
});

export const PerspectivePreviewConnected = connect(mapStateToProps)(PerspectivePreview);
