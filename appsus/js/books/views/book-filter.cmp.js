export default {
    template: `
   <section class="book-filter">
  
        <input @change="filter" class="book-search-input" type="text" id="title" v-model="filterBy.title" placeholder="Search...">
        <h2><i class="fa-solid fa-magnifying-glass"></i></h2>
        
      <div class="price-title">
        <h1><i class="fa-solid fa-dollar-sign"></i>
        </h1>
        <input  @change="filter" type="range" min="0" max="500" v-model="filterBy.fromPrice">
        <p>{{filterBy.fromPrice}}</p>
        
        <h1> <i class="fa-solid fa-arrows-left-right-to-line"></i></h1>
        <input  @change="filter" type="range" id="toPrice" min="0" max="500" v-model="filterBy.toPrice">
        <p >{{filterBy.toPrice}}</p>
      <div>
     
    
   </section>
  `,
    data() {
      return {
        filterBy: {
          title: "",
          fromPrice:0, 
          toPrice:500,
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
  