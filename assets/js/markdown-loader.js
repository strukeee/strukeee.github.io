// markdown-loader.js - Markdown文件加载器组件
(function() {
    'use strict';

    // 全局MarkdownLoader对象
    window.MarkdownLoader = {
        /**
         * 加载并渲染Markdown文件
         * @param {string} filePath - Markdown文件的路径
         * @param {string} containerId - 容器元素的ID，默认为'markdown-container'
         * @returns {Promise} 包含加载结果的Promise
         */
        load: function(filePath, containerId = 'markdown-container') {
            const container = document.getElementById(containerId);
            if (!container) {
                console.error(`容器 ${containerId} 不存在`);
                return Promise.reject(`容器 ${containerId} 不存在`);
            }

            container.innerHTML = '<div class="loading">正在加载内容...</div>';

            return fetch(filePath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP错误! 状态码: ${response.status}`);
                    }
                    return response.text();
                })
                .then(text => {
                    if (typeof marked !== 'undefined') {
                        container.innerHTML = marked.parse(text);
                    } else {
                        // 如果marked库不可用，直接显示原始文本
                        container.textContent = text;
                    }
                    return text;
                })
                .catch(error => {
                    console.error('加载Markdown文件失败:', error);
                    container.innerHTML = `<div class="error">加载失败: ${error.message}</div>`;
                    throw error;
                });
        },

        /**
         * 设置加载中显示的内容
         * @param {string} html - 加载中显示的HTML
         */
        setLoadingHTML: function(html) {
            this.loadingHTML = html;
        },

        /**
         * 设置错误显示的内容
         * @param {string} html - 错误时显示的HTML
         */
        setErrorHTML: function(html) {
            this.errorHTML = html;
        }
    };
})();