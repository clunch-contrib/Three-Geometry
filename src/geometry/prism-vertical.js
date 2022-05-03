import rotate from '../tool/rotate';

// 棱柱垂直部分

export default function (x, y, z, radius, height, num) {

    let beginX, beginZ;
    if (num == 4) {
        let temp = radius / 1.414;
        beginX = x + temp;
        beginZ = z + temp;

    } else {
        beginX = x + radius;
        beginZ = z;
    }

    let points = [beginX, y, beginZ, beginX, y + height, beginZ], deg = Math.PI * 2 / num;
    for (let i = 0; i < num; i++) {
        let point = rotate(x, z, deg * (i + 1), beginX, beginZ);
        points.push(point[0], y, point[1], point[0], y + height, point[1]);
    }
    return points;
};
