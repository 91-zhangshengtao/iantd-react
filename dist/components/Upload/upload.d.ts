import { FC } from 'react';
export declare type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    /** 大小 */
    size: number;
    name: string;
    /** file上传状态 */
    status?: UploadFileStatus;
    /** 百分比 */
    percent?: number;
    /** 原file */
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    /** 接口发送到哪个接口 */
    action: string;
    /** 默认 file自定义拓展的类型 */
    defaultFileList?: UploadFile[];
    /** 上传前 */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /** 上传进程 */
    onProgress?: (percentage: number, file: File) => void;
    /** 上传成功 */
    onSuccess?: (data: any, file: File) => void;
    /** 上传失败 */
    onError?: (err: any, file: File) => void;
    /** file change 事件 */
    onChange?: (file: File) => void;
    /** file remove 事件 */
    onRemove?: (file: UploadFile) => void;
    /** 添加自定义header */
    headers?: {
        [key: string]: any;
    };
    /** 添加自定义name --代表发到后台的文件参数名称 */
    name?: string;
    /** 添加自定义post formData */
    data?: {
        [key: string]: any;
    };
    /** 是否携带cookie */
    withCredentials?: boolean;
    /** 限制文件类型 */
    accept?: string;
    /** 是否支持上传多个文件 */
    multiple?: boolean;
    /** 是否拖拽文件 */
    drag?: boolean;
}
export declare const Upload: FC<UploadProps>;
export default Upload;
