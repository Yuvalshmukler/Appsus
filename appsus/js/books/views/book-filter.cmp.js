export default {
    template: `
   <section class="book-filter">
   <form @submit.prevent="filter">
      <label for="title">Search title:</label>
        <input type="text" id="title" v-model="filterBy.title">
        <br>
        <br>
      <label for="fromPrice">Start Price:</label>
        <input type="range" id="fromPrice" min="0" max="500" v-model="filterBy.fromPrice">
        <p>{{filterBy.fromPrice}}</P>
      <label for="toPrice">Max Price:</label>
        <input type="range" id="toPrice" min="0" max="500" v-model="filterBy.toPrice">
        <p>{{filterBy.toPrice}}</P>
        <br>
        <br>
      <button>Filter</button>    
    </form>
   </section>
  `,
    data() {
      return {
        filterBy: {
          title: "",
          fromPrice:0, 
          toPrice:1000,
        },
      };
    },
    methods: {
      filter() {
        this.$emit("filtered", this.filterBy);
      },
    },
    computed: {},
  };
  