
import noteTxt from '../cmps/note-txt.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'


export default {
    props: ["note"],
    template: `
        <section class="note-preview">
            <component :is="note.type"  
                        :info="note.info">
                    </component>
        </section>
  `,
    data() {
      return {
    
      }
    },
    components: {
        noteTxt,
        noteImg,
        noteTodos,
    },
    methods: {},
    computed: {},
  }
  