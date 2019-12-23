"use strict";
exports.__esModule = true;
// Convert Degrees to Radians
function degreeToRadians(angle) {
    return angle * (Math.PI / 180);
}
exports.degreeToRadians = degreeToRadians;
// Truncate a decimal number with an specific decimal part
function truncateDecimals(number, digits) {
    var multiplier = Math.pow(10, digits), adjustedNum = number * multiplier, truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);
    return truncatedNum / multiplier;
}
exports.truncateDecimals = truncateDecimals;
;
// Return a high order function that represent the straght in the coordinates axis
function drawStraight(point1, point2) {
    var deltaX = point2.x - point1.x;
    var deltaY = point2.y - point1.y;
    if (deltaX == 0) {
        // Vertical straight
        return { m: null, y: null, x: point1.x };
    }
    else {
        // Otherwise return f(x)
        var m_1 = deltaY / deltaX;
        return {
            m: m_1,
            y: function (x) { return m_1 * (x - point1.x) + point2.y; },
            x: point1.x
        };
    }
}
exports.drawStraight = drawStraight;
// Evaluate if two straight f(x) are the same. Return true if are equals
function isSameStraight(straight1, straight2) {
    // Analize verticals straigths
    if (straight1.m == null && straight2.m == null) {
        return straight1.x == straight2.x;
    }
    // Only one is vertical
    if (straight1.m == null || straight2.m == null) {
        return false;
    }
    // If have pendants, analize equality with two random points
    var x1 = Math.random();
    var x2 = Math.random();
    return straight1.y(x1) == straight2.y(x1) &&
        straight1.y(x2) == straight2.y(x2);
}
exports.isSameStraight = isSameStraight;
// Verify if a point is part of the straight
function pointInStaright(point, straight) {
    if (straight.m == null) {
        return point.x == straight.x;
    }
    else {
        var yp = straight.y(point.x);
        return point.y == yp;
    }
}
exports.pointInStaright = pointInStaright;
// Verify if a point is in the middle of triangle
function pointInTheTriangle(point, lines) {
    var distances = [];
    for (var i = 0; i < 3; i++) {
        var straight = lines[i];
        var dist = distancePointStraight(point, straight);
        distances.push({ m: straight.m, dist: dist });
    }
    if (distances.find(function (d) { return d == 0; }) != null) {
        return true;
    }
    else {
        var positives = distances.filter(function (x) { return x.m >= 0; });
        if (positives.length == 2) {
            var negative = distances.find(function (x) { return x.m == null || x.m < 0; });
            if (negative.dist < 0 && (positives[0].dist * positives[1].dist) < 0) {
                return true;
            }
        }
        else {
            var negatives = distances.filter(function (x) { return x.m < 0; });
            if (negatives.length == 2) {
                var positive = positives[0];
                if (positive.dist < 0 && (negatives[0].dist * negatives[1].dist) < 0) {
                    return true;
                }
            }
        }
    }
    return false;
}
exports.pointInTheTriangle = pointInTheTriangle;
function distancePointStraight(point, straight) {
    if (straight.m == null) {
        return point.x - straight.x;
    }
    else if (straight.m == 0) {
        return point.y - straight.y(point.x);
    }
    else {
        var dist = (straight.y(point.x) - point.y) / Math.sqrt(Math.pow(straight.m, 2) + 1);
        return dist;
    }
}
function calculateTrianglePerimeter(p, q, t) {
    var perimeter = 0;
    perimeter += distancePointPoint(p, q);
    perimeter += distancePointPoint(q, t);
    perimeter += distancePointPoint(t, p);
    return perimeter;
}
exports.calculateTrianglePerimeter = calculateTrianglePerimeter;
function distancePointPoint(point1, point2) {
    var deltaX = point2.x - point1.x;
    var deltaY = point2.y - point1.y;
    var sum = Math.pow(deltaX, 2) + Math.pow(deltaY, 2);
    return Math.sqrt(sum);
}
exports.distancePointPoint = distancePointPoint;
//# sourceMappingURL=math.helper.js.map