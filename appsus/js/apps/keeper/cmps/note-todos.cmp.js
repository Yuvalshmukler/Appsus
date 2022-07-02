export default {
    props: ["info"],
    template: `
        <section class="note-todos">
            <h5 class="label">{{info.label}}</h5>
            <h3>{{info.title}}</h3>
            <ul>
                <li  v-for="todo in info.todos" >
                ◻️ {{todo.txt}} 
                </li>
            </ul>
            
        </section>
  `,
    data() {
      return {
        
      }
    },
    methods: {
     
    },
    computed: {},
  }
  