export interface Point {
    x: number;
    y: number;
}

export interface LineSegment {
    p1: Point;
    p2: Point;
}

/**
 * A function in a form of a*x + b*y = c
 */
export interface LinearFunction {
    a: number;
    b: number;
    c: number;
}

export interface Contour {
    points: Point[];
}
