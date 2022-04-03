
export const setToLocalStorage = (key, value) => {
    const stringifyValue = JSON.stringify(value);
    window.localStorage.setItem(key, stringifyValue);
}

export const getToLocalStorage = (key) => {
    const item = window.localStorage.getItem(key);
    return JSON.parse(item);
}