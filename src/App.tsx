import * as React from 'react';
import styled, { injectGlobal } from 'styled-components';
import {ScannerViewConnected} from './containers/ScannerViewConnected';

injectGlobal`
    @font-face {
      font-family: DinProRegular;
      src: url('/public/fonts/DINPro-Regular.otf') format('opentype');
    }
    
    html {
      font-size: 24px;
      width:100%;
      height:100%;
    }
    
    body {
      font-family: 'DinProRegular', sans-serif;
      padding: 0;
      margin: 0;
      width:100%;
      height:100%;
    }
    
    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
    
    input {
      display: none;
    }
`;

const Wrapper = styled.div`
  text-align: center;
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const App: React.SFC<{}> = () => {
    return (
            <Wrapper>
                <ScannerViewConnected />
            </Wrapper>
    );
};

export default App;
