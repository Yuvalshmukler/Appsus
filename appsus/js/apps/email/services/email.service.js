import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage-service.js';


export const emailService = {
    query,
    getEmailById,
    remove,
}
const EMAIL_KEY ='emails'
const emailsDB = utilService.loadFromStorage(EMAIL_KEY) || _createEmails()


function query(){
    return Promise.resolve(emailsDB)
}
function getEmailById(emailId) {

    const email = emailsDB.find(email => email.id === emailId)
    return Promise.resolve(email)
}

function _createEmails() {
    const senders = 
        ['Aviram', 'Uber', 'Guy', 'Alon', 'Microsoft', 'Pango',
         'Denies','Tal', 'Linkdin', 'Google', 'GutHub', 'Zoom',
         'Tal', 'Alen','Aviram', 'Google', 'Pango', 'Linkdin', 
         'Spotify','Linkdin', 'Tal', 'Drobox']
    const emails = senders.map(_createEmail)
    console.log(emails);
    utilService.saveToStorage(EMAIL_KEY, emails)
    return emails
}

function _createEmail(sender = utilService.createWord(6)) {
    return {
        id: utilService.makeId(),
        sender: sender,
        subject: utilService.makeLorem(utilService.getRandom(2,3)),
        body: utilService.makeLorem(utilService.getRandom(100, 210)),
        sentAt:  new Date(),
        isRead: false,
        emailAdress: `${sender}gh@gmail.com`,
        boxes: {
            inbox: true,
            sentBox: false,
            draft: false,
            note: false
        }
    }
}

function remove(bookId) {
    // return Promise.reject('Big Error Badd')
    return storageService.remove(EMAIL_KEY, bookId)
}
