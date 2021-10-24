import rotate from '../tool/rotate';

// 球体中的一瓣子

export default function (cx, cy, cz, radius, num, index) {
    let points = [cx, cy + radius, cz], deg = Math.PI * 2 / num, point;
    for (let i = 1; i < num * 0.5; i++) {
        point = rotate(cx, cy, deg * i, cx, cy + radius);

        // 第一个点
        let point1 = rotate(cx, cz, deg * index, point[0], cz);
        points.push(point1[0], point[1], point1[1]);

        // 下一个点
        let point2 = rotate(cx, cz, deg * (index + 1), point[0], cz);
        points.push(point2[0], point[1], point2[1]);
    }
    points.push(cx, cy - radius, cz);
    return points;
};
