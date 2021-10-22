/*!
 * 🍊 - 棱锥体
 * https://github.com/hai2007/Three-Geometry/blob/master/conule.js
 *
 * author hai2007 < https://hai2007.gitee.io/sweethome >
 *
 * Copyright (c) 2021 hai2007 走一步，再走一步。
 * Released under the MIT license
 */

import rotate from './.inner/rotate';

/**
 * @param {number} num 表示棱的个数，至少是3
 * @param {number} cx 棱锥体底部圆心X坐标
 * @param {number} cy 棱锥体底部圆心Y坐标
 * @param {number} cz 棱锥体底部圆心Z坐标
 * @param {number} radius 棱锥体底部半径
 * @param {number} height 棱锥体的高
 */
export default function (num, cx, cy, cz, radius, height) {

    var deg = Math.PI * 2 / num;

    var points1 = [cx, cy + height, cz, cx + radius, cy, cz], points2 = [cx, cy, cz, cx + radius, cy, cz], i;
    for (i = 0; i < num; i++) {
        var point = rotate(cx, cz, deg * (i + 1), cx + radius, cz);
        points1.push(point[0], cy, point[1]);
        points2.push(point[0], cy, point[1]);
    }

    return [{
        num: i + 2,
        points: points1,
        link: null,
        graph: "FanTriangle"
    }, {
        num: i + 2,
        points: points2,
        link: null,
        graph: "FanTriangle"
    }];
};
