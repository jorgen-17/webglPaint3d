import { WebGLRenderer3d, RGBColor, ShapeMode } from "webgl-renderer";

export interface IMouseHandler
{
    mouseDownHandler: (event: MouseEvent, canvas: HTMLCanvasElement,
        renderer: WebGLRenderer3d, shapeMode: ShapeMode, color: RGBColor) => void;
    mouseMoveHandler: (mouseIsDown: boolean, event: MouseEvent,
        canvas: HTMLCanvasElement, renderer: WebGLRenderer3d, shape: ShapeMode,
        color: RGBColor) => void;
    mouseUpHandler: (event: MouseEvent, canvas: HTMLCanvasElement,
        renderer: WebGLRenderer3d, shape: ShapeMode, color: RGBColor) => void;
}
