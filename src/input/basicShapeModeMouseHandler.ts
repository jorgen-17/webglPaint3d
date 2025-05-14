import { Vec3, Shape, ShapeMode, WebGLRenderer3d, MouseHelper, ShapeFactory3d, RGBColor } from "webgl-renderer";
import { IMouseHandler } from "./iMouseHandler";

export class BasicShapeModeMouseHandler implements IMouseHandler
{
    private beginningPoint: Vec3 | null;
    private endPoint: Vec3 | null;

    public mouseDownHandler(event: MouseEvent, canvas: HTMLCanvasElement,
        renderer: WebGLRenderer3d, shape: ShapeMode, color: RGBColor): void
    {
        let point = MouseHelper.mouseEventToWebGlPoints(event, canvas);
        this.beginningPoint = new Vec3(point.x, point.y);
    }

    public mouseMoveHandler(mouseIsDown: boolean, event: MouseEvent,
        canvas: HTMLCanvasElement, renderer: WebGLRenderer3d, shape: ShapeMode,
        color: RGBColor): void { /* do nothing */ }

    public mouseUpHandler(event: MouseEvent, canvas: HTMLCanvasElement,
        renderer: WebGLRenderer3d, shapeMode: ShapeMode, color: RGBColor): void
    {
        if (this.beginningPoint !== null)
        {
            let point = MouseHelper.mouseEventToWebGlPoints(event, canvas);
            this.endPoint = new Vec3(point.x, point.y);
            let shape: Shape = renderer.shapeFactory.createShape(this.beginningPoint, this.endPoint,
                shapeMode, renderer.gl, color);
            renderer.addShapeToScene(shape);
            this.beginningPoint = null;
        }
    }
}
