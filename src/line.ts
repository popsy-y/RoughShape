import p5 from "p5";

export const roughLine = (p: p5, as: p5.Vector, ae: p5.Vector, r: number):void => {
    const v = p5.Vector

    const line = v.sub(ae, as)

    // control points
    const csRatio = p.random(.2, .4)
    // v.multがvoidになっている(Vectorを返して欲しい)
    const cs = v.add(as, line.copy().mult(csRatio))//       ctrl - start
    const ce = v.add(as, line.copy().mult(csRatio * 2))//   ctrl - end
    
    // randomize
    const ras = v.add(as, new v(p.random(-r, r), p.random(-r, r)))
    const rae = v.add(ae, new v(p.random(-r, r), p.random(-r, r)))
    const rcs = v.add(cs, new v(p.random(-r, r), p.random(-r, r)))
    const rce = v.add(ce, new v(p.random(-r, r), p.random(-r, r)))
    
    p.bezier(ras.x, ras.y, rcs.x, rcs.y, rce.x, rce.y, rae.x, rae.y)
}