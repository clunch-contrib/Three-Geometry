import { isNumber } from '@hai2007/tool/type';
import circle from './tool/circle';
import prismHorizontal from './geometry/prism-horizontal';
import prismVertical from './geometry/prism-vertical';

let ThreeGeometry = options => {

    if (!isNumber(options.precision) || options <= 0) {
        throw new Error('options.precision should be an integer greater than zero');
    }

    let threeGeometry = {

        // 圆柱体
        cylinder(doback, x, y, z, radius, height) {

            // 求解出需要切割多少份比较合理
            let num = circle.splitNum(options.precision, radius);

            // 然后，余下的交给棱柱体处理就可以了
            threeGeometry.prism(doback, x, y, z, radius, height, num);

            return threeGeometry;
        },

        // 棱柱体
        prism(doback, x, y, z, radius, height, num) {

            // 绘制底部的盖子
            doback({
                points: prismHorizontal(x, y, z, radius, num),
                length: num + 2,
                methods: "FanTriangle"
            });

            // 绘制顶部的盖子
            doback({
                points: prismHorizontal(x, y + height, z, radius, num),
                length: num + 2,
                methods: "FanTriangle"
            });

            // 绘制侧边部分
            doback({
                points: prismVertical(x, y, z, radius, height, num),
                length: 2 * num + 2,
                methods: "StripTriangle"
            });

            return threeGeometry;
        },

        // 球
        sphere(doback, cx, cy, cz, radius) {

            return threeGeometry;
        }
    };

    return threeGeometry;
};

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = ThreeGeometry;
} else {
    window.ThreeGeometry = ThreeGeometry;
}
