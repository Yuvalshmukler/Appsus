import { bookService } from "../services/book.service.js";
import bookList from "../cmps/book-list.cmp.js";
import bookDetails from "./book-details.cmp.js"
import bookFilter from  "./book-filter.cmp.js"


export default {
    template: `
    <section class="book-app">
      <div  v-if='!selectedBook'>
        <router-link class="add-book-link" to="/Add">
          <i class="fa-solid fa-plus"></i>
          <i class="fa-solid fa-book"></i>
                              </router-link>
        <book-filter @filtered="setFilter"></book-filter>
        <book-list :books="booksToShow" @selected="selectBook"></book-list>
    </div>
        <book-details v-else :book="selectedBook" @close="selectedBook = null"></book-details>
     
    </section>
  `,
  components:{
    bookList,
    bookDetails,
    bookFilter,
  
  },
    data() {
      return {
        books: null,
        selectedBook: null,
        filterBy: null,
       
      };
    },
    methods: {
      selectBook(book){
        console.log('book-app selected')
        this.selectedBook = book
        console.log( this.selectedBook)
  
      },
      setFilter(filterBy){
        console.log(filterBy)
        this.filterBy = filterBy

      }
     
    },
    computed: {
      booksToShow() {
        if (!this.filterBy) return this.books;
        const regex = new RegExp(this.filterBy.title, "i");
        return this.books.filter((book) => (regex.test(book.title) && 
                                            book.listPrice.amount > this.filterBy.fromPrice &&
                                            book.listPrice.amount < this.filterBy.toPrice ) );
    
      },
    },
    
    created(){
      bookService.query().then(books => this.books = books )


    },
  };
  