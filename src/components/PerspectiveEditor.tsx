import * as React from 'react';
import styled from 'styled-components';
import Contour from "../models/Contour";
import Point from "../models/Point";

interface IPerspectiveEditorProps {
    contour?: Contour;
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

export class PerspectiveEditor extends React.Component<IPerspectiveEditorProps> {

    private canvasElement: HTMLCanvasElement | null = null;

    public componentWillReceiveProps({contour, imageBase64}: Readonly<IPerspectiveEditorProps>): void {
        this.draw(contour, imageBase64);
    }

    public componentDidMount(): void {
        const {contour, imageBase64} = this.props;
        this.draw(contour, imageBase64);
    }

    private draw(contour?: Contour, base64Data?: string) {
        if (contour && base64Data && this.canvasElement) {
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

                    ctx.lineWidth = 10;
                    ctx.strokeStyle = "#00FF00";
                    ctx.fillStyle = "#00AA00";
                    const points = contour.points.map((point: Point) => {
                        return {
                            x: dx + point.x,
                            y: dy + point.y,
                        };
                    });
                    points.forEach(function ({x, y}, i) {
                        if (i > 0) {
                            console.log(`lineTo ${x}, ${y}`);
                            ctx.lineTo(x, y);
                        } else {
                            console.log(`moveTo ${x}, ${y}`);
                            ctx.beginPath();
                            ctx.moveTo(x, y);
                        }

                    });
                    ctx.closePath();
                    ctx.stroke();
                    points.forEach(function ({x, y}) {
                        ctx.beginPath();
                        ctx.arc(x, y, 20, 0, Math.PI * 2);
                        ctx.fill();
                    });
                    canvas.addEventListener("mousedown", function (event) {
                        console.log(event);
                        ctx.beginPath();
                        ctx.arc(event.layerX, event.layerY, 20, 0, Math.PI * 2);
                        ctx.fill();
                    }, false);
                }
            };
            img.src = base64Data;
        }
    }

    public render() {
        return (
            <Wrapper>
                <canvas ref={canvas => this.canvasElement = canvas} />
            </Wrapper>
        );
    }
}
