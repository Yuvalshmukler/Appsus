import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage-service.js';


export const emailService = {
    query,
    getEmailById,
    remove,
    createNewEmail,
    updateReading,
    addFromNote,
    save,
}
const EMAIL_KEY = 'emails'
const emailsDB = utilService.loadFromStorage(EMAIL_KEY) || _createEmails()


/////// from Note//////

function addFromNote(note) {
    console.log('email service adding note', note)
    return
}




function query() {
    return Promise.resolve(emailsDB)
}
function getEmailById(emailId) {

    const email = emailsDB.find(email => email.id === emailId)
    return Promise.resolve(email)
}
function createNewEmail(emailDetails) {
    const email = {
        id: utilService.makeId(),
        sender: emailDetails.sender,
        subject: emailDetails.subject,
        body: emailDetails.body,
        isRead: false,
        sentAt: Date.now(),
        boxes: emailDetails.boxes
    }
    /* console.log('email',email); */
    return save(email)
}
function save(email) {
    console.log('saving', email)
    if (email.id) return storageService.put(EMAIL_KEY, email)
    else return storageService.post(EMAIL_KEY, email)
}

function _createEmail(sender = utilService.createWord(6)) {
    return {
        id: utilService.makeId(),
        sender: sender,
        subject: utilService.makeLorem(utilService.getRandom(2, 3)),
        body: utilService.makeLorem(utilService.getRandom(100, 210)),
        sentAt: new Date(),
        isRead: (Math.random() < 0.5),
        emailAdress: `${sender}${utilService.getRandom(4, 7)}@gmail.com`,
        boxes: {
            inbox: true,
            sentBox: false,
            draft: false,
            star: false,
        }
    }
}

function _createEmails() {
    const senders =
        ['Aviram', 'Uber', 'Guy', 'Alon', 'Microsoft', 'Pango',
            'Denies', 'Tal', 'Linkdin', 'Google', 'GutHub', 'Zoom',
            'Tal', 'Alen', 'Aviram', 'Google', 'Pango', 'Linkdin',
            'Spotify', 'Linkdin', 'Tal', 'Drobox']
    const emails = senders.map(_createEmail)
    console.log(emails);
    utilService.saveToStorage(EMAIL_KEY, emails)
    return emails
}

/* LATER */
function remove(emailId) {
    // return Promise.reject('Big Error Badd')
    return storageService.remove(EMAIL_KEY, emailId)
}


function updateReading(emailId) {
    const idx = emailsDB.findIndex((email) => email.id === emailId)
    emailsDB[idx].isRead = true
    utilService.saveToStorage(EMAIL_KEY, emailsDB)
    const emails = utilService.loadFromStorage(EMAIL_KEY)
    /* console.log('from service', emails); */
    return emails
}

////// for all changes
function updateEmail(emailId, prop, value) {
    const idx = emailsDB.findIndex((email) => email.id === emailId)
    emailsDB[idx].prop = value
    utilService.saveToStorage(EMAIL_KEY, emailsDB)
    const emails = utilService.loadFromStorage(EMAIL_KEY)
    /* console.log('from service', emails); */
    return emails
}

