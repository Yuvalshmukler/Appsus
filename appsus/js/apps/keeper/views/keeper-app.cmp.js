
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
        editNote(editPram, note) {
            /* console.log('edit from app', editPram, note); */
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
            /* console.log('adding note app', note), */
            keeperService.save(note).then(note => this.notes.unshift(note) )
            
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
                notes = notes.filter(note => 
                    note.type === this.filterBy.type)
            }
          /*   console.log('notes to show', notes ) */
            return notes
            
        },
    },
    unmounted() {
    },

}