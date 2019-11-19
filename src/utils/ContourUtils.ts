import {
    Point,
    LineSegment,
    LinearFunction,
    Contour,
} from "../models/Geometry";

/**
 * Returns true if the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
 * https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
 */
function doIntersect(a: number, b: number, c: number, d: number, p: number, q: number, r: number, s: number): boolean {
    let determinant, gamma, lambda;
    determinant = (c - a) * (s - q) - (r - p) * (d - b);
    if (determinant === 0) {
        return false;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / determinant;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / determinant;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
}

function doLinesIntersect(l1: LineSegment, l2: LineSegment): boolean {
    return doIntersect(l1.p1.x, l1.p1.y, l1.p2.x, l1.p2.y, l2.p1.x, l2.p1.y, l2.p2.x, l2.p2.y);
}

/**
 * Given two points produces coefficients
 * of corresponding linear function in a form of a*x + b*y = c
 */
function getLinearFunction({p1, p2}: LineSegment): LinearFunction {
    const a = p2.y - p1.y;
    const b = p1.x - p2.x;
    const c = a * p1.x + b * p1.y;
    return {a, b, c};
}

function getLineSegmentIntersectionPoint(lineSegment1: LineSegment, lineSegment2: LineSegment): Point | null {
    const f1 = getLinearFunction(lineSegment1);
    const f2 = getLinearFunction(lineSegment2);
    const determinant = f1.a * f2.b - f2.a * f1.b;
    if (determinant !== 0) { // lines are not parallel
        const x = (f1.c * f2.b - f2.c * f1.b) / determinant;
        const y = (f1.a * f2.c - f2.a * f1.c) / determinant;
        return {x, y};
    }
    return null;
}

/**
 * Given an array of contour points produces an array of corresponding contour lines
 * @param contour
 */
function getContourLines(contour: Contour): LineSegment[] {
    return contour.points.map((p: Point, index: number) => {
        return {
            p1: p,
            p2: index + 1 >= contour.points.length ? contour.points[0] : contour.points[index + 1],
        };
    })
}

export function getContourIntersectionPoint(contour: Contour): Point | null {
    const lines: LineSegment[] = getContourLines(contour);
    for(let l1 of lines) {
        for (let l2 of lines) {
            if(l1 !== l2) {
                if(doLinesIntersect(l1, l2)) {
                    return getLineSegmentIntersectionPoint(l1, l2);
                }
            }
        }
    }
    return null;
}
