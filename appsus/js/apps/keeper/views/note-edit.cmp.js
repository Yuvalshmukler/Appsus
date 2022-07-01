
import { keeperService }  from "../services/keeper-service.js"

export default {
    props: ["note"],
    template: `
        <section class="note-edit">    
    

            <form @submit.prevent="saveUpdate">       
                
                <input type="text" class="note-edit-label" v-model="note.info.label">

                <div v-if="note.type === 'note-txt'">   
                    <input class="note-edit-txt" type="text" v-model="note.info.txt">
                </div>

                <div v-if="note.type === 'note-img' || note.type === 'note-video'">        
                    <input class="note-edit-txt" type="text" v-model="note.info.title">        
                    <input class="note-edit-txt" type="text" v-model="note.info.url">   
                </div>

                <div v-if="note.type === 'note-todos'">   
                    <input class="note-edit-txt" type="text" v-model="note.info.title">
                    <ul>
                        <li v-for="todo in note.info.todos" :key="index">
                        ◻️<input class="note-edit-todo" type="text"  v-model="todo.txt" ><br>
                        </li>             
                    </ul>
                </div>

                <button ><i class="fa-solid fa-pen-to-square"></i></button>
            </form>

            <!-- <p @click.stop="close" class="close-note-edit"><i class="fa-solid fa-xmark"></i></p> -->
           
          
        </section>
        `,
    data() {
      return {
    
        
      }
    },
    methods: {
        saveUpdate(){
            console.log('saving update', this.note)
            keeperService.save(this.note)
            this.$emit("clearEditNote", this.note)
        },
        close(){
            console.log('closing')
            this.$emit("clearEditNote", this.note)
        },
        
      
    },
    computed: {
       
    },
    created(){
    
        
    },
  }
  
