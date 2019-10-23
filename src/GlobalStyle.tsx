import {injectGlobal} from "styled-components";


export function createGlobalStyle() {
    injectGlobal`
        @font-face {
          font-family: DinProRegular;
          src: url('/public/fonts/DINPro-Regular.otf') format('opentype');
        }
        
        html {
          font-size: 24px;
          width:100%;
          height:100%;
          background: #343434;
          color: #FFFFFF;
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
        
        
        #root {
          width: 100%;
          height:100%;
        }
    `;
}
