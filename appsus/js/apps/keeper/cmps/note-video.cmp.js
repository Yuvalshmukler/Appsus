export default {
    props: ["info"],
    template: `
        <section class="note-video">
            <h1>{{info.title}}</h1>
            <iframe width="360" height="300"
                :src="info.url">
                </iframe>
        </section>
  `,
    data() {
      return {
        
      }
    },
    methods: {},
    computed: {},
  }
  