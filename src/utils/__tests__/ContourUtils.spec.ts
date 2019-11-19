import {
    getContourIntersectionPoint,
} from "../ContourUtils";

describe('ContourUtils', () => {


    describe('getContourIntersectionPoint', () => {

        it('should be null for not intersected contour lines', () => {
            const contour = {
                points:[
                    {x:0, y:0},
                    {x:0, y:100},
                    {x:100, y:100},
                    {x:100, y:0},
                ]};
            expect(getContourIntersectionPoint(contour)).toBeNull();
        });

        it('should be intersection coordinates for intersected contour lines', () => {
            const contour = {points:
                    [
                        {x:0, y:0},
                        {x:100, y:100},
                        {x:0,y:100},
                        {x:100, y:0},
                    ]};
            expect(getContourIntersectionPoint(contour)).toEqual({x: 50, y: 50});
        });

        it('should be null for not intersected contour lines, even though intersected continuous linear representations', () => {
            const contour = {
                points:[
                    {x:0, y:0},
                    {x:25, y:25},
                    {x:75, y:25},
                    {x:100, y:0},
                ]};
            expect(getContourIntersectionPoint(contour)).toBeNull();
        });

    });
});
