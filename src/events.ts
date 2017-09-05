import { IPayload } from "simple-dux/dispatcher";
import { Color } from "webgl-renderer";
import { Shape3dMode } from "webgl-renderer";
import { RenderMode } from "webgl-renderer";
export class ColorChangeEvent implements IPayload
{
    public event_type = "colorChanged";
    public newColor: Color;

    constructor(newColor: Color)
    {
        this.newColor = newColor;
    }
}

export class ShapeChangeEvent implements IPayload
{
    public event_type = "shapeChanged";
    public newShape: Shape3dMode;

    constructor(newShape: Shape3dMode)
    {
        this.newShape = newShape;
    }
}