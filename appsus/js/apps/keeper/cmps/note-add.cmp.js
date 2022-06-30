
export default {
    props: [],
    template: `
        <section class="note-add">
            <form @submit.prevent="addNote">
                <button><i class="fa-solid fa-plus"></i></button>
                <label>
                    <input type="text" v-model="input.txt" placeholder="Start typing...">
                    <input v-if="note.type === 'note-img'" 
                    type="text" v-model="input.url" placeholder="Enter URL...">
                </label>
                <!-- <button>video</button>
                <button>list</button> -->
            </form> 
            
            <div class="note-add-icon-container">
                <p :class="isTxt" class="note-add-icon" @click="note.type='note-txt'"><i class="fa-solid fa-pen"></i></p>
                <p class="note-add-icon" @click="type('note-img')"><i class="fa-solid fa-image"></i></p>
                <p class="note-add-icon" @click="note.type='note-video'"><i class="fa-solid fa-film"></i></p>
                <p class="note-add-icon" @click="note.type='note-todos'"><i class="fa-solid fa-list"></i></p>
            </div>
        </section>
  `,
    data() {
      return {
        input:{
            txt: null,
            url: null,
        },
        note: {
            type:  "",
            info: {
                label: "new",
                txt: "",
            },
          },
        
      }
    },
    methods: {
        addNote(){
            if (this.note.type === 'note-txt') this.note.info.txt = this.input.txt
            if (this.note.type === 'note-img') {
                this.note.info.title = this.input.txt
                this.note.info.url = this.input.url    }
            console.log('adding note', this.note)
            this.$emit("addNote", this.note);
        },
        type(noteType){
            if (this.note.type) {
                this.note.type = ''
                return
            }
            this.note.type = noteType
        }
    },
    computed: {
        isTxt(){
            if (this.note.type === 'note-txt') return 'active'
            else return ''
        },
    },
  }
  