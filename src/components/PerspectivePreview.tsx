import * as React from 'react';
import styled from 'styled-components';

interface IPerspectivePreviewProps {
    imageBase64?: string;
}

const Wrapper = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: #343434;

  display: flex;
  flex-direction: column;
`;

export class PerspectivePreview extends React.Component<IPerspectivePreviewProps> {

    private canvasElement: HTMLCanvasElement | null = null;

    public componentWillReceiveProps({imageBase64}: Readonly<IPerspectivePreviewProps>): void {
        this.draw(imageBase64);
    }

    public componentDidMount(): void {
        const {imageBase64} = this.props;
        this.draw(imageBase64);
    }

    private draw(base64Data?: string) {
        if (base64Data && this.canvasElement) {
            const img = new Image();
            const canvas = this.canvasElement;
            const ctx = canvas.getContext('2d');
            img.onload = function () {
                const world = {
                    width: canvas.offsetWidth,
                    height: canvas.offsetHeight,
                };
                canvas.width = world.width;
                canvas.height = world.height;

                if (typeof img === "undefined")
                    return;

                const WidthDif = img.width - world.width;
                const HeightDif = img.height - world.height;

                let Scale = 0.0;
                if (WidthDif > HeightDif) {
                    Scale = world.width / img.width;
                } else {
                    Scale = world.height / img.height;
                }
                if (Scale > 1)
                    Scale = 1;

                const UseWidth = Math.floor(img.width * Scale);
                const UseHeight = Math.floor(img.height * Scale);

                const dx = Math.floor((world.width - UseWidth) / 2);
                const dy = Math.floor((world.height - UseHeight) / 2);


                if (ctx) {
                    ctx.drawImage(img, dx, dy, UseWidth, UseHeight);
                }
            };
            img.src = base64Data;
        }
    }

    public render() {
        return (
            <Wrapper>
                <canvas ref={canvas => this.canvasElement = canvas}/>
            </Wrapper>
        );
    }
}
