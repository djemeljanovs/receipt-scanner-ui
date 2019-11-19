import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import {Actions} from "../actions/actions";
import {SelectImageButton} from "../components/SelectImageButton";

const mapStateToProps = () => ({
    loading: false,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onSelectImage: (imageBase64: string) => {
        dispatch(Actions.createSetReceiptImageAction({imageBase64}));
        dispatch(Actions.createGetReceiptContourAction({imageBase64}));
    },
});

export const SelectImageButtonConnected = connect(mapStateToProps, mapDispatchToProps)(SelectImageButton);
