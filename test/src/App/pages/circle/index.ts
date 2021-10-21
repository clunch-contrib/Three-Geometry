import { Component } from 'nefbl'
const image3D = require('image3d')

import circle from '../../../../../circle.js'

import style from './index.scss'
import template from './index.html'

@Component({
    selector: "ui-circle",
    template,
    styles: [style]
})
export default class {

    $mounted() {

        let image3d = new image3D(document.getElementById('canvas'), {
            shader: "camera",
            depth: true
        })

        let data = circle(20, 0, 0, 0, 100)

        // 点的坐标
        image3d.Buffer().write(new Float32Array(data[0].points)).use('a_position', 3, 3, 0)

        let camera = image3d.Camera({
            size: 250
        })

        let painter = image3d.Painter();

        setInterval(() => {
            // 传递照相机
            image3d.setUniformMatrix("u_matrix",
                camera.rotateBody(Math.PI * 0.02, -1, -1, 0, 1, 1, 0).value()
            )

            // 绘制
            painter.drawFanTriangle(0, data[0].num)
        }, 20)


    }

}
