
import { keeperService }  from "../services/keeper-service.js"

import noteAdd from "../cmps/note-add.cmp.js";
import noteList from "../cmps/note-list.cmp.js";
import noteFilter from "../cmps/note-filter.cmp.js";
import noteNav from "../cmps/note-nav.cmp.js";
import noteEdit from "../views/note-edit.cmp.js";



export default {

    template: `
        <section class="grid-container ">

        <!-- <h1>hello</h1> -->

            <div class="side-nav">
                <note-nav />
            </div>
            
            <div class="notes-app">   
                <note-filter @filtered="setFilter"></note-filter>
                <hr>
                <note-add @addNote="addNote"/>
                
               
                <div v-if="noteToEdit">
                    <div v-if="noteToEdit" class="main-screen"></div>
                    <note-edit v-if="noteToEdit" :note="noteToEdit" @clearEditNote="clearEditNote"/> 
                </div> 

                <h1 class="pin-note-heading"><i class="fa-solid fa-thumbtack"></i> Pinned</h1>

                <note-list :notes="pinnedNotes" 
                @editNote="editNote"
                @editProp="editProp"
                @duplicateNote = "duplicateNote"
                />
                <hr>
              

                <note-list :notes="unPinnedNotes" 
                @editNote="editNote"
                @editProp="editProp"
                @duplicateNote = "duplicateNote"
                />

                <!-- <note-list :notes="unPinnedNotes" 
                @editNote="editNote"
                @editProp="editProp"
                @duplicateNote = "duplicateNote"
                   />  -->
             </div>
        </section>
        `,
    
    data() {
        return {
            notes: null,
            filterBy: null,
            noteToEdit: null,
        }
    },

    created() {
        keeperService.query().then(notes => this.notes = notes )
    },

    components:{
        noteList,   
        noteFilter,
        noteAdd,
        noteNav,
        noteEdit,
    },
    methods: {
<<<<<<< HEAD
        editNote(editPram, note) {
            /* console.log('edit from app', editPram, note); */
=======
        editNote(note){
            console.log('recived note', note)
            this.noteToEdit = note

        },
        clearEditNote(note){
            console.log('clearing note to Edit')
            this.noteToEdit = null
            keeperService.query().then(notes => this.notes = notes )
        },
        editProp(editPram, note) {
            console.log('edit prop from app', editPram, note);
>>>>>>> 572d5565ea441e94ebdd3cc49d5d49cf8ee2a459
            keeperService.edit(editPram, note)
        },
        duplicateNote(note) {
           /*  console.log('duplicating from app', note); */
            keeperService.duplicate(note)
            this.notes.unshift(note)
        },
        setFilter(filterBy){
            /* console.log('filterBy', filterBy) */
            this.filterBy = filterBy
    
          },
        addNote(note){
<<<<<<< HEAD
            /* console.log('adding note app', note), */
            keeperService.save(note).then(note => this.notes.unshift(note) )
=======
            keeperService.query().then(notes => this.notes = notes )
            // console.log('adding note app', note)
            // const noteToAdd = note.then(not)
            // this.notes.unshift(note) 
>>>>>>> 572d5565ea441e94ebdd3cc49d5d49cf8ee2a459
            
        }
    },
    computed: {
        pinnedNotes(){
            var notes = this.notes
            if(!notes) return
            notes = notes.filter(note => (!note.isTrash && note.isPinned))
            if (this.filterBy?.label) {
                notes = notes.filter(note => 
                    note.info.label === this.filterBy.label)
            }
            if (this.filterBy?.txt ) {
                notes = notes.filter(note => ( (note.info.txt && note.info.txt.startsWith(this.filterBy.txt) )||
                                           ( note.info.title && note.info.title.startsWith(this.filterBy.txt))
                                            ))
            }
            if (this.filterBy?.type) {
                notes = notes.filter(note => 
                    note.type === this.filterBy.type)
            }
            /* console.log('notes to show', notes ) */
            return notes
        },
        unPinnedNotes(){
            var notes = this.notes
            if(!notes) return
            notes = notes.filter(note => (!note.isTrash && !note.isPinned))
            if (this.filterBy?.label) {
                notes = notes.filter(note => 
                    note.info.label === this.filterBy.label)
            }
            if (this.filterBy?.txt ) {
                    notes = notes.filter(note => ( (note.info.txt && note.info.txt.startsWith(this.filterBy.txt) )||
                                               ( note.info.title && note.info.title.startsWith(this.filterBy.txt))
                                                ))
            }
            if (this.filterBy?.type) {
<<<<<<< HEAD
                notes = notes.filter(note => 
                    note.type === this.filterBy.type)
            }
          /*   console.log('notes to show', notes ) */
=======
                 notes = notes.filter(note => 
                note.type === this.filterBy.type)
                    }
                    console.log('notes to show', notes )
>>>>>>> 572d5565ea441e94ebdd3cc49d5d49cf8ee2a459
            return notes
            
        },
    },
    unmounted() {
    },

}