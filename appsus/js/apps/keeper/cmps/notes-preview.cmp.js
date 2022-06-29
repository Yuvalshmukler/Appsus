
import noteTxt from '../cmps/note-txt.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'


export default {
    props: ["note"],
    template: `
        <section >
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
        noteVideo,
    },
    methods: {},
    computed: {},
  }
  