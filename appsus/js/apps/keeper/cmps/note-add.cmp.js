
import { keeperService }  from "../services/keeper-service.js"
import { eventBus } from '../../../services/eventBus-service.js';

export default {
    props: [],
    template: `
        <section class="note-add">
            <form @submit.prevent="addNote">
                <button title='add'><i class="fa-solid fa-plus"></i></button>
                
                <input type="text" v-model="input.txt" placeholder="Start typing...">
                <input v-if="note.type === 'note-img' || note.type === 'note-video'" 
                    type="text" v-model="input.url" placeholder="Enter URL...">
                <br>
                <div class="todo-list"  v-if="note.type === 'note-todos'">
                    <ul>
                        <li v-for="index in num" :key="index">
                        <input class="todo-list-item"
                            type="text"  v-model="input.todos[index]" placeholder="◻️ list item...">
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
        </section>
        `,
    data() {
      return {
        num: 1,
    
        input:{
            txt: null,
            url: null,
            todos: {},
        },
        note: {
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
          },
        
      }
    },
    methods: {
        addNote(){
            if (this.note.type === 'note-txt') this.note.info.txt = this.input.txt
            else if (this.note.type === 'note-img' || this.note.type === 'note-video') {
                this.note.info.title = this.input.txt
                this.note.info.url = this.input.url    }
            else if (this.note.type === 'note-todos'){
                this.note.info.title = this.input.txt
                for (const todo in this.input.todos) {
                    this.note.info.todos.push({txt: this.input.todos[todo], doneAt: null})
                }
                    
            }
            keeperService.save(this.note).then(note => this.$emit("addNote", note))
            keeperService.getLabels()

            console.log('adding note', this.note)
            eventBus.emit('show-msg', { txt: 'new note was added', type: 'success' , link: '',})

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
                    txt: null,
                    url: null,
                    todos: {},
                }
            
            this.num = 1

            // this.$emit("addNote", this.note);
            // this.note.type = "note-txt" 
            // this.note.info.txt = "" 
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
            this.note.type = "note-txt" 
            this.note.info.txt = "" 

        },
      
    },
    computed: {
       
    },
  }
  