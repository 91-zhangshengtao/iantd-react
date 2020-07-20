import React from 'react';
import './styles/index.scss';
// import Input from './components/Input'
import AutoComplete from './components/AutoComplete';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
// import { mockChannel } from '@storybook/addons'
library.add(fas);
function App() {
    // 自定义下拉选项模板
    var renderOption = function (item) {
        var itemWithGithub = item;
        return (React.createElement(React.Fragment, null,
            React.createElement("h2", null,
                "\u540D\u79F0: ",
                itemWithGithub.value)));
    };
    // fetch
    var handleFetch = function (query) {
        // api 
        // return fetch(`https://api.github.com/search/users?q=${query}`)
        //   .then(res => res.json())
        //   .then(({ items }) => {
        //     console.log(items)
        //     return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
        //   })
        // mock
        var MockData = [
            { value: 'bradley', number: 11 },
            { value: 'pope', number: 1 },
            { value: 'caruso', number: 4 },
            { value: 'cook', number: 2 },
            { value: 'cousins', number: 15 },
            { value: 'james', number: 23 },
            { value: 'AD', number: 3 },
            { value: 'green', number: 14 },
            { value: 'howard', number: 39 },
            { value: 'kuzma', number: 0 },
        ];
        return MockData.slice(0, 10).filter(function (item) { return item.value.indexOf(query) > -1; });
    };
    return (React.createElement("div", { className: "App", style: { paddingLeft: "0px", paddingTop: "10px" } },
        React.createElement("div", { style: { display: "flex", justifyContent: "flex-start" } },
            "AutoComplete\uFF1A",
            React.createElement(AutoComplete, { style: { width: "300px" }, fetchSuggestions: handleFetch, onSelect: function (e) { return alert(e.value + "  selected"); }, renderOption: renderOption }))));
}
export default App;
