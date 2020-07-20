var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useState, useEffect } from 'react';
import './styles/index.scss';
import axios from 'axios';
import Progress from './components/Progress';
import Upload from './components/Upload';
import Icon from './components/Icon';
/* fontawesome --Build a Library */
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; // fas 所有类型集合
import { fab } from '@fortawesome/free-brands-svg-icons'; // fab 所有类型集合
// library.add(aCheckSquare, faCoffee)
library.add(fas, fab);
var App = function () {
    var _a = useState(''), title = _a[0], setTitle = _a[1];
    useEffect(function () {
        function awaitFunction() {
            return __awaiter(this, void 0, void 0, function () {
                var res, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, axios.get('http://jsonplaceholder.typicode.com/posts?userId=1', {
                                    headers: { 'X-Requested-With': 'XMLHttpRequest' }
                                })];
                        case 1:
                            res = _a.sent();
                            console.log('res:', res);
                            setTitle(res.data[1].title);
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.log(error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        awaitFunction();
    }, []);
    var handleFileChange = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var files, uploadedFile, formData, res, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    files = e.target.files;
                    if (!files) return [3 /*break*/, 2];
                    uploadedFile = files[0];
                    formData = new FormData() // xhr2
                    ;
                    formData.append(uploadedFile.name, uploadedFile);
                    return [4 /*yield*/, axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })];
                case 1:
                    res = _a.sent();
                    console.log('file-res:', res);
                    _a.label = 2;
                case 2: return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    /* beforeUpload 事件 */
    // boolean
    var checkFileSize = function (file) {
        if (Math.round(file.size / 1024) > 50) {
            alert('file too big');
            return false;
        }
        return true;
    };
    // Promise<File>
    // 重命名
    var filePromise = function (file) {
        var newFile = new File([file], 'new_name.docx', { type: file.type });
        return Promise.resolve(newFile);
    };
    return (React.createElement("div", { className: "App", style: { padding: "10px 10px", width: "800px" } },
        React.createElement("div", null,
            React.createElement("h1", null,
                "title: ",
                title)),
        React.createElement("div", { style: { border: "1px solid #ccc" } },
            React.createElement("h1", null, "Process\u7EC4\u4EF6"),
            React.createElement("div", null,
                React.createElement(Progress, { percent: 30 || 0, strokeHeight: 15, showText: true, 
                    // styles?: React.CSSProperties;
                    theme: "info" }))),
        React.createElement("div", { style: { border: "1px solid #ccc" } },
            React.createElement("h1", null, "form\u8868\u5355\u6587\u4EF6\u4E0A\u4F20"),
            React.createElement("form", { encType: "multipart/form-data", action: "https://jsonplaceholder.typicode.com/posts", method: "post" },
                React.createElement("input", { type: "file", name: "file" }),
                React.createElement("input", { type: "submit", value: "Upload" })),
            React.createElement("h1", null, "\u501F\u52A9js\u6587\u4EF6\u4E0A\u4F20"),
            React.createElement("input", { type: "file", name: "file", onChange: handleFileChange })),
        React.createElement("div", { style: { border: "1px solid #ccc" } },
            React.createElement("h1", null, "\u975E\u62D6\u62FD Upload \u7EC4\u4EF6 "),
            React.createElement(Upload
            // headers={{'Content-Type': 'multipart/form-data'}}
            , { 
                // headers={{'Content-Type': 'multipart/form-data'}}
                action: "https://www.mocky.io/v2/5cc8019d300000980a055e76", onChange: function (file) { return console.log('onChange:', file); }, onSuccess: function (data, file) { return console.log('onSuccess:', data, file); }, onError: function (error, file) { return console.log('onError:', error, file); }, onRemove: function (file) { return console.log('onRemove:', file); }, 
                // beforeUpload={checkFileSize} // checkFileSize / filePromise
                name: "fileName112233", multiple: true }, "\u4E0A\u4F20")),
        React.createElement("div", { style: { border: "1px solid #ccc" } },
            React.createElement("h1", null, "\u62D6\u62FD\u60C5\u51B5 Upload\u7EC4\u4EF6"),
            React.createElement(Upload
            // headers={{'Content-Type': 'multipart/form-data'}}
            , { 
                // headers={{'Content-Type': 'multipart/form-data'}}
                action: "https://www.mocky.io/v2/5cc8019d300000980a055e76", onChange: function (file) { return console.log('onChange:', file); }, onSuccess: function (data, file) { return console.log('onSuccess:', data, file); }, onError: function (error, file) { return console.log('onError:', error, file); }, onRemove: function (file) { return console.log('onRemove:', file); }, 
                // beforeUpload={checkFileSize} // checkFileSize / filePromise
                name: "fileName112233", multiple: true, 
                // accept="image/*"
                drag: true },
                React.createElement(Icon, { icon: "upload", size: "5x", theme: "secondary" }),
                React.createElement("br", null),
                React.createElement("p", null, "Drag file over to upload")))));
};
export default App;
