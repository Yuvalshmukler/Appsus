export default {
    template: `
   <section class="note-filter">
        <input type="text" id="title" v-model="filterBy.txt" @input="filter" placeholder="Search...">
        <p><i class="fa-solid fa-magnifying-glass"></i></p>


   </section>
  `,
    data() {
      return {
        filterBy: {
          label: "",
          txt: "",
          type:  "",
        },
      };
    },
    methods: {
      filter() {
        // console.log('filtering from filter', this.filterBy)
        this.$emit("filtered", this.filterBy);
      },
    },
    computed: {},
  };
  