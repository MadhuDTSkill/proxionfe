

export const setJsonData = (key, value) => {
    jsonValue = JSON.parse(value);
    localStorage.setItem(key, jsonValue)
}

export const getJsonData = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const setData = (key, value) => {
    localStorage.setItem(key, value)
}

export const getData = (key) => {
    return localStorage.getItem(key)
}