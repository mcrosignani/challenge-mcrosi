import { CoordinateModel } from "../models/coordinate.model";
import { StraigthModel } from "../models/straight.model";

// Convert Degrees to Radians
function degreeToRadians(angle) {
    return angle * (Math.PI / 180);
}

// Truncate a decimal number with an specific decimal part
function truncateDecimals(number, digits) {
    var multiplier = Math.pow(10, digits),
        adjustedNum = number * multiplier,
        truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
};

// Return a high order function that represent the straght in the coordinates axis
function drawStraight(point1: CoordinateModel, point2: CoordinateModel) {
    const deltaX = point2.x - point1.x;
    const deltaY = point2.y - point1.y;

    if (deltaX == 0) {
        // Vertical straight
        return { m: null, y: null, x: point1.x }
    } else {
        // Otherwise return f(x)
        const m = deltaY / deltaX;
        return {
            m,
            y: (x: number) => m*(x-point1.x) + point2.y,
            x: point1.x
        }
    }
}

// Evaluate if two straight f(x) are the same. Return true if are equals
function isSameStraight(straight1: StraigthModel, straight2: StraigthModel) {
    // Analize verticals straigths
    if (straight1.m == null && straight2.m == null) {
        return straight1.x == straight2.x;
    }

    // Only one is vertical
    if (straight1.m == null || straight2.m == null) {
        return false;
    }

    // If have pendants, analize equality with two random points
    const x1 = Math.random();
    const x2 = Math.random();

    return straight1.y(x1) == straight2.y(x1) &&
        straight1.y(x2) == straight2.y(x2);
}

// Verify if a point is part of the straight
function pointInStaright(point: CoordinateModel, straight: StraigthModel) {
    if (straight.m == null) {
        return point.x == straight.x;
    } else {
        const yp: number = straight.y(point.x);
        return point.y == yp;
    }
}

// Verify if a point is in the middle of triangle
function pointInTheTriangle(point: CoordinateModel, lines: StraigthModel[]) {
    let distances = [];
    for (let i = 0; i < 3; i++) {
        const straight = lines[i];
        const dist = distancePointStraight(point, straight);

        distances.push({ m: straight.m, dist: dist });
    }

    if (distances.find(d => d == 0) != null) {
        return true;
    } else {
        const positives = distances.filter(x => x.m >= 0);
        if (positives.length == 2) {
            const negative = distances.find(x => x.m == null || x.m < 0);
            if (negative.dist < 0 && (positives[0].dist * positives[1].dist) < 0) {
                return true;
            }
        } else {
            const negatives = distances.filter(x => x.m < 0);
            if (negatives.length == 2) {
                const positive = positives[0];
                if (positive.dist < 0 && (negatives[0].dist * negatives[1].dist) < 0) {
                    return true;
                }
            }
        }
    }

    return false;
}

function distancePointStraight(point: CoordinateModel, straight: StraigthModel) {
    if (straight.m == null) {
        return point.x -straight.x;
    } else if (straight.m == 0) {
        return point.y - straight.y(point.x);
    } else {
        const dist = (straight.y(point.x) - point.y) / Math.sqrt(Math.pow(straight.m, 2) + 1);
        return dist;
    }
}

function calculateTrianglePerimeter(p: CoordinateModel, q: CoordinateModel, t: CoordinateModel) {
    let perimeter = 0;

    perimeter += distancePointPoint(p, q);
    perimeter += distancePointPoint(q, t);
    perimeter += distancePointPoint(t, p);

    return perimeter;
}

function distancePointPoint(point1: CoordinateModel, point2: CoordinateModel) {
    const deltaX = point2.x - point1.x;
    const deltaY = point2.y - point1.y;

    const sum = Math.pow(deltaX, 2) + Math.pow(deltaY, 2);

    return Math.sqrt(sum);
}

export { degreeToRadians, 
    truncateDecimals, 
    drawStraight, 
    isSameStraight, 
    pointInStaright, 
    pointInTheTriangle,
    calculateTrianglePerimeter,
    distancePointPoint }