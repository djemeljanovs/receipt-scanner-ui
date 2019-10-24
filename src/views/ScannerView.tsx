import * as React from 'react';
import styled from 'styled-components';
import {PerspectiveEditorConnected} from "../containers/PerspectiveEditorConnected";
import {SelectImageButtonConnected} from "../containers/SelectImageButtonConnected";

const Wrapper = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: #343434;

  display: flex;
  flex-direction: column;
`;

export class ScannerView extends React.Component<{}> {

    public render() {
        return (
            <Wrapper>
                <PerspectiveEditorConnected/>
                <SelectImageButtonConnected/>
            </Wrapper>
        );
    }

}
