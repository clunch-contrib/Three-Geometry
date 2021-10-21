/*!
 * 🍊 - 圆形
 * https://github.com/hai2007/Three-Geometry/blob/master/circle.js
 *
 * author hai2007 < https://hai2007.gitee.io/sweethome >
 *
 * Copyright (c) 2021 hai2007 走一步，再走一步。
 * Released under the MIT license
 */

import circle from './.inner/circle';
import rotate from './.inner/rotate';

/**
 * @param {number} precision 精度
 * @param {number} cx 圆心X坐标
 * @param {number} cy 圆心Y坐标
 * @param {number} cz 圆心Z坐标
 * @param {number} radius 圆半径
 */
export default function (precision, cx, cy, cz, radius) {

    var num = circle.splitNum(precision, radius);
    var deg = Math.PI * 2 / num;

    var points = [cx, cy, cz, cx + radius, cy, cz], i;
    for (i = 0; i < num; i++) {
        var point = rotate(cx, cz, deg * (i + 1), cx + radius, cz);
        points.push(point[0], cy, point[1]);
    }

    // 为什么返回的是数组？
    // 因为有时候，一些复杂图形可以由简图形拼接成
    return [{

        // 点的个数
        num: i + 2,

        // 点坐标
        points: points,

        // 有时候的图形可能索引点更好
        // 如果是null，表示不采用索引
        link: null,

        // 表示这些点应该采用画笔方法绘制
        graph: "FanTriangle"

    }];
};
