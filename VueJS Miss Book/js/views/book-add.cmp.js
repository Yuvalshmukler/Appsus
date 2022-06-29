import { bookService } from "../services/book.service.js";

export default {
    template: `
        <section class="book-add main-app">
            <h1>Add A Book</h1>
            <form @submit.prevent="search">
                <label>
                    Search book
                    <input ref="searchInput" type="text" v-model="searchValue" placeholder="Start typing...">
                    <p>{{searchValue}}<p>
                    <button>Submit</button>
                </label>
            </form>
            
            <h2>Search results:</h2>
            <ul>
                <li v-for="(book, idx) in allBooks" >
                    {{book.title}}| {{book.publishedDate}} 
                    <button @click=addSearch(idx)>+<button>
                  <br>
                  </li>
            </ul>
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
  