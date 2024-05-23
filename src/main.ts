import p5 from "p5";
import { roughShape } from "./shapeUtility"
import * as shps from "./shapes"
import { Transform, transform } from "./transform.ts";

let shapes: shps.Shape[] = []
let ids: string[] = []

const sketch = (p: p5) => {  
  p.setup = () => {
    p.createCanvas(800, 800)
    
    p.noFill()

    for (let i = 0; i < 10; i++) {
      const newShape = rndShape(p)
  
      shapes.push(newShape.inst)
      ids.push(newShape.id)
    }


    p.frameRate(15)
}

p.draw = () => {
    p.clear()

    shps.updateShapes(shapes)
    shps.drawShapes(p, shapes)

    if (p.frameCount % 10 == 0) {
      const dlt = ids[Math.floor(Math.random() * ids.length)]
      shapes = shapes.filter(shp => shp.id != dlt)
      ids = ids.filter(id => id != dlt)
      
      const newShape = rndShape(p)
      shapes.push(newShape.inst)
      ids.push(newShape.id)
    }
  }
}

const rndShape = (p: p5) =>{
  return shps.createShape(
    Transform.PosOnly(new p5.Vector(p.width / 2 + p.random(-400, 400), p.height / 2 + p.random(-400, 400))),
    p.floor(p.random(3, 8)),
    p.random(10, 200),
    5,
    p.floor(p.random(3, 60)),
    ((shape) => {
      const current = shape.GetTransBuffer()
      current.pos.y = shape.GetInitialTransform().pos.y + (Math.sin(p.frameCount / 10) * 10)
      current.rot += p.radians(2)
      shape.SetTransBuffer(current)
    })
  )
}

new p5(sketch)
