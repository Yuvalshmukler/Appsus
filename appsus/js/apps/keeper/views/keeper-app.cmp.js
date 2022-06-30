
import { keeperService }  from "../services/keeper-service.js"

import noteList from "../cmps/note-list.cmp.js";
import noteFilter from "../cmps/note-filter.cmp.js";



export default {

    template: `
        <section class="notes-app">
        <note-filter @filtered="setFilter"></note-filter>
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
    },
    methods: {
        editNote(editPram, note) {
            console.log('edit from app', editPram, note);
            keeperService.edit(editPram, note)
        },
        duplicateNote(note) {
            console.log('duplicating from app', note);
            keeperService.duplicate(note)
            this.notes.push(note)
        },
        setFilter(filterBy){
            console.log('filterBy', filterBy)
            this.filterBy = filterBy
    
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
            console.log('notes to show', notes )
            return notes
        }
    },
    unmounted() {
    },

}