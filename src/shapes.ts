import p5 from "p5"
import { drawLinesFromVtx, generatePoints } from "./shapeUtility"
import { Transform, transform } from "./transform"

export class Shape {
    public id: string
    private fRate: number
    private transform: transform
    private transBuffer: transform
    private transStep: transform | ((inst: Shape) => void)
    private initialTrans: transform
    private vtxs: p5.Vector[]
    private roughness: number

    constructor(id: string, transform: transform, transStep: transform | ((inst: Shape) => void), vtxs: number, rad: number, roughness: number, fRate: number){
        this.id = id
        this.fRate = fRate
        this.transform = transform
        this.transBuffer = this.transform
        this.initialTrans = this.transform
        this.transStep = transStep
        this.roughness = roughness
        this.vtxs = generatePoints(vtxs, rad)

        return this
    }

    public GetTransBuffer(){
        return this.transBuffer
    }

    public SetTransBuffer(value: transform){
        this.transBuffer = value
    }

    public GetInitialTransform(){
        return this.initialTrans
    }

    public Update(){
        if(typeof(this.transStep) == "object"){
            Transform.AddStep(this.transStep, this.transBuffer)
        }else{
            this.transStep(this)
        }
    }

    public Draw(p: p5){
        if (this.fRate != -1 && p.frameCount % this.fRate == 0) {
            this.transform = this.transBuffer
        }

        p.push()
            p.translate(this.transform.pos)
            p.rotate(this.transform.rot)
            p.scale(this.transBuffer.scl)
            drawLinesFromVtx(p, this.vtxs, this.roughness)
        p.pop()
    }
}

export type shapeData = {
    id: string
    inst: Shape
}

export const createShape = (pos: transform, vtxs: number, rad: number, roughness: number, fRate = -1, step?: transform | ((inst: Shape) => void)): shapeData => {
    const id = crypto.randomUUID()

    const stp = step ? step : Transform.Steady()
    const data = new Shape(id, pos, stp, vtxs, rad, roughness, fRate)

    return {
        id: id,
        inst: data
    }
}

export const updateShapes = (shapeAry: Shape[]) => {
    shapeAry.forEach(shp => shp.Update())
}

export const drawShapes = (p: p5, shapeAry: Shape[]) => {
    shapeAry.forEach(shp => {
        shp.Draw(p)
    })
}