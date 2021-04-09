/**
 * @file 扩展Element的错误提示message组件(多行内容)
 */

import Message from 'element-plus';

export default function Toast(msg, option = {}) {
    let time = 3000;
    if (!isNaN(option.duration)) {
        time = option.duration;
    }

    const type = typeof option === 'string' ? option : (option.type || 'warning');

    Message({
        type,
        message: msg,
        duration: time,
    });
}
