
export default {
    props: ["info"],
    template: `
        <section class="note-txt">
            <h5 class="label">{{info.label}}</h5>
            <h1>{{info.txt}}</h1>
        </section>
  `,
    data() {
      return {
        
      }
    },
    methods: {},
    computed: {},
  }
  