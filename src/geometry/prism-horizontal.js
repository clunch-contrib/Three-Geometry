import rotate from '../tool/rotate';

// 棱柱水平部分

export default function (normal, x, y, z, radius, num, d) {

    let beginX, beginZ;
    if (num == 4) {
        let temp = radius / 1.414;
        beginX = x + temp;
        beginZ = z + temp;

    } else {
        beginX = x + radius;
        beginZ = z;
    }

    let points = [x, y, z], deg = Math.PI * 2 / num;

    if (normal) points.push(0, d, 0);

    points.push(beginX, y, beginZ);

    if (normal) points.push(0, d, 0);

    for (let i = 0; i < num; i++) {
        let point = rotate(x, z, deg * (i + 1), beginX, beginZ);
        points.push(point[0], y, point[1]);

        if (normal) points.push(0, d, 0);

    }
    return points;
};
