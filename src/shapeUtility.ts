import p5 from "p5";
import { roughLine } from "./line";

export const roughShape = (
  p: p5,
  points: p5.Vector[] | number,
  roughness: number,
  radius?: number,
) => {
  if (typeof points == "number") {
    if (radius === undefined) {
        throw new Error("No shape radius given.")
    }
    const ps = generatePoints(points, radius)
    drawLinesFromVtx(p, ps, roughness)
    return
  } else if (typeof points == "object") {
    drawLinesFromVtx(p, points, roughness)
    return
  }
}

export const drawLinesFromVtx = (p: p5, vtxs: p5.Vector[], roughness: number) => {
  vtxs.forEach((elem, i) => {
    roughLine(p, elem, vtxs[(i + 1) % vtxs.length], roughness)
  })
  return
}

export const generatePoints = (n: number, rad: number): p5.Vector[] => {
  const points: p5.Vector[] = [];

  for (let i = 0; i < n; i++) {
    const ang = (Math.PI * 2) / n * i;

    points.push(
      new p5.Vector(Math.cos(ang) * rad, Math.sin(ang) * rad),
    )
  }

  return points
}
