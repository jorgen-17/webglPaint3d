import * as React from "react";
import * as ReactDOM from "react-dom";
import { WebGLRenderer3d, RenderingOptions, Color, ColorMapper, RGBColor, ShapeMode } from "webgl-renderer";

import { CanvasMouseHandler } from "./input/canvasMouseHandler";
import { BasicShapeModeMouseHandler } from "./input/basicShapeModeMouseHandler";
import { LineMouseHandler } from "./input/lineMouseHandler";
import { Menu } from "./ui/reactComponents/menu";
import { Dispatcher } from "./simpledux";
import * as Events from "./events";

class App extends React.Component<{}, {}>
{
    private canvas:  HTMLCanvasElement;
    private gl: WebGLRenderingContext;
    private renderer: WebGLRenderer3d;
    private canvasMouseHandler: CanvasMouseHandler;
    private currentColor: Color;

    constructor()
    {
        super();

        const basicShapeModeMouseHandler = new BasicShapeModeMouseHandler();
        const lineMouseHandler = new LineMouseHandler();

        Dispatcher.addCallback("colorChanged", (colorPayload: Events.ColorChangeEvent) => {
            this.currentColor = colorPayload.newColor;
            this.canvasMouseHandler.currentColor = ColorMapper.colorToRGBColor(colorPayload.newColor);
            this.setState({});
        });

        Dispatcher.addCallback("shapeChanged", (shapePayload: Events.ShapeChangeEvent) => {
            this.canvasMouseHandler.currentShapeMode = shapePayload.newShape;
            this.canvasMouseHandler.mouseHandler = basicShapeModeMouseHandler;
        });

        this.canvas = document.getElementById("mycanvas") as HTMLCanvasElement;

        const backgroundColor: RGBColor = new RGBColor(0.1, 0.1, 0.1);
        let renderingOptions: RenderingOptions =
        {
            backgroundColor: backgroundColor,
            fullscreen: true
        };
        this.renderer = new WebGLRenderer3d(this.canvas, renderingOptions);

        this.currentColor = Color.white;
        const defaultShapeMode = ShapeMode.box;

        this.canvasMouseHandler = new CanvasMouseHandler(this.canvas, this.renderer,
            basicShapeModeMouseHandler, defaultShapeMode, ColorMapper.colorToRGBColor(this.currentColor));

        this.canvas.addEventListener("mousedown", (event: MouseEvent) => { this.canvasMouseHandler.mouseDown(event); } , false);
        this.canvas.addEventListener("mousemove", (event: MouseEvent) => { this.canvasMouseHandler.mouseMove(event); }, false);
        this.canvas.addEventListener("mouseup", (event: MouseEvent) => { this.canvasMouseHandler.mouseUp(event); }, false);

        this.renderer.start();
    }

    public render()
    {
        return (
            <Menu currentColor={this.currentColor}/>
        );
    }
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<App/>, document.getElementById("main"));
}, false);
