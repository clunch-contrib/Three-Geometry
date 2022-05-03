import rotate from '../tool/rotate';

// 棱柱垂直部分

export default function (normal, x, y, z, radius, height, num) {

    let beginX, beginZ;
    if (num == 4) {
        let temp = radius / 1.414;
        beginX = x + temp;
        beginZ = z + temp;

    } else {
        beginX = x + radius;
        beginZ = z;
    }

    let points = [beginX, y, beginZ], deg = Math.PI * 2 / num;

    if (normal) {
        points.push(beginX - x, 0, beginZ - z);
    }

    points.push(beginX, y + height, beginZ);

    if (normal) {
        points.push(beginX - x, 0, beginZ - z);
    }

    for (let i = 0; i < num; i++) {
        let point = rotate(x, z, deg * (i + 1), beginX, beginZ);
        points.push(point[0], y, point[1]);

        if (normal) {
            points.push(point[0] - x, 0, point[1] - z);
        }

        points.push(point[0], y + height, point[1]);

        if (normal) {
            points.push(point[0] - x, 0, point[1] - z);
        }

    }
    return points;
};
