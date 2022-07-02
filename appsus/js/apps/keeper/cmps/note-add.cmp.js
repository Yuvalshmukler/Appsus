
import { keeperService }  from "../services/keeper-service.js"
import { eventBus } from '../../../services/eventBus-service.js';

export default {
    props: [],
    template: `
        <section >
            <button @click="open = !open"  class="add-mobile"><i class="fa-solid fa-plus"></i></button>
            
            <div :class="openAdd" class="note-add">
                <form @submit.prevent="addNote">
                    <button><i class="fa-solid fa-plus"></i></button>        
                    <input type="text" v-model="input.intxt" placeholder="Start typing...">
                    <input v-if="note.type === 'note-img' || note.type === 'note-video'" 
                        type="text" v-model="input.inurl" placeholder="Enter URL...">
                    <br>
                    <div class="todo-list"  v-if="note.type === 'note-todos'">
                        <ul>
                            <li v-for="index in num" :key="index">
                            <input class="todo-list-item"
                                type="text"  v-model="input.intodos[index]" placeholder="◻️ list item...">
                            </li>
                            <p class="plus-list" @click.stop="num++">◻️ +</p>                  
                        </ul>
                    </div>      
                </form> 
        
                <div class="note-add-icon-container">
                    <p :class="isActive('note-txt')" class="note-add-icon"  @click="type('note-txt')"><i class="fa-solid fa-pen"></i></p>
                    <p :class="isActive('note-img')" class="note-add-icon" @click="type('note-img')"><i class="fa-solid fa-image"></i></p>
                    <p :class="isActive('note-video')" class="note-add-icon" @click="type('note-video')"><i class="fa-solid fa-film"></i></p>
                    <p :class="isActive('note-todos')" class="note-add-icon" @click="type('note-todos')"><i class="fa-solid fa-list"></i></p>
                </div>
            <div>
        </section>
        `,
    created(){
        this.emptyNote()
    },

    data() {
      return {
        num: null,
        input:null,
        note: null,
        open: false,
        
      }
    },
    methods: {
        addNote(){
            const {intxt, inurl, intodos} = this.input
            const {type, info } = this.note
            if(!intxt) return
            if (type === 'note-txt') info.txt = intxt
            else if (type === 'note-img' || type === 'note-video') {
                info.title = intxt
                info.url = inurl    }
            else if (type === 'note-todos'){
                info.title = intxt
                for (const todo in intodos) {
                    info.todos.push({txt: intodos[todo], doneAt: null})
                }            
            }
            
            console.log('adding note', this.note)
            keeperService.save(this.note).then(note => this.$emit("addNote", note))
            eventBus.emit('show-msg', { txt: 'new note was added', type: 'success' , link: '',})
            eventBus.emit('render-label', this.note.info.label)        
            this.emptyNote()   
        },
        type(noteType){
            if (this.note.type === noteType ) {
                this.note.type = ''
                return
            }
            this.note.type = noteType
        },
        isActive(noteType){
            if (this.note.type === noteType) return 'active'
            else return ''
        },
        emptyNote(){
            this.note =  {
                id:null,
                type:  "note-txt",
                info: {
                    label: "new",
                    txt: "",
                    todos: [],
                }, 
                style: {
                    backgroundColor: "rgba(21, 88, 88, 0.178)"
                      },
            }      
            this.input = {
                intxt: null,
                inurl: null,
                intodos: {},
            }
            this.num = 1
        },      
    },
    computed: {
        openAdd(){
            if(this.open) return 'add-open'
            else return 'add-close'
        }
       
    },
    
  }
  