export default {
    props: ["info"],
    template: `
        <section class="note-video">
            <h5 class="label">{{info.label}}</h5>
            <h4>{{info.title}}</h4>
            <iframe width="300" height="300"
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
  