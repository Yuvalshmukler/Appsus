export default {
    props: ["info"],
    template: `
        <section class="note-todos">
            <h5 class="label">{{info.label}}</h5>
            <h2>{{info.title}}</h2>
            <ul>
                <li v-for="todo in info.todos" >
                    * {{todo.txt}}
                </li>
            </ul>
            
        </section>
  `,
    data() {
      return {
        
      }
    },
    methods: {},
    computed: {},
  }
  