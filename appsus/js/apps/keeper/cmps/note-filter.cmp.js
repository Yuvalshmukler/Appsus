export default {
    template: `
   <section class="note-filter">
        <input type="text" id="title" v-model="filterBy.txt" @input="filter" placeholder="Search...">
        <p><i class="fa-solid fa-magnifying-glass"></i></p>
      <!-- <label>
        Label
        <select v-model="filterBy.label" @change="filter">  
            <option>  </option>
            <option>empowering</option>
            <option>important</option>
            <option>vacation</option>
        </select>
      </label> 
      <label>
        Type
        <select v-model="filterBy.type" @change="filter">  
            <option>  </option>
            <option>note-txt</option>
            <option>note-img</option>
            <option>note-todos</option>
            <option>note-video</option>
        </select>
      </label>  -->

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
  