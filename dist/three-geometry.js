/*!
 *  Three-Geometry - 为image3D.js设计开发的三维几何坐标运算库
 * git+https://github.com/clunch-contrib/Three-Geometry.git
 *
 * author 你好2007 < https://hai2007.gitee.io/sweethome >
 *
 * version 1.1.2
 *
 * Copyright (c) 2021-present hai2007 走一步，再走一步。
 * Released under the MIT license
 *
 * Date:Mon Oct 25 2021 00:28:37 GMT+0800 (GMT+08:00)
 */
(function () {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var toString = Object.prototype.toString;
  /**
   * 获取一个值的类型字符串[object type]
   *
   * @param {*} value 需要返回类型的值
   * @returns {string} 返回类型字符串
   */

  function getType (value) {
    if (value == null) {
      return value === undefined ? '[object Undefined]' : '[object Null]';
    }

    return toString.call(value);
  }

  /**
   * 判断一个值是不是number。
   *
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是number返回true，否则返回false
   */

  function _isNumber (value) {
    return typeof value === 'number' || value !== null && _typeof(value) === 'object' && getType(value) === '[object Number]';
  }

  var isNumber = _isNumber;

  var circle = {
    // 计算切割份数
    splitNum: function splitNum(precision, radius) {
      // 根据切割弧度得出切割块数目
      var num = Math.ceil(Math.PI * 2 / // 为了满足最小精度而得出的切割弧度
      Math.asin(precision / radius) * 2);
      return isNaN(num) || num < 12 ? 12 : num;
    }
  };

  // 点（x,y）围绕中心（cx,cy）旋转deg度
  function rotate (cx, cy, deg, x, y) {
    var cos = Math.cos(deg),
        sin = Math.sin(deg);
    return [(x - cx) * cos - (y - cy) * sin + cx, (x - cx) * sin + (y - cy) * cos + cy];
  }

  function prismHorizontal (x, y, z, radius, num) {
    var points = [x, y, z, x + radius, y, z],
        deg = Math.PI * 2 / num;

    for (var i = 0; i < num; i++) {
      var point = rotate(x, z, deg * (i + 1), x + radius, z);
      points.push(point[0], y, point[1]);
    }

    return points;
  }

  function prismVertical (x, y, z, radius, height, num) {
    var points = [x + radius, y, z, x + radius, y + height, z],
        deg = Math.PI * 2 / num;

    for (var i = 0; i < num; i++) {
      var point = rotate(x, z, deg * (i + 1), x + radius, z);
      points.push(point[0], y, point[1], point[0], y + height, point[1]);
    }

    return points;
  }

  function sphereFragment (cx, cy, cz, radius, num, index) {
    var points = [cx, cy + radius, cz],
        deg = Math.PI * 2 / num,
        point;

    for (var i = 1; i < num * 0.5; i++) {
      point = rotate(cx, cy, deg * i, cx, cy + radius); // 第一个点

      var point1 = rotate(cx, cz, deg * index, point[0], cz);
      points.push(point1[0], point[1], point1[1]); // 下一个点

      var point2 = rotate(cx, cz, deg * (index + 1), point[0], cz);
      points.push(point2[0], point[1], point2[1]);
    }

    points.push(cx, cy - radius, cz);
    return points;
  }

  var ThreeGeometry = function ThreeGeometry(options) {
    if (!isNumber(options.precision) || options <= 0) {
      throw new Error('options.precision should be an integer greater than zero');
    }

    var threeGeometry = {
      // 圆柱体
      cylinder: function cylinder(doback, x, y, z, radius, height) {
        // 求解出需要切割多少份比较合理
        var num = circle.splitNum(options.precision, radius); // 然后，余下的交给棱柱体处理就可以了

        threeGeometry.prism(doback, x, y, z, radius, height, num);
        return threeGeometry;
      },
      // 棱柱体
      prism: function prism(doback, x, y, z, radius, height, num) {
        // 绘制底部的盖子
        doback({
          points: prismHorizontal(x, y, z, radius, num),
          length: num + 2,
          methods: "FanTriangle"
        }); // 绘制顶部的盖子

        doback({
          points: prismHorizontal(x, y + height, z, radius, num),
          length: num + 2,
          methods: "FanTriangle"
        }); // 绘制侧边部分

        doback({
          points: prismVertical(x, y, z, radius, height, num),
          length: 2 * num + 2,
          methods: "StripTriangle"
        });
        return threeGeometry;
      },
      // 球体
      sphere: function sphere(doback, cx, cy, cz, radius) {
        // 求解出需要切割多少份比较合理
        var num = circle.splitNum(options.precision, radius); // 然后一瓣瓣的绘制

        for (var i = 0; i < num; i++) {
          doback({
            points: sphereFragment(cx, cy, cz, radius, num, i),
            length: num,
            methods: "StripTriangle"
          });
        }

        return threeGeometry;
      }
    };
    return threeGeometry;
  };

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = ThreeGeometry;
  } else {
    window.ThreeGeometry = ThreeGeometry;
  }

}());
