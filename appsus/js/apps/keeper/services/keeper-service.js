import {utilService} from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage-service.js'

// import { storageService } from '../../services/async-storage-service.js';


const NOTES_KEY = 'notesDB'

_createNotes()

export const keeperService = {
    query,
    edit,
    remove,
    get,
    save,
    duplicate,
    
}

function query() {
  console.log('query')
  return storageService.query(NOTES_KEY)
       
}


function edit(editPram, note){
  console.log('edit service', editPram, note)
  note[editPram] = true
  save(note)

}

function duplicate(note){
  console.log('duplicate service', note)
  note.id = utilService.makeId()
  storageService.post(NOTES_KEY, note)

}

function remove(noteId) {
  // return Promise.reject('Big Error Badd')
  return storageService.remove(NOTES_KEY, noteId)
}

function get(noteId) {
  return storageService.get(NOTES_KEY, noteId)
}

function save(note) {
  if (note.id) return storageService.put(NOTES_KEY, note)
  else return storageService.post(NOTES_KEY, note)

}

function _createNotes(){
    console.log('creating notes')
    let notes = utilService.loadFromStorage(NOTES_KEY);
    if (!notes || !notes.length) {
      notes = getNotes() 
      utilService.saveToStorage(NOTES_KEY, notes) }
    console.log(notes)
    return notes
}



function getNotes()  {
    console.log('getting notes')
    return [
              {
              id: utilService.makeId(),
              type: "note-txt",
              isPinned: true,
              info: {
                txt: "Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning. | Albert Einstein",
                label: 'empowering',
                },
              },

              {
              id: utilService.makeId(),
              type: "note-img",
              info: {
                url: "https://globalholidaylocations.com/wp-content/uploads/2022/04/Vacation.jpg",
                title: "Just 2 more month...",
                label: 'vacation',
                },
              style: {
              backgroundColor: "#00d"
                },
              },

              {
              id: utilService.makeId(),
              type: "note-todos",
              info: {
                label: "Stuff I need to do",
                todos: [
                  { txt: "Pay thw water bill", doneAt: null },
                  { txt: "Take the washing machine fixed", doneAt: 187111111 },
                  { txt: "Call Mom", doneAt: 187111111 },
                  ],
                  label: 'important',
                },
              },
              {
                id: utilService.makeId(),
                type: "note-video",
                isPinned: true,
                info: {
                  url: "https://www.youtube.com/embed/tgbNymZ7vqY",
                  title: "This is a funny one",
                  label: 'important',
                  },
                },
                {
                  id: utilService.makeId(),
                  type: "note-txt",
                  isPinned: true,
                  info: {
                    txt: "Once we accept our limits, we go beyond them. | Albert Einstein",
                    label: 'important',
                    }
                  },
    
                  {
                  id: utilService.makeId(),
                  type: "note-img",
                  info: {
                    url: "https://stopandgo-hue.com/wp-content/uploads/2016/11/phoco.jpg",
                    title: "Coming soon...",
                    label: 'vacation',
                    },
                  style: {
                  backgroundColor: "#00d"
                    }
                  },
    
                  {
                  id: utilService.makeId(),
                  type: "note-todos",
                  info: {
                    label: "Grocery Shooping",
                    todos: [
                      { txt: "Banans", doneAt: null },
                      { txt: "Milk", doneAt: 187111111 },
                      { txt: "Bread", doneAt: 187111111 },
                      { txt: "Cheese", doneAt: 187111111 },
                    ],
                    label: 'important',
                    }
                  },
                
        
                      {
                      id: utilService.makeId(),
                      type: "note-img",
                      info: {
                        url: "https://static3.bigstockphoto.com/2/1/3/large1500/312082948.jpg",
                        title: "Take a deep breath",
                        label: 'empowering',
                        },
                      style: {
                      backgroundColor: "#00d"
                        }
                      },
        
                     
          ]
}