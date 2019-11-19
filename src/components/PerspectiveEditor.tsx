import * as React from 'react';
import styled from 'styled-components';
import {
    Point,
    Contour,
} from "../models/Geometry";
import {TouchEvent} from 'react';
import {getContourIntersectionPoint} from "../utils/ContourUtils";

interface IPerspectiveEditorProps {
    contour?: Contour;
}

interface IPerspectiveEditorState{
    contour?: Contour;
    draggedPointIndex?: number;
    draggedPointPosition?: Point;
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
        this.setState({contour}, this.redraw);
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
            this.setDraggedPoint(layerX, layerY);
            this.canvasElement.addEventListener("mousemove", this.onMouseMove, false);
        }
    }

    private onMouseUp(): void {
        if (this.canvasElement) {
            this.canvasElement.removeEventListener("mousemove", this.onMouseMove, false);
        }
    }

    private onMouseMove(event: MouseEvent): void {
        const {layerX, layerY} = event;
        this.updateContour(layerX, layerY);
    }

    private onTouchStart(event: TouchEvent<HTMLCanvasElement>): void {
        const x = event.targetTouches[0].pageX;
        const y = event.targetTouches[0].pageY;
        this.setDraggedPoint(x, y);
    }

    private onTouchMove(event: TouchEvent<HTMLCanvasElement>): void {
        const x = event.targetTouches[0].pageX;
        const y = event.targetTouches[0].pageY;
        this.updateContour(x, y);
    }

    private setDraggedPoint(activityX: number, activityY: number): void {
        const {contour} = this.state;
        if (contour) {
            const distances = contour.points.map(({x, y}) => Math.sqrt(Math.pow(activityX - x, 2) * Math.pow(activityY - y, 2)));
            const minimumDistance = distances.reduce((minimum: number, distance: number) => {
                return Math.min(minimum, distance);
            }, Number.MAX_VALUE);
            this.setState({draggedPointIndex: distances.indexOf(minimumDistance)});
        }
    }

    private getUpdatedContour(updatedDraggedPoint: Point): Contour {
        const {contour, draggedPointIndex} = this.state;
        if(contour) {
            return {
                points: contour.points.map((point: Point, index: number) => index === draggedPointIndex ? updatedDraggedPoint : point),
            };
        }
        return { points: [] };
    }

    private ensureCorrectContour(contour: Contour): Contour {
        const intersection = getContourIntersectionPoint(contour);
        if(intersection) {
            return this.getUpdatedContour(intersection);
        }
        return contour;
    }

    private updateContour(activityX: number, activityY: number) {
        const canvas = this.canvasElement;
        if (canvas) {
            const newPoint = {x: Math.min(activityX, canvas.width), y: Math.min(activityY, canvas.height)};
            const updatedContour = this.getUpdatedContour(newPoint);
            this.setState({
                contour: this.ensureCorrectContour(updatedContour),
                draggedPointPosition: {
                    x: activityX,
                    y: activityY,
                },
            });
            this.redraw();
        }
    }

    private redraw(): void {
        this.draw(this.state.contour);
    }

    private draw(contour?: Contour) {
        if(contour) {
            const canvas = this.canvasElement;
            if(canvas) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    const world = {
                        width: canvas.offsetWidth,
                        height: canvas.offsetHeight,
                    };
                    canvas.width = world.width;
                    canvas.height = world.height;
                    ctx.lineWidth = 3;
                    ctx.lineJoin = "bevel";
                    ctx.fillStyle = "#00FF00";
                    ctx.strokeStyle = "#00FF00";

                    contour.points.forEach(function ({x, y}, i) {
                        if (i > 0) {
                            ctx.lineTo(x, y);
                        } else {
                            ctx.beginPath();
                            ctx.moveTo(x, y);
                        }

                    });
                    ctx.closePath();
                    ctx.stroke();
                    contour.points.forEach(function ({x, y}) {
                        ctx.beginPath();
                        ctx.rect(x - 5, y - 5, 10, 10);
                        ctx.fill();
                    });
                }
            }
        }
    }

    public render() {
        return (
            <Wrapper>
                <canvas ref={canvas => this.canvasElement = canvas}
                        onTouchStart={this.onTouchStart}
                        onTouchMove={this.onTouchMove}/>
            </Wrapper>
        );
    }
}
