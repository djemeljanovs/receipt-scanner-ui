import * as React from 'react';
import styled from 'styled-components';
import Contour from "../models/Contour";
import Point from "../models/Point";

interface IPerspectiveEditorProps {
    contour?: Contour;
    imageBase64?: string;
}

interface IPerspectiveEditorState{
    contour?: Contour;
    draggedPointIndex?: number;
}

const Wrapper = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: #343434;

  display: flex;
  flex-direction: column;
`;

export class PerspectiveEditor extends React.Component<IPerspectiveEditorProps, IPerspectiveEditorState> {

    private canvasElement: HTMLCanvasElement | null = null;

    public constructor(props: IPerspectiveEditorProps) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.state = {
            contour: props.contour,
        };
    }

    public componentWillReceiveProps({contour}: Readonly<IPerspectiveEditorProps>): void {
        this.setState({contour});
        this.redraw();
    }

    public componentDidMount(): void {
        this.redraw();
        if (this.canvasElement) {
            this.canvasElement.addEventListener("mousedown", this.onMouseDown, false);
            this.canvasElement.addEventListener("mouseup", this.onMouseUp, false);
        }
    }

    private onMouseDown(event: MouseEvent): void {
        const {contour} = this.state;
        if (contour && this.canvasElement) {
            const {layerX, layerY} = event;
            const distances = contour.points.map(({x, y}) => Math.sqrt(Math.pow(layerX - x, 2) * Math.pow(layerY - y, 2)));
            const minimumDistance = distances.reduce((minimum: number, distance: number) => {
                return Math.min(minimum, distance);
            }, Number.MAX_VALUE);
            this.setState({draggedPointIndex: distances.indexOf(minimumDistance)});
            this.canvasElement.addEventListener("mousemove", this.onMouseMove, false);
        }
    }

    private onMouseUp(): void {
        if (this.canvasElement) {
            this.canvasElement.removeEventListener("mousemove", this.onMouseMove, false);
        }
    }

    private onMouseMove(event: MouseEvent): void {
        console.log(event);
        const {layerX, layerY} = event;
        const canvas = this.canvasElement;
        const {contour, draggedPointIndex} = this.state;
        if (contour && canvas) {
            const newPoint = {x: Math.min(layerX, canvas.width), y: Math.min(layerY, canvas.height)};
            const updatedContour = {
                points: contour.points.map((point: Point, index: number) => index === draggedPointIndex ? newPoint : point),
            };
            this.setState({contour: updatedContour});
            this.redraw();
        }
    }

    private redraw(): void {
        this.draw(this.state.contour, this.props.imageBase64);
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

                Scale = 1;
                const UseWidth = Math.floor(img.width * Scale);
                const UseHeight = Math.floor(img.height * Scale);

                const dx = 0; // Math.floor((world.width - UseWidth) / 2);
                const dy = 0; // Math.floor((world.height - UseHeight) / 2);


                if (ctx) {
                    ctx.drawImage(img, dx, dy, UseWidth, UseHeight);

                    ctx.lineWidth = 3;
                    ctx.lineJoin = "bevel";
                    ctx.fillStyle = "#FF0000";
                    ctx.strokeStyle = "#00FF00";

                    const points = contour.points.map((point: Point) => {
                        return {
                            x: dx + point.x * Scale,
                            y: dy + point.y * Scale,
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
                        ctx.rect(x - 5, y - 5, 10, 10);
                        ctx.fill();
                    });
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
