import { utilService } from '../../../services/util.service.js'


export const emailService = {
    query,
}
const EMAIL_KEY ='emails'
const emailsDB = utilService.loadFromStorage(EMAIL_KEY) || _createEmails()


function query(){
    return Promise.resolve(emailsDB)
}
function _createEmails() {
    const senders = 
        ['Aviram', 'Uber', 'Guy', 'Alon', 'Microsoft', 'Pango',
         'Denies','Tal', 'Linkdin', 'Google', 'GutHub', 'Zoom',
         'Tal', 'Alen','Aviram', 'Google', 'Pango', 'Linkdin', 
         'Spotify','Linkdin', 'Tal', 'Drobox']
    const emails = senders.map(_createEmail)
    utilService.saveToStorage(EMAIL_KEY, emails)
    return emails
}

function _createEmail(sender = utilService.createWord(6)) {
    return {
        id: utilService.makeId(),
        sender: sender,
        subject: utilService.makeLorem(utilService.getRandom(4, 20)),
        body: utilService.makeLorem(utilService.getRandom(100, 400)),
        sentAt: Date.now(),
        isRead: false,
        boxes: {
            inbox: true,
            sentBox: false,
            draft: false,
            note: false
        }
    }
}
