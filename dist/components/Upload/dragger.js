import React, { useState } from 'react';
import classNames from 'classnames';
export var Dragger = function (props) {
    var onFile = props.onFile, children = props.children;
    var _a = useState(false), dragOver = _a[0], setDragOver = _a[1]; // 初始化拖拽状态 false
    var klass = classNames('viking-uploader-dragger', {
        'is-dragover': dragOver
    });
    // 拖拽事件
    var handleDrop = function (e) {
        e.preventDefault();
        setDragOver(false);
        onFile(e.dataTransfer.files); // 拿到fileList 调用父组件onFile方法
    };
    // 拖拽移动事件 拖进/拖出
    var handleDrag = function (e, over) {
        e.preventDefault(); // 阻止浏览器默认行为
        setDragOver(over);
    };
    return (
    /*
      ondragenter - 当被鼠标拖动的对象进入其容器范围内时触发此事件
    ondragover - 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
    ondragleave - 当被鼠标拖动的对象离开其容器范围内时触发此事件
    ondrop - 在一个拖动过程中，释放鼠标键时触发此事件
    */
    React.createElement("div", { className: klass, onDragOver: function (e) { handleDrag(e, true); }, onDragLeave: function (e) { handleDrag(e, false); }, onDrop: handleDrop }, children));
};
export default Dragger;
