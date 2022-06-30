import { utilService } from '../../../services/util.service.js'


export const emailService = {
    query,
    getEmailById,
}
const EMAIL_KEY ='emails'
const emailsDB = utilService.loadFromStorage(EMAIL_KEY) || _createEmails()


function query(){
    return Promise.resolve(emailsDB)
}
function getEmailById(emailId) {
    console.log('hi');
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
    var subject = utilService.makeLorem(3)
    console.log(subject);
    return {
        id: utilService.makeId(),
        sender: sender,
        subject: utilService.makeLorem(utilService.getRandom(2,3)),
        body: utilService.makeLorem(utilService.getRandom(100, 210)),
        sentAt:  new Date(),
        isRead: false,
        boxes: {
            inbox: true,
            sentBox: false,
            draft: false,
            note: false
        }
    }
}