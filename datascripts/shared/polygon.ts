export type Polygon = TSPosition[];

/**
 * This checks a position against an array of positions (which form a polygon)
 * using the Even-Odd rule to determine if the given point lies within the shape.
 *
 * It does not care about `map`, `z`, or `o`.
 */
export function isPositionInside(point: TSPosition, polygon: Polygon): boolean {
    let inside = false;

    // j is the last entry in the polygon so that is wrapping around to form a full structure.
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].x;
        const yi = polygon[i].y;
        const xj = polygon[j].x;
        const yj = polygon[j].y;

        const intersect: boolean =
            yi > point.y != yj > point.y &&
            point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;

        // Even-odd rule. Even is inside, odd is outside.
        if (intersect) inside = !inside;
    }

    return inside;
}
