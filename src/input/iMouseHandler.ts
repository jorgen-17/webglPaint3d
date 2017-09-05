import { WebGLRenderer, RGBColor, Shape3dMode } from "webgl-renderer";

export interface IMouseHandler
{
    mouseDownHandler: (event: MouseEvent, canvas: HTMLCanvasElement,
        renderer: WebGLRenderer, shapeMode: Shape3dMode, color: RGBColor) => void;
    mouseMoveHandler: (mouseIsDown: boolean, event: MouseEvent,
        canvas: HTMLCanvasElement, renderer: WebGLRenderer, shape: Shape3dMode,
        color: RGBColor) => void;
    mouseUpHandler: (event: MouseEvent, canvas: HTMLCanvasElement,
        renderer: WebGLRenderer, shape: Shape3dMode, color: RGBColor) => void;
}