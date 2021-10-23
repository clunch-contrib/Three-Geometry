export default {

    // 计算切割份数
    splitNum: function (precision, radius) {

        // 根据切割弧度得出切割块数目
        return Math.ceil(Math.PI * 2 /

            // 为了满足最小精度而得出的切割弧度
            Math.asin(precision / radius) * 2);

    }

};
