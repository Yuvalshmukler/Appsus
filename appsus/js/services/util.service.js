export const utilService = {
    saveToStorage,
    loadFromStorage,
    makeId
}

function saveToStorage(key, value) {
    console.log('saving to storage', key)
    localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
    console.log('loading from storage', key)
    let data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}