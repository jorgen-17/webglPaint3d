import { IPayload } from "simple-dux/dispatcher";
import { Color } from "webgl-renderer";
import { ShapeMode } from "webgl-renderer";
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
    public newShape: ShapeMode;

    constructor(newShape: ShapeMode)
    {
        this.newShape = newShape;
    }
}
