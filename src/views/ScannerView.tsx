import * as React from 'react';
import styled from 'styled-components';
import Contour from "../models/Contour";
import {Button} from "../components/Button";
import Point from "../models/Point";
import {FormEvent} from "react";

interface IScannerViewProps {
    contour?: Contour;
    imageBase64?: string;
    onSelectImage: (imageBase64: string) => void;
}

const Wrapper = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: #343434;

  display: flex;
  flex-direction: column;
`;

export class ScannerView extends React.Component<IScannerViewProps> {

    private canvasElement: HTMLCanvasElement | null = null;
    private inputElement: HTMLInputElement | null = null;

    public constructor(props: IScannerViewProps) {
        super(props);
        this.onSelectFileClick = this.onSelectFileClick.bind(this);
        this.onFileSelected = this.onFileSelected.bind(this);

    }
    public componentWillReceiveProps({contour, imageBase64}: Readonly<IScannerViewProps>): void {
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
                <input
                    ref={input => this.inputElement = input}
                    onChange={this.onFileSelected}
                    name="receipt"
                    type="file"
                    accept="image/*;capture=camera"
                />
                <Button onClick={this.onSelectFileClick}>IZVĒLIETIES ČEKA ATTĒLU</Button>
                <canvas ref={canvas => this.canvasElement = canvas} />
            </Wrapper>
        );
    }

    private onSelectFileClick() {
        if (this.inputElement) {
            this.inputElement.click();
        }
    }

    private onFileSelected(event: FormEvent<HTMLInputElement>) {
        if (event.currentTarget.files && event.currentTarget.files.length > 0) {
            const image = event.currentTarget.files[0];
            this.getBase64(image).then((base64: string) => {
                this.props.onSelectImage(base64);
            });
        }

    }

    private getBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (reader.result && typeof reader.result === 'string') {
                    resolve(reader.result);
                } else {
                    reject('Wrong file reader result type');
                }
            };
            reader.onerror = (error) => {
                console.log('Error: ', error);
                reject();
            };
        });
    }

}
