<img src='./logo.png' />

# Three-Geometry
为[image3D.js](https://hai2007.gitee.io/image3d/)设计开发的三维几何坐标运算库

<p>
  <a href="https://hai2007.gitee.io/npm-downloads?interval=7&packages=three-geometry"><img src="https://img.shields.io/npm/dm/three-geometry.svg" alt="downloads"></a>
  <a href="https://packagephobia.now.sh/result?p=three-geometry"><img src="https://packagephobia.now.sh/badge?p=three-geometry" alt="install size"></a>
  <a href="https://www.npmjs.com/package/three-geometry"><img src="https://img.shields.io/npm/v/three-geometry.svg" alt="Version"></a>
  <a href="https://github.com/clunch-contrib/Three-Geometry/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/three-geometry.svg" alt="License"></a>
  <a href="https://github.com/clunch-contrib/Three-Geometry">
        <img alt="GitHub repo stars" src="https://img.shields.io/github/stars/clunch-contrib/Three-Geometry?style=social">
    </a>
</p>

## Issues
使用的时候遇到任何问题或有好的建议，请点击进入[issue](https://github.com/clunch-contrib/Three-Geometry/issues)，欢迎参与维护！

## How to use?

首先，你需要使用npm进行安装：

```
npm install --save three-geometry
```

然后就可以使用了：

```js
import ThreeGeometry from 'three-geometry';
var threeGeometry = ThreeGeometry(options);
```

通过传递一个json格式的```options```来获取一个计算实例```threeGeometry```，其上提供了各种几何体的绘制数据```data```的方法。

他们的数据格式如下：

- options

```js
{
    precision:number,// 精度
}
```

- data

```js
{

}
```

## List of Geometry

下面，我们来列举一下具体的几何体有哪些。

### 圆柱体(cylinder)

```js
// 底部坐标（x,y,z)、高height
var data = threeGeometry.cylinder(x,y,z,height);
```

### 棱柱体(prism)

```js
// 底部坐标（x,y,z)、高height、棱的个数num
var data = threeGeometry.prism(x,y,z,height,num);
```

### 球体(sphere)

```js
// 球心（cx,cy,cz)、半径radius
var data = threeGeometry.sphere(cx,cy,cz,radius);
```

需要注意的是，为了方便计算，默认我们统一是把物体看成平放在xoz平面上。

开源协议
---------------------------------------
[MIT](https://github.com/clunch-contrib/Three-Geometry/blob/master/LICENSE)

Copyright (c) 2021 [hai2007](https://hai2007.gitee.io/sweethome/) 走一步，再走一步。
