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
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
var SubMenu = function (_a) {
    var index = _a.index, title = _a.title, children = _a.children, className = _a.className;
    var context = useContext(MenuContext);
    var openedSubMenus = context.defaultOpenSubMenus;
    // 'vertical' 纵向
    var isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
    // 拿Context中index
    var tem_Index1 = index;
    var tem_Index2 = context.index;
    // 1-1 3-1 ==> 1 3
    var subIndex1 = tem_Index1.split('-')[0];
    var subIndex2 = tem_Index2.split('-')[0];
    console.log('subIndex1, subIndex2：', subIndex1, subIndex2);
    var _b = useState(isOpend), menuOpen = _b[0], setOpen = _b[1];
    var classes = classNames('menu-item submenu-item', className, {
        'is-active': subIndex1 === subIndex2,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    });
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    /* hover事件 */
    var hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: function (e) { handleMouse(e, true); },
        onMouseLeave: function (e) { handleMouse(e, false); }
    } : {};
    /* children */
    /*<Menu {...props}>
        <MenuItem>
          active
        </MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>
            drop1
          </MenuItem>
        </SubMenu>
      </Menu>
    */
    /*
       <ul className="viking-menu menu-vertical/menu-horizontal">
         <li className="menu-item is-disabled is-active">item11</li>
   
         <li className="menu-item submenu-item is-active is-opened is-vertical">
           <div className="submenu-title">title</div>
           <ul className="viking-submenu menu-opened">
             <li>item21</li>
             <li className="menu-item is-disabled is-active">item22</li>
           </ul>
         </li>
       </ul>
    */
    var renderChildren = function () {
        var subMenuClasses = classNames('viking-submenu', {
            'menu-opened': menuOpen
        });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: index + "-" + i // '1-1'
                });
            }
            else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component");
            }
        });
        return (React.createElement(Transition, { in: menuOpen, timeout: 300, animation: "zoom-in-top", wrapper: false },
            React.createElement("ul", { className: subMenuClasses }, childrenComponent)));
    };
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverEvents),
        React.createElement("div", __assign({ className: "submenu-title" }, clickEvents),
            title,
            React.createElement(Icon, { icon: "angle-down", className: "arrow-icon" })),
        renderChildren()));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
