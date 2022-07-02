
import notePreview from "../cmps/notes-preview.cmp.js";
import { eventBus } from '../../../services/eventBus-service.js';



export default {

    props: ["notes"],

    template: `
        <section class="notes-app">
            <!-- <pre>{{notes}}</pre> -->
         <ul class="notes-preview-container">
            <li v-for="(note,idx) in notes" :key="note.id" class="note-preview"  >

                <p @click="unpin(note)" class="pin" v-if="note.isPinned"><i class="fa-solid fa-thumbtack"></i></p>

                <note-preview  :style="{'background-color': note.style.backgroundColor}" :note="note"/> 
                <div class="actions">
                       <p @click="editProp('isTrash', note)"><i class="fa-solid fa-trash-can"></i></p>
                       <p @click="duplicate(note)"><i class="fa-solid fa-copy"></i></p>
                       <p @click="editProp('isPinned', note)"><i class="fa-solid fa-thumbtack"></i></p>
                       <p @click="editNote(note)"><i class="fa-solid fa-pen-to-square"></i></p>
                              
                        <p><input class="bg-color-input" type="color" @change="editProp('bgColor', note)" 
                                v-model="note.style.backgroundColor" ></p>
                        <p @click="sendEmail(note)"><i class="fa-solid fa-paper-plane"></i></p>
    
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
        editProp(editPram, note){
            console.log('emit edit', editPram, note)
            this.$emit('editProp', editPram, note)
            var txt = ''
            if (editPram === 'isPinned') txt = 'note was pinned'
            if (editPram === 'bgColor') txt = 'background color was changed'
            if (editPram === 'isTrash') txt = 'note was deleted'
            eventBus.emit('show-msg', { txt, type: 'success' , link: '',})
        },
        duplicate(note){
            console.log('emit duplicate')
            this.$emit('duplicateNote', note)
            eventBus.emit('show-msg', { txt: 'note was duplicated', type: 'success' , link: '',})
        },
        editNote(note){
            console.log('emit edit note', note)
            this.$emit('editNote', note)             
        },
        unpin(note){
            console.log('unpin', note)
            this.$emit('unpin', note)  
        },
        sendEmail(note){
            console.log('sending email', note)
            this.$emit('sendEmail', note)  
        }
     
    },
    computed: {
        display: "none"
     
    },
    unmounted() {
    },

}