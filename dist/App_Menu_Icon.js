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
import React from 'react';
import './styles/index.scss';
import TransMenu from './components/Menu';
import Icon from './components/Icon';
/* fontawesome --Explicit Import */
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
/* fontawesome --Build a Library */
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; // fas 所有类型集合
import { fab, faAirbnb } from '@fortawesome/free-brands-svg-icons'; // fab 所有类型集合
// library.add(aCheckSquare, faCoffee)
library.add(fas, fab);
function App() {
    var testProps = {
        defaultIndex: '4',
        // mode: 'vertical',
        onSelect: function (index) {
            console.log("\u81EA\u5B9A\u4E49onSelect\u4E8B\u4EF6" + index);
        },
        className: 'test',
        defaultOpenSubMenus: ['4']
    };
    return (React.createElement("div", { className: "App" },
        React.createElement("div", null,
            React.createElement(Icon, { icon: faCoffee, size: "5x", theme: "success" }),
            React.createElement(Icon, { icon: faCoffee, size: "lg", theme: "info" }),
            React.createElement(Icon, { icon: faAirbnb, size: "10x", theme: "info" }),
            React.createElement(Icon, { icon: "coffee", size: "10x", theme: "danger" }),
            React.createElement(Icon, { icon: ['fas', 'coffee'], size: "6x", theme: "secondary" }),
            React.createElement(Icon, { icon: ['fab', 'airbnb'], size: "6x", theme: "warning" })),
        React.createElement("div", null,
            React.createElement(TransMenu, __assign({}, testProps, { mode: 'vertical' }),
                React.createElement(TransMenu.Item, null, "active"),
                React.createElement(TransMenu.Item, { disabled: true }, "disabled"),
                React.createElement(TransMenu.Item, null, "xyz"),
                React.createElement(TransMenu.SubMenu, { title: "dropdown" },
                    React.createElement(TransMenu.Item, null, "drop1"),
                    React.createElement(TransMenu.Item, null, "drop2"),
                    React.createElement(TransMenu.Item, null, "drop3")),
                React.createElement(TransMenu.SubMenu, { title: "opened" },
                    React.createElement(TransMenu.Item, null, "opened1"),
                    React.createElement(TransMenu.Item, null, "opened2")),
                React.createElement(TransMenu.SubMenu, { title: "abc" },
                    React.createElement(TransMenu.Item, null, "abc1"),
                    React.createElement(TransMenu.Item, null, "abc2")))),
        React.createElement("div", null,
            React.createElement(TransMenu, { defaultIndex: "0", defaultOpenSubMenus: [], mode: "horizontal", onSelect: function (index) { console.log(index); } },
                React.createElement(TransMenu.Item, null, "cool link"),
                React.createElement(TransMenu.Item, null, "cool link 2"),
                React.createElement(TransMenu.Item, { disabled: true }, "disabled"),
                React.createElement(TransMenu.SubMenu, { title: "\u4E0B\u62C9\u9009\u9879" },
                    React.createElement(TransMenu.Item, null, "\u4E0B\u62C9\u9009\u9879\u4E00"),
                    React.createElement(TransMenu.Item, null, "\u4E0B\u62C9\u9009\u9879\u4E8C"))))));
}
export default App;
