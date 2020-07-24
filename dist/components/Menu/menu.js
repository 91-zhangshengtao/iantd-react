import React, { useState, createContext } from 'react';
// import * as PropTypes from 'prop-types';
import classNames from 'classnames';
/* Context */
export var MenuContext = createContext({ index: '0' }); //初始值 {index: '0'}
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * ~~~js
 * import { Menu } from 'vikingship'
 * ~~~
 */
export var Menu = function (props) {
    var className = props.className, mode = props.mode, style = props.style, children = props.children, defaultIndex = props.defaultIndex, onSelect = props.onSelect, defaultOpenSubMenus = props.defaultOpenSubMenus;
    // useState
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classNames('viking-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    });
    // click事件
    var handleClick = function (index) {
        setActive(index);
        // 自定义onSelect事件 --props传入的
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    /* children */
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child; // 断言类型
            var displayName = childElement.type.displayName; // MenuItem.displayName = 'MenuItem'
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            }
            else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: [],
};
// Menu.propTypes = {
//   mode:  PropTypes.oneOf<MenuMode>(['horizontal', 'vertical']),
// }
export default Menu;
