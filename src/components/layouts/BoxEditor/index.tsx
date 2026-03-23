import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage, Rect, Transformer } from "react-konva";
import type {Box, boxEditorProps} from "./types";
import type Konva from "konva";
import { readBufFile } from "@/utils/ServerFileSystem";

export default function BoxEditor({ image_actual, box, arrayBoxes}: boxEditorProps) {
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [newBox, setNewBox] = box;
    const [boxes, setBoxes] = arrayBoxes;
    const [isDrawing, setIsDrawing] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const stageRef = useRef<any>('');
    const rectRefs = useRef<(Konva.Rect | null)[]>([]);
    const transformerRef = useRef<Konva.Transformer | null>(null);

    useEffect(() => {
        async function loadImage() {
            let url: string = await readBufFile(image_actual);
            const img = new window.Image();
            img.src = url;
            img.onload = () => setImage(img);
        }
        loadImage();
        setBoxes([]);
    }, [image_actual]);



    useEffect(() => {
        if (selectedIndex !== null && transformerRef.current && rectRefs.current[selectedIndex]) {
            transformerRef.current.nodes([rectRefs.current[selectedIndex]!]);
            transformerRef.current.getLayer()?.batchDraw();
        } else if (transformerRef.current) {
            transformerRef.current.nodes([]);
            transformerRef.current.getLayer()?.batchDraw();
        }
    }, [selectedIndex, boxes]);

    useEffect(() => {
        console.log(boxes)
    }, [boxes]);

    const isClickOnEmptyArea = (target: any) => {
        const className = target.getClassName();
        return className === "Stage" || className === "Layer" || className === "Image";
    };

    const handleMouseDown = (e: any) => {
        if (!isClickOnEmptyArea(e.target)) return;

        const pos = e.target.getStage().getPointerPosition();
        if (!pos) return;

        setIsDrawing(true);
        setNewBox({ x_min: pos.x, y_min: pos.y, x_max: pos.x, y_max: pos.y, width: 0, height: 0 });
        setSelectedIndex(null);
    };

    const handleMouseMove = (e: any) => {
        if (!isDrawing || !newBox) return;
        const pos = e.target.getStage().getPointerPosition();
        if (!pos) return;

        const x_max = pos.x;
        const y_max = pos.y;
        const width = pos.x - newBox.x_min;
        const height = pos.y - newBox.y_min;

        setNewBox({
            ...newBox,
            x_max,
            y_max,
            width,
            height,
        });
    };

    const handleMouseUp = () => {
        if (isDrawing && newBox && Math.abs(newBox.width) > 5 && Math.abs(newBox.height) > 5) {
            // const normalizedBox = {
            //     x: newBox.width < 0 ? Math.abs(newBox.x_min + newBox.width) : Math.abs(newBox.x_min),
            //     y: newBox.height < 0 ? Math.abs(newBox.y_min + newBox.height) : Math.abs(newBox.y_min),
            //     width: Math.abs(newBox.width),
            //     height: Math.abs(newBox.height),
            // };
            const box : Box = {
                x_min: Math.min(newBox.x_max, newBox.x_min),
                x_max: Math.max(newBox.x_max, newBox.x_min),
                y_min: Math.min(newBox.y_max, newBox.y_min),
                y_max: Math.max(newBox.y_max, newBox.y_min),
                width: Math.abs(newBox.width),
                height: Math.abs(newBox.height)
            }

            console.log(box)

            setBoxes([...boxes, box]);
        }
        setIsDrawing(false);
        setNewBox(null);
    };

    return (
        <div>
            <Stage
                width={image?.width || 800}
                height={image?.height || 600}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                ref={stageRef}
                style={{ border: "1px solid #ccc" }}
            >
                <Layer>
                    {image && <KonvaImage image={image} />}
                    {boxes.map((box, i) => (
                        <Rect
                            key={i}
                            ref={el => {
                                rectRefs.current[i] = el;
                            }}
                            x={box.x_min}
                            y={box.y_min}
                            width={box.width}
                            height={box.height}
                            stroke={selectedIndex === i ? "blue" : "red"}
                            strokeWidth={2}
                            draggable
                            onClick={(e) => {
                                e.cancelBubble = true;
                                setSelectedIndex(i);
                            }}
                            onTap={(e) => {
                                e.cancelBubble = true;
                                setSelectedIndex(i);
                            }}
                            onDragEnd={(e) => {
                                const updatedBoxes = [...boxes];
                                updatedBoxes[i] = {
                                    ...updatedBoxes[i],
                                    x_min: e.target.x(),
                                    y_min: e.target.y(),
                                };
                                setBoxes(updatedBoxes);
                            }}
                            onTransformEnd={(e) => {
                                const node = e.target;
                                const scaleX = node.scaleX();
                                const scaleY = node.scaleY();

                                node.scaleX(1);
                                node.scaleY(1);

                                const updatedBoxes = [...boxes];
                                updatedBoxes[i] = {
                                    x_min: Math.floor(node.x()),
                                    y_min: Math.floor(node.y()),
                                    x_max: Math.floor(node.x() + Math.max(5, node.width() * scaleX)),
                                    y_max: Math.floor(node.x() + Math.max(5, node.height() * scaleY)),
                                    width: Math.floor(Math.max(5, node.width() * scaleX)),
                                    height: Math.floor(Math.max(5, node.height() * scaleY)),
                                };
                                setBoxes(updatedBoxes);
                            }}
                        />
                    ))}
                    {selectedIndex !== null && <Transformer ref={transformerRef} />}
                    {newBox && (
                        <Rect
                            x={newBox.x_min}
                            y={newBox.y_min}
                            width={newBox.width}
                            height={newBox.height}
                            stroke="green"
                            dash={[4, 4]}
                        />
                    )}
                </Layer>
            </Stage>
        </div>
    );
};