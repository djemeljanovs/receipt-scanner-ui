import * as React from 'react';
import styled from 'styled-components';
import {ScannerViewConnected} from './containers/ScannerViewConnected';
import {createGlobalStyle} from "./GlobalStyle";

const Wrapper = styled.div`
  text-align: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height:100%;
`;

export const App: React.SFC<{}> = () => {
    createGlobalStyle();
    return (
            <Wrapper>
                <ScannerViewConnected />
            </Wrapper>
    );
};

export default App;
