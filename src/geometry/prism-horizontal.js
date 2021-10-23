import rotate from '../tool/rotate';

// 棱柱水平部分

export default function (x, y, z, radius, num) {
    let points = [x, y, z, x + radius, y, z], deg = Math.PI * 2 / num;
    for (let i = 0; i < num; i++) {
        let point = rotate(x, z, deg * (i + 1), x + radius, z);
        points.push(point[0], y, point[1]);
    }
    return points;
};
