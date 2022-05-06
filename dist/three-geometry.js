/*!
 *  Three-Geometry - 为image3D.js设计开发的三维几何坐标运算库
 * git+https://github.com/clunch-contrib/Three-Geometry.git
 *
 * author 你好2007 < https://hai2007.gitee.io/sweethome >
 *
 * version 1.4.1
 *
 * Copyright (c) 2021-present hai2007 走一步，再走一步。
 * Released under the MIT license
 *
 * Date:Fri May 06 2022 22:20:16 GMT+0800 (GMT+08:00)
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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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

  function prismHorizontal (normal, x, y, z, radius, num, d) {
    var beginX, beginZ;

    if (num == 4) {
      var temp = radius / 1.414;
      beginX = x + temp;
      beginZ = z + temp;
    } else {
      beginX = x + radius;
      beginZ = z;
    }

    var points = [x, y, z],
        deg = Math.PI * 2 / num;
    if (normal) points.push(0, d, 0);
    points.push(beginX, y, beginZ);
    if (normal) points.push(0, d, 0);

    for (var i = 0; i < num; i++) {
      var point = rotate(x, z, deg * (i + 1), beginX, beginZ);
      points.push(point[0], y, point[1]);
      if (normal) points.push(0, d, 0);
    }

    return points;
  }

  function prismVertical (normal, x, y, z, radius, height, num) {
    var points = [];
    var beginPosition;

    if (num == 4) {
      beginPosition = rotate(x, z, Math.PI * 0.25, x - radius, z);
    } else {
      beginPosition = [x + radius, z];
    }

    var deg = Math.PI * 2 / num,
        degHalf = Math.PI * 2 / (num * 2);
    var endPosition,
        normalPosition = [];

    for (var i = 0; i < num; i++) {
      endPosition = rotate.apply(void 0, [x, z, deg].concat(_toConsumableArray(beginPosition)));

      if (normal) {
        var halfPosition = rotate.apply(void 0, [x, z, degHalf].concat(_toConsumableArray(beginPosition)));
        normalPosition = [halfPosition[0], 0, halfPosition[1]];
      }

      points.push.apply(points, [beginPosition[0], y, beginPosition[1]].concat(_toConsumableArray(normalPosition)));
      points.push.apply(points, [beginPosition[0], y + height, beginPosition[1]].concat(_toConsumableArray(normalPosition)));
      points.push.apply(points, [endPosition[0], y + height, endPosition[1]].concat(_toConsumableArray(normalPosition)));
      points.push.apply(points, [beginPosition[0], y, beginPosition[1]].concat(_toConsumableArray(normalPosition)));
      points.push.apply(points, [endPosition[0], y, endPosition[1]].concat(_toConsumableArray(normalPosition)));
      points.push.apply(points, [endPosition[0], y + height, endPosition[1]].concat(_toConsumableArray(normalPosition)));
      beginPosition = endPosition;
    }

    return points;
  }

  function sphereFragment (normal, cx, cy, cz, radius, num, index) {
    var points = [cx, cy + radius, cz],
        deg = Math.PI * 2 / num,
        point;
    if (normal) points.push(0, radius, 0);

    for (var i = 1; i < num * 0.5; i++) {
      point = rotate(cx, cy, deg * i, cx, cy + radius); // 第一个点

      var point1 = rotate(cx, cz, deg * index, point[0], cz);
      points.push(point1[0], point[1], point1[1]);
      if (normal) points.push(point1[0] - cx, point[1] - cy, point1[1] - cz); // 下一个点

      var point2 = rotate(cx, cz, deg * (index + 1), point[0], cz);
      points.push(point2[0], point[1], point2[1]);
      if (normal) points.push(point2[0] - cx, point2[1] - cy, point2[1] - cz);
    }

    points.push(cx, cy - radius, cz);
    if (normal) points.push(0, -radius, 0);
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
          points: prismHorizontal(options.normal, x, y, z, radius, num, height > 0 ? -1 : 1),
          length: num + 2,
          methods: "FanTriangle"
        }); // 绘制顶部的盖子

        doback({
          points: prismHorizontal(options.normal, x, y + height, z, radius, num, height > 0 ? 1 : -1),
          length: num + 2,
          methods: "FanTriangle"
        }); // 绘制侧边部分

        doback({
          points: prismVertical(options.normal, x, y, z, radius, height, num),
          length: 6 * num,
          methods: "Triangle"
        });
        return threeGeometry;
      },
      // 球体
      sphere: function sphere(doback, cx, cy, cz, radius) {
        // 求解出需要切割多少份比较合理
        var num = circle.splitNum(options.precision, radius); // 然后一瓣瓣的绘制

        for (var i = 0; i < num; i++) {
          doback({
            points: sphereFragment(options.normal, cx, cy, cz, radius, num, i),
            length: num + 1,
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
