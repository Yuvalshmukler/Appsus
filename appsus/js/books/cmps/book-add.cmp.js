import { bookService } from "../services/book.service.js";

export default {
    template: `
        <section class="book-add">

            
            
            <div class="add-book-search">
                <form @submit.prevent="search">
                    <i class="fa-solid fa-plus"></i>
                    <i class="fa-solid fa-book"></i>
                    <input class="book-search-input" ref="searchInput" type="text" v-model="searchValue" placeholder="Search book...">
                    <button><i class="fa-solid fa-magnifying-glass"></i></button>
            </form>
        <div>    
        
        <div class="search-results">
            <h2 >Search results:</h2>
            <ul>
                <li class="search-item" v-for="(book, idx) in allBooks" >
                    <button @click=addSearch(idx)><i class="fa-solid fa-plus"></i><button>
                    {{book.title}} | {{book.publishedDate}} 
                  <br>
                  </li>
            </ul>
        <div>
        </section>
    `,
    data() {
      return {
        searchValue: null,
        allBooks: null,
        searchBooks: null,
        
        
      }
    },
    methods: {
        search(){
            console.log(this.searchValue)
            bookService.bookSearch(this.searchValue)
             .then(res =>{
                this.allBooks = res
                console.log('this.allBooks', this.allBooks)})
            
        },
        addSearch(idx){
            console.log(idx)
            const book = this.allBooks[idx]
            console.log(book)
            bookService.addGoogleBook(book)
        }
    
    
    },
    computed: {},
    mounted() {
        console.log(this.$refs.searchInput)
        this.$refs.searchInput.focus()
    },
  };
  