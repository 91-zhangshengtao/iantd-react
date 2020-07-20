var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { CSSTransition } from 'react-transition-group';
var Transition = function (props) {
    var children = props.children, classNames = props.classNames, animation = props.animation, wrapper = props.wrapper, restProps = __rest(props, ["children", "classNames", "animation", "wrapper"]);
    return (
    /*
        in --显示组件；触发进入或退出状态
        unmountOnExit --动态添加/删除children元素，不需要display:none/block;
        appear --默认情况下，子组件在首次安装时不执行回车转换，而与的值无关in。如果您想要这种行为，请将appear和都设置in为true。
        <CSSTransition
          in={menuOpen}
          timeout={300}
          classNames="zoom-in-top"
          appear
          unmountOnExit
        >
          <ul className={subMenuClasses}>
            {childrenComponent}
          </ul>
        </CSSTransition>

        .zoom-in-top-enter {
          opacity: 0;
        }
        .zoom-in-top-enter-active {
          opacity: 1;
          transition: opacity 200ms;
        }
        .zoom-in-top-exit {
          opacity: 1;
        }
        .zoom-in-top-exit-active {
          opacity: 0;
          transition: opacity 200ms;
        }
    */
    React.createElement(CSSTransition, __assign({ classNames: classNames ? classNames : animation }, restProps), wrapper ? React.createElement("div", null, children) : children));
};
Transition.defaultProps = {
    unmountOnExit: true,
    appear: true,
};
export default Transition;
