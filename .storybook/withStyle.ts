import {RenderFunction} from "@storybook/react";
import {createGlobalStyle} from "../src/GlobalStyle";

export const withStyle = (story: RenderFunction) => {
    createGlobalStyle();
    return story();
};
