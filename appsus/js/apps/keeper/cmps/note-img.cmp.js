export default {
    props: ["info"],
    template: `
        <section class="note-img">
            <h5 class="label">{{info.label}}</h5>
            <h4>{{info.title}}</h4>
            <img :src="info.url"/>
        </section>
  `,
    data() {
      return {
        
      }
    },
    methods: {},
    computed: {},
  }
  