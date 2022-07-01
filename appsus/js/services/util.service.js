export const utilService = {
    saveToStorage,
    loadFromStorage,
    makeId,
    createWord,
    getRandom,
    makeLorem,
}

function saveToStorage(key, value) {
    /* console.log('saving to storage', key) */
    localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
   /*  console.log('loading from storage', key) */
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


function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function _getRandChar() {
    var LETTERS = 'abcdefghijklmnopqrstuvwxyz';
    var randIndex = parseInt(Math.random() * LETTERS.length)
    return LETTERS.charAt(randIndex);
}
function createWord(length) {
    var word = '';
    while (word.length < length) {
        var randChar = _getRandChar();
        word += randChar;
    }
    return word;
}

function makeLorem(wordCount = 100) {
    const words = ['New job', 'Tomorrow', 'My team', 'Found', 'Job', 
    'Sell', 'New idea', 'All', 'Right', 'Fly', 'Vcation', '.', 
    'I', 'had', 'Time', 'Option', ' Various', 'And', 'Generally', 'Happens', 'The time',
     'it', 'was', 'Different story', 'Login', 'We want', 'Yesterday', 'A pleasure', 'to', 'Yes']
    var txt = ''
    while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}
