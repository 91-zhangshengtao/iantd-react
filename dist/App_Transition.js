import React, { useState } from 'react';
import './styles/index.scss';
import Button from './components/Button';
import Transition from './components/Transition';
function App() {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    return (React.createElement("div", { className: "App" },
        React.createElement("div", null,
            React.createElement(Button, { btnType: "default", size: "lg", onClick: function () { setShow(!show); } }, "Toggle")),
        React.createElement("div", null,
            React.createElement(Transition, { in: show, timeout: 5000, animation: "zoom-in-top", wrapper: false },
                React.createElement("ul", null,
                    React.createElement("li", null, "11111188888888888888888888888888888"),
                    React.createElement("li", null, "1111118888888888888888888888888888"),
                    React.createElement("li", null, "111111"),
                    React.createElement("li", null, "111111"),
                    React.createElement("li", null, "111111"),
                    React.createElement("li", null, "111111"),
                    React.createElement("li", null, "11111188888888888888888888888888888"),
                    React.createElement("li", null, "11111188888888888888888888888888888"),
                    React.createElement("li", null, "11111188888888888888888888888888888"),
                    React.createElement("li", null, "11111188888888888888888888888888888"),
                    React.createElement("li", null, "11111188888888888888888888888888888"))),
            React.createElement(Transition, { in: show, timeout: 5000, animation: "zoom-in-left", wrapper: true },
                React.createElement(Button, { btnType: "primary", size: "lg", onClick: function () { setShow(!show); } }, " A large Button ")))));
}
export default App;
