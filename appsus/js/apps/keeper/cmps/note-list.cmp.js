
import notePreview from "../cmps/notes-preview.cmp.js";


export default {

    props: ["notes"],

    template: `
        <section class="notes-app">
         <ul class="notes-preview-container">
            <li v-for="(note,idx) in notes" :key="note.id" class="note-preview"  >
                <note-preview :note="note"/> 
                <div class="actions">
                       <button @click="edit('isTrash', note)">Trash</button>
                       <button @click="duplicate(note)">Duplicate</button>
                       <button @click="edit('isPinned', note)">Pin</button>
                       <button>Update</button>
                       <button>Change bg</button>
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