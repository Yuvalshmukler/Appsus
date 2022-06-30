
import { keeperService }  from "../services/keeper-service.js"

import noteAdd from "../cmps/note-add.cmp.js";
import noteList from "../cmps/note-list.cmp.js";
import noteFilter from "../cmps/note-filter.cmp.js";



export default {

    template: `
        <section class="grid-container">
            <div class="side-nav">
                <h1>im a side nav</h1>
            </div>

            <div class="notes-app">    
                <note-filter @filtered="setFilter"></note-filter>
                <note-add @addNote="addNote"/>
                    <h1>Pinned</h1>
                    <hr>
                    <note-list :notes="pinnedNotes" 
                            @editNote="editNote"
                            @duplicateNote = "duplicateNote"
                            />
                    <hr>
                    <note-list :notes="unPinnedNotes" 
                            @editNote="editNote"
                            @duplicateNote = "duplicateNote"
                            />
             </div>
        </section>
        `,
    
    data() {
        return {
            notes: null,
            filterBy: null,
        }
    },

    created() {
        keeperService.query().then(notes => this.notes = notes )
    },

    components:{
        noteList,   
        noteFilter,
        noteAdd,
    },
    methods: {
        editNote(editPram, note) {
            console.log('edit from app', editPram, note);
            keeperService.edit(editPram, note)
        },
        duplicateNote(note) {
            console.log('duplicating from app', note);
            keeperService.duplicate(note)
            this.notes.unshift(note)
        },
        setFilter(filterBy){
            console.log('filterBy', filterBy)
            this.filterBy = filterBy
    
          },
        addNote(note){
            console.log('adding note app', note),
            keeperService.save(note)
            this.notes.unshift(note)
        }
    },
    computed: {

        pinnedNotes(){
            var notes = this.notes
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
            console.log('notes to show', notes )
            return notes
        },
        unPinnedNotes(){
            var notes = this.notes
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
            console.log('notes to show', notes )
            return notes
        }
    },
    unmounted() {
    },

}