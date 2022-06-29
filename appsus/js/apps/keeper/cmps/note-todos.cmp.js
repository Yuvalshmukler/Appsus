export default {
    props: ["info"],
    template: `
        <section class="note-todos">
            <h2>{{info.label}}</h2>
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
  