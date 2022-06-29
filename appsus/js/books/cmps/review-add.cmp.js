
import { bookService } from "../services/book.service.js";
import { eventBus } from '../../services/eventBus-service.js';

export default {
    props: ["book"],
    template: `

<ul>Reviews:</ul>
<li v-if="book" v-for="(rev, idx) in book.review" class="review-item">
    <p>{{rev.fullName}} | {{rev.rate}} | {{rev.date}} | {{rev.txt}} | <span class="remove" @click="remove(idx)">X</span></P> 
    
</li>

<section class="review-add">
      <h1>Add review</h1>
      <form @submit.prevent="add">
                <input type="text" v-model="review.fullName" maxlength="30">
                <label for="rate">Rate:</label>
                    <select id="rate" v-model="review.rate">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <input type="text" v-model="review.txt" maxlength="200">
                    <button>Add</button>
            </form>

    </section>
     
  `,
    data() {
      return {
        review: { 
            fullName:'Books Reader',
            rate: 3,
            date: null,
            txt: 'Write a review'}
      };
    },
    methods: {
        add(){
            console.log('adding review')
            bookService.addReview(this.book.id, this.review)
            if (this.book.review) this.book.review.push(this.review)
            else this.book.review = [this.review]
            eventBus.emit('show-msg', { txt: 'review added', type: 'success', link:'/book/' + this.book.id })

        },
        remove(idx){
            console.log('deleting', idx)
            bookService.deleteReview(this.book.id,idx)
            this.book.review.splice(idx,1)
            eventBus.emit('show-msg', { txt: 'review deleted', type: 'success' , link: '',})

        },

    },
    created() {
        this.review.date = new Date() 
    },
    computed: {
        createdDate(){
            return this.review.date.getFullYear()+'-'+
                 (+this.review.date.getMonth()+1)+'-'
                 +this.review.date.getDate()
        }
    },
  };
  