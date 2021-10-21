
// 点（x,y）围绕中心（cx,cy）旋转deg度

export default function (cx, cy, deg, x, y) {
    var cos = Math.cos(deg), sin = Math.sin(deg);
    return [
        (x - cx) * cos - (y - cy) * sin + cx,
        (x - cx) * sin + (y - cy) * cos + cy
    ];
};
