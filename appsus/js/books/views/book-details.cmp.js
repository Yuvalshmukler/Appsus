
import { bookService } from "../services/book.service.js";
import LongText from "../../cmps/long-text.cmp.js";
import reviewAdd from "../cmps/review-add.cmp.js";

export default {
    props: [],
    template: `
      <section v-if="book" class="book-details">
          <img class="book-details-img" :src="book.thumbnail"/>

        <div class="book-info">
            <h2>{{book.title}}</h2>
            <h3>{{book.subtitle}}</h3>
            <li v-for="author in book.authors" >
                    {{author}}
                </li>
                <p>{{book.publishedDate}}     <span class="highlight">{{bookAge}}</span></p>
                <p>{{book.pageCount}} pages   <span class="highlight">{{reading}}</span></p></p>
                <li v-for="category in book.categories" >
                    {{category}}, 
                </li>
                <p>Language: {{book.language}}</p>
                <h4  :class="amount"> $ {{price}} <img class="sale-img" :src="sale"/></h4>
                
                <p v-if="!readMore">{{description}}...</p>
                <long-text v-else :txt="book.description"/> 
                <p class="read-more" @click="readMore=!readMore">{{readDisplay}}</p>
<!--                 
                <review-add :book="book"/> -->

                <router-link class="next-book" :to="'/book/' + nextBookId">Next book <i class="fa-solid fa-angles-right"></i></router-link>
                <router-link class="close-book" to="/book"> <i class="fa-solid fa-xmark"></i> </router-link>
        </div>
            
            

      </section>
  `,
    components: {
        LongText,
        reviewAdd,
      },

    data() {
      return {
        readMore: false,
        book: null,
        nextBookId:null,
        };
    },
    created() {
        
    },
    methods: {
        
    },
    computed: {
        reading(){
            if (this.book.pageCount > 500 ) return 'Long reading'
            else if (this.book.pageCount > 200 ) return 'Decent reading'
            else if (this.book.pageCount < 100 ) return 'Light reading'
            else return ''
        },
        bookAge(){
            const date = new Date();
            let year = date.getFullYear();
            if (year - this.book.publishedDate > 10 ) return 'Veteran Book'
            else if (year - this.book.publishedDate < 1 ) return 'New!'
            else return ''
        },
        price(){
            // return this.book.listPrice.amount 
            var currencyCode = this.book.listPrice.currencyCode
            if (currencyCode === 'USD') return this.book.listPrice.amount 
            if (currencyCode === 'ILS') return Math.round(this.book.listPrice.amount/3.5 )
            if (currencyCode === 'EUR') return Math.round (this.book.listPrice.amount*1.2 )
        },
        amount(){
            if (this.book.listPrice.amount > 150) return 'high'
            if (this.book.listPrice.amount < 20) return 'low'
        },
        sale(){
            if (this.book.listPrice.isOnSale) return 'img/sale.png'
        },
        description(){
            return this.book.description.substring(0,100)
        },
        readDisplay(){
            if (this.readMore) return 'Read Less'
            else return 'Read More'
        }
      
    },
    watch: {
        '$route.params.bookId':{
            handler() {

                console.log(this.$route);
                const id = this.$route.params.bookId
                console.log(id)
                bookService.get(id).then(book => {
                             this.book = book
                             bookService.getNextBookId(book.id)
                                .then(nextBookId => this.nextBookId = nextBookId)

                        })

            },
            immediate: true
        }
       
    }
  };
  
  