
export const setItem = (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
}


export const getItem = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const removeItem = (key) => {
    localStorage.removeItem(key)
}