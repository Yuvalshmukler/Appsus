
import { keeperService }  from "../services/keeper-service.js"
import { emailService }  from "../../email/services/email.service.js"
import { eventBus } from '../../../services/eventBus-service.js';

import noteAdd from "../cmps/note-add.cmp.js";
import noteList from "../cmps/note-list.cmp.js";
import noteFilter from "../cmps/note-filter.cmp.js";
import noteNav from "../cmps/note-nav.cmp.js";
import noteEdit from "../views/note-edit.cmp.js";



export default {

    template: `
        <section class="keeper-grid-container ">

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
                    <note-edit v-if="noteToEdit" :note="noteToEdit" 
                            @updateNote="updateNote"
                            @clearEditNote="clearEditNote"/> 
                </div> 

                <h1 class="pin-note-heading"><i class="fa-solid fa-thumbtack"></i> Pinned</h1>

                <note-list :notes="pinnedNotes" 
                @editNote="editNote"
                @editProp="editProp"
                @duplicateNote = "duplicateNote"
                @unpin="unpin"
                @sendEmail = "sendEmail"
                />
                <hr>           
                <note-list :notes="unPinnedNotes" 
                @editNote="editNote"
                @editProp="editProp"
                @duplicateNote = "duplicateNote"
                @unpin="unpin"
                @sendEmail = "sendEmail"
                />

                
             </div>
        </section>
        `,
    
    data() {
        return {
            notes: null,
            filterBy: {
                label: "",
                txt: "",
                type:  "",
              },
            noteToEdit: null,
        }
    },

    created() {
        keeperService.query().then(notes => this.notes = notes )
        this.unsubscribe = eventBus.on('filter-nav', this.filterNav)
    },

    components:{
        noteList,   
        noteFilter,
        noteAdd,
        noteNav,
        noteEdit,
    },
    methods: {
        editNote(note){
            this.noteToEdit = note
        },
        updateNote(note){
            keeperService.save(note)
                    .then(note => 
                        {var idx = this.notes.findIndex(n => n.id === note.id)
                           this.notes[idx] = note } )      
            this.noteToEdit = null
           
        },
        editProp(editPram, note) {
            keeperService.edit(editPram, note)
        },
        duplicateNote(note) {
            keeperService.duplicate(note).then(note => this.notes.unshift(note) )
        },
        setFilter(filterBy){
            this.filterBy = filterBy   
        },
        addNote(note){
            keeperService.save(note).then(note => this.notes.unshift(note) )         
        },
        filterNav(filterBy){
            if(!filterBy.value) this.filterBy[filterBy.by] = ''
            this.filterBy[filterBy.by] = filterBy.value
        },
        clearEditNote(note){
            this.noteToEdit = null
            keeperService.query().then(notes => this.notes = notes )
        },
        unpin(note){
            note.isPinned = false
            keeperService.save(note)
            .then(note => 
                {var idx = this.notes.findIndex(n => n.id === note.id)
                   this.notes[idx] = note } )   
        },
        sendEmail(note){
            emailService.addFromNote(note)           
        },
        filterNotes(){
            var notes = this.notes
             if(!notes) return
            notes = notes.filter(note => (!note.isTrash))
            if (this.filterBy?.label) {
                notes = notes.filter(note => 
                    note.info.label === this.filterBy.label)
            }
            if (this.filterBy?.txt ) {
                const regex = new RegExp(this.filterBy.txt, "i");
               notes = notes.filter(note => (regex.test(note.info.txt) || regex.test(note.info.title)))    
            }
            if (this.filterBy?.type) {
                notes = notes.filter(note => 
                    note.type === this.filterBy.type)
            } 
            return notes

        }
    },
    computed: {
        pinnedNotes(){
            var notes = this.filterNotes()
            if(!notes) return
            notes = notes.filter(note => (note.isPinned))
            return notes
        },
        unPinnedNotes(){
            var notes = this.filterNotes()
            if(!notes) return
            notes = notes.filter(note => (!note.isPinned))
            return notes          
        },
    },
    unmounted() {
        this.unsubscribe()
    },

}