/**
 *
 * @param {string} key
 * @param {*} value
 * @return {void}
 */
export const setToLocalStorage = (key, value) => {
    const stringifyValue = JSON.stringify(value);
    window.localStorage.setItem(key, stringifyValue);
}

/**
 * Get an item in localStorage
 * @param {string} key
 * @returns {*}
 */
export const getToLocalStorage = (key) => {
    const item = window.localStorage.getItem(key);
    return JSON.parse(item);
}