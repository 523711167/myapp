


// 辅助函数，只有当值存在时才添加属性
export const addIfExists = (obj, key, value) => {
    if (value !== undefined && value !== null && value !== '') {
        obj[key] = value;
    }
    return obj;
};