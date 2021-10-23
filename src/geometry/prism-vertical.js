import rotate from '../tool/rotate';

// 棱柱垂直部分

export default function (x, y, z, radius, height, num) {
    let points = [x + radius, y, z, x + radius, y + height, z], deg = Math.PI * 2 / num;
    for (let i = 0; i < num; i++) {
        let point = rotate(x, z, deg * (i + 1), x + radius, z);
        points.push(point[0], y, point[1], point[0], y + height, point[1]);
    }
    return points;
};
