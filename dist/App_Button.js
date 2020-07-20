import React from 'react';
import './styles/index.scss';
import Button from './components/Button';
function App() {
    return (React.createElement("div", { className: "App" },
        React.createElement("div", null,
            React.createElement(Button, { className: "testclass" }, "className"),
            React.createElement(Button, { autoFocus: true }, "autoFocus"),
            React.createElement(Button, { size: "lg" }, " large button "),
            React.createElement(Button, { size: "sm" }, " small button "),
            React.createElement(Button, { size: "sm", disabled: true }, "disabled small button ")),
        React.createElement("div", null,
            React.createElement(Button, { btnType: "primary" }, " primary button "),
            React.createElement(Button, { btnType: "danger" }, " danger button "),
            React.createElement(Button, { btnType: "link", href: "https://google.com", target: "_blank" }, " link button "),
            React.createElement(Button, { btnType: "link", href: "https://google.com", target: "_blank", disabled: true }, "disabled link button "),
            React.createElement(Button, { onClick: function () { alert('button click'); } }, " click button "))));
}
export default App;
