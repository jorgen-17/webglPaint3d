import * as React from "react";
import * as ReactDOM from "react-dom";
import { WebGLRenderer, RenderingOptions, Color, ColorMapper, RGBColor } from "webgl-renderer";

import { CanvasMouseHandler } from "./input/canvasMouseHandler";
import { RenderModeMouseHandler } from "./input/renderModeMouseHandlers";
import { BasicShapeModeMouseHandler } from "./input/basicShapeModeMouseHandler";
import { LineMouseHandler } from "./input/lineMouseHandler";
import { Menu } from "./ui/reactComponents/menu";
import { Dispatcher } from "./simpledux";
import * as Events from "./events";

class App extends React.Component<{}, {}>
{
    private canvas:  HTMLCanvasElement;
    private gl: WebGLRenderingContext;
    private renderer: WebGLRenderer;
    private canvasMouseHandler: CanvasMouseHandler;
    private currentColor: Color;

    constructor()
    {
        super();

        const renderModeMouseHandler = new RenderModeMouseHandler();
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

        Dispatcher.addCallback("drawingLines", (colorPayload: Events.DrawingLinesEvent) => {
            this.canvasMouseHandler.currentShapeMode = "lines";
            this.canvasMouseHandler.mouseHandler = lineMouseHandler;
        });

        Dispatcher.addCallback("renderModeChanged", (renderModePayload: Events.RenderModeChangeEvent) => {
            this.renderer.renderMode = renderModePayload.newRenderMode;
            this.canvasMouseHandler.mouseHandler = renderModeMouseHandler;
        });

        this.canvas = document.getElementById("mycanvas") as HTMLCanvasElement;

        const backgroundColor: RGBColor = new RGBColor(0.1, 0.1, 0.1);
        let renderingOptions: RenderingOptions =
        {
            backgroundColor: backgroundColor,
            fullscreen: true
        };
        this.renderer = new WebGLRenderer(this.canvas, renderingOptions);

        this.currentColor = "white";
        const defaultShapeMode = "points";

        this.canvasMouseHandler = new CanvasMouseHandler(this.canvas, this.renderer,
            renderModeMouseHandler, defaultShapeMode, ColorMapper.colorToRGBColor(this.currentColor));

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