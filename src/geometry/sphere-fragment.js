import rotate from '../tool/rotate';

// 球体中的一瓣子

export default function (normal, cx, cy, cz, radius, num, index) {
    let points = [cx, cy + radius, cz], deg = Math.PI * 2 / num, point;

    if (normal) points.push(0, radius, 0);

    for (let i = 1; i < num * 0.5; i++) {
        point = rotate(cx, cy, deg * i, cx, cy + radius);

        // 第一个点
        let point1 = rotate(cx, cz, deg * index, point[0], cz);
        points.push(point1[0], point[1], point1[1]);

        if (normal) points.push(point1[0] - cx, point[1] - cy, point1[1] - cz);

        // 下一个点
        let point2 = rotate(cx, cz, deg * (index + 1), point[0], cz);
        points.push(point2[0], point[1], point2[1]);

        if (normal) points.push(point2[0] - cx, point2[1] - cy, point2[1] - cz);
    }
    points.push(cx, cy - radius, cz);

    if (normal) points.push(0, - radius, 0);

    return points;
};
