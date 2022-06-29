
import { keeperService }  from "../services/keeper-service.js"

import noteList from "../cmps/note-list.cmp.js";
// import notePreview from "../cmps/notes-preview.cmp.js";


export default {

    template: `
        <section class="notes-app">
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
        }
    },

    created() {
        keeperService.query().then(notes => this.notes = notes )
    },

    components:{
        // notePreview,   
        noteList,   
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
    },
    computed: {
        pinnedNotes(){
            var notes = this.notes
            notes = notes.filter(note => (!note.isTrash && note.isPinned))
            console.log('notes to show', notes )
            return notes
        },
        unPinnedNotes(){
            var notes = this.notes
            notes = notes.filter(note => (!note.isTrash && !note.isPinned))
            console.log('notes to show', notes )
            return notes
        }
    },
    unmounted() {
    },

}