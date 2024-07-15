/// <reference types="vite/client" />
/// <reference types="chrome-types/index" />


interface Window {
    // douyinHandle: import('electron').IpcRenderer;
    douyinCore: import('./type').TypeByDouyinCore;
    injectUtils: import('./type').TypeByInjectUtils;
    douyinHandle: import('./type').TypeByDouyinHandle;
}