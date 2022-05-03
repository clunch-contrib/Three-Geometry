import rotate from '../tool/rotate';

// 棱柱水平部分

export default function (x, y, z, radius, num) {

    let beginX, beginZ;
    if (num == 4) {
        let temp = radius / 1.414;
        beginX = x + temp;
        beginZ = z + temp;

    } else {
        beginX = x + radius;
        beginZ = z;
    }

    let points = [x, y, z, beginX, y, beginZ], deg = Math.PI * 2 / num;
    for (let i = 0; i < num; i++) {
        let point = rotate(x, z, deg * (i + 1), beginX, beginZ);
        points.push(point[0], y, point[1]);
    }
    return points;
};
