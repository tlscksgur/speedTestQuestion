/**
 * Deep Clone
 */

function deepClone(data) {
    if (data === null || typeof data !== 'object') {
        return data;
    }

    if (Array.isArray(data)) {
        return data.map(item => deepClone(item));
    }

    const clonedObj = {};
    for (let key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            clonedObj[key] = deepClone(data[key]);
        }
    }
    return clonedObj;
}





