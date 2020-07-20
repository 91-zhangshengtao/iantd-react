import React from 'react';
import './styles/index.scss';
import Input from './components/Input';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
function App() {
    return (React.createElement("div", { className: "App", style: { paddingLeft: "0px", paddingTop: "10px" } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-around" } },
            React.createElement(Input, { style: { width: '300px' }, placeholder: "placeholder", onChange: function (e) { return alert(e.target.value + "  changed"); } }),
            React.createElement(Input, { style: { width: '300px' }, placeholder: "disabled input", disabled: true })),
        React.createElement("div", { style: { display: "flex", justifyContent: "space-around" } },
            React.createElement(Input, { style: { width: '300px' }, defaultValue: "prepend text", prepend: "https://" }),
            React.createElement(Input, { style: { width: '300px' }, defaultValue: "google", append: ".com" })),
        React.createElement("div", { style: { display: "flex", justifyContent: "space-around" } },
            React.createElement(Input, { style: { width: '300px' }, placeholder: "input with icon", icon: "search" }),
            React.createElement(Input, { style: { width: '300px' }, defaultValue: "large size", size: "lg" }),
            React.createElement(Input, { style: { width: '300px' }, placeholder: "small size", size: "sm" }))));
}
export default App;
