export default {
    template: `
   <section class="note-filter">

      <label for="title">Search notes:</label>
        <input type="text" id="title" v-model="filterBy.txt" @input="filter">
      <label>
        Label
        <select v-model="filterBy.label" @change="filter">  
            <option>  </option>
            <option>empowering</option>
            <option>important</option>
            <option>vacation</option>
        </select>
      </label> 
   </section>
  `,
    data() {
      return {
        filterBy: {
          lable: "",
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
  