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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useRef, useState } from 'react';
import axios from 'axios';
import UploadList from './uploadList'; // 进程Progress list 组件
import Dragger from './dragger';
export var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, name = props.name, headers = props.headers, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, drag = props.drag;
    /* useRef */
    var fileInput = useRef(null);
    /* useState */
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1]; // 自定义拓展的file类型(为了进度条取值)
    /* 更新file信息 事件
       - Partial<UploadFile> --可选
       - useState里 可以传function ()=>{return []}  --返回新对象
    */
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    // click 事件( js代码实现点击<input type='file' /> )
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    // file-change 事件
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files); // 上传文件
        if (fileInput.current) {
            fileInput.current.value = ''; // 初始化清空
        }
    };
    // file-remove 事件
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        // 再调用 用户定义的remove事件
        if (onRemove) {
            onRemove(file);
        }
    };
    // file-upload 事件(文件上传会post请求多次)
    var uploadFiles = function (files) {
        var postFiles = Array.from(files); // 转Array类型
        postFiles.forEach(function (file) {
            // 判断beforeUpload事件(外面传进来的 props接收的)
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                // 判断result是个Promise
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    /* post上传文件 */
    var post = function (file) {
        // 自定义拓展的file类型
        var _file = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        };
        /* 合并fileList(合并先前的)
           - fileList setFileList --useState
           - useState里 可以传function解决异步问题  ()=>{return []}
        */
        // 解决异步问题
        setFileList(function (prevList) {
            return __spreadArrays([_file], prevList);
        });
        var formData = new FormData();
        // ------name， data是外部传入的 props接收-------------
        formData.append(name || 'file', file); // name--代表发到后台的文件参数名称
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        // api
        axios.post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            // 上传进度(axios里自带的,下面照写就行)
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                console.log('onUploadProgress：', percentage);
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' });
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            }
        }).then(function (resp) {
            updateFileList(_file, { status: 'success', response: resp.data });
            if (onSuccess) {
                onSuccess(resp.data, file);
            }
            if (onChange) {
                onChange(file);
            }
        }).catch(function (err) {
            updateFileList(_file, { status: 'error', error: err });
            if (onError) {
                onError(err, file);
            }
            if (onChange) {
                onChange(file);
            }
        });
    };
    return (React.createElement("div", { className: "viking-upload-component" },
        React.createElement("div", { className: "viking-upload-input", style: { display: 'inline-block' }, onClick: handleClick },
            drag ?
                React.createElement(Dragger, { onFile: function (files) { uploadFiles(files); } }, children) :
                children,
            React.createElement("input", { className: "viking-file-input", style: { display: 'none' }, ref: fileInput, onChange: handleFileChange, type: "file" // type = 'file'
                , accept: accept, multiple: multiple })),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
    name: 'file'
};
export default Upload;
