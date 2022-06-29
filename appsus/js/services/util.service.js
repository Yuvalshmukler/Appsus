export const utilService = {
    saveToStorage,
    loadFromStorage,
    makeId,
    createWord,
    getFormattedNowDate,
    getRandom,
    makeLorem,
}
let words = []

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
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
function createWord(length) {
    var word = '';
    while (word.length < length) {
        var randChar = _getRandChar();
        word += randChar;
    }
    return word;
}

function getFormattedNowDate() {
    const date = new Date();
    const year = date.getFullYear().toString()
    let month = (date.getMonth() + 1).toString()
    let day = date.getDate().toString()
    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day
    return year + '-' + month + '-' + day
}
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function makeLorem(length) {
    var randStr = '';
    while (randStr.length < length) {
        var word = words[getRandom(1, 28)];
        randStr += word + ' ';
    }
    randStr = randStr[0].toUpperCase() + randStr.substr(1)
    return randStr;
}
function _getRandChar() {
    var LETTERS = 'abcdefghijklmnopqrstuvwxyz';
    var randIndex = parseInt(Math.random() * LETTERS.length)
    return LETTERS.charAt(randIndex);
}
