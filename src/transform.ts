import p5 from "p5"

export type transform = {
    pos: p5.Vector,
    scl: p5.Vector,
    rot: number
}

export class Transform{
    public data: transform

    constructor(data: transform){
        this.data = data

        return this
    }

    static VZero(): p5.Vector{
        return new p5.Vector(0, 0)
    }

    static VOne(): p5.Vector{
        return new p5.Vector(1, 1)
    }

    static Steady(): transform{
        return {
            pos: Transform.VZero(),
            scl: Transform.VOne(),
            rot: 0
        }
    }

    static PosOnly(pos: p5.Vector): transform{
        return {
            pos: pos,
            scl: Transform.VOne(),
            rot: 0
        }
    }

    static SclOnly(scl: p5.Vector): transform{
        return {
            pos: Transform.VZero(),
            scl: scl,
            rot: 0
        }
    }

    static RotOnly(rot: number): transform{
        return {
            pos: Transform.VZero(),
            scl: Transform.VOne(),
            rot: rot
        }
    }

    static PosScl(pos: p5.Vector, scl: p5.Vector): transform{
        return {
            pos: pos,
            scl: scl,
            rot: 0
        }
    }

    static PosRot(pos: p5.Vector, rot: number): transform{
        return {
            pos: pos,
            scl: Transform.VOne(),
            rot: rot
        }
    }

    static SclRot(scl: p5.Vector, rot: number): transform{
        return {
            pos: Transform.VZero(),
            scl: scl,
            rot: rot
        }
    }

    static AddStep(step: transform, buffer: transform){
        buffer.pos = p5.Vector.add(step.pos, buffer.pos)
        buffer.scl = buffer.scl.copy().mult(step.scl)
        buffer.rot += step.rot
    }
}