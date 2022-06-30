
import notePreview from "../cmps/notes-preview.cmp.js";


export default {

    props: ["notes"],

    template: `
        <section class="notes-app">
            <!-- <pre>{{notes}}</pre> -->
         <ul class="notes-preview-container">
            <li v-for="(note,idx) in notes" :key="note.id" class="note-preview"  >
                <p class="pin" v-if="note.isPinned"><i class="fa-solid fa-thumbtack"></i></p>
                <note-preview :note="note"/> 
                <div class="actions">
                       <p @click="edit('isTrash', note)"><i class="fa-solid fa-trash-can"></i></p>
                       <p @click="duplicate(note)"><i class="fa-solid fa-copy"></i></p>
                       <p @click="edit('isPinned', note)"><i class="fa-solid fa-thumbtack"></i></p>
                       <p><i class="fa-solid fa-pen-to-square"></i></p>
                       <p><i class="fa-solid fa-palette"></i></p>
                </div>  
            </li>
        </ul>
        </section>
        `,
    
    data() {
        return {
           
        }
    },

    created() {
        
    },

    components:{
        notePreview,    
    },
    methods: {
        edit(editPram, note){
            console.log('emit edit')
            this.$emit('editNote', editPram, note)
        },
        duplicate(note){
            console.log('emit duplicate')
            this.$emit('duplicateNote', note)
        },
     
    },
    computed: {
     
    },
    unmounted() {
    },

}