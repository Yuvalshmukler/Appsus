import bookPreview from "./book.preview.cmp.js";

export default {
  props: ["books"],
  template: `
 <section class="book-list">
        <ul>
            <li v-for="(book,idx) in books" :key="book.id"  class="book-preview-container">
                <book-preview :book="book"/>
                <router-link class="detail-link" :to="'/book/'+book.id"><i class="fa-solid fa-info"></i></router-link>
            </li>
        </ul>
    </section>
`,
  components: {
    bookPreview,
  },

  data() {
    return {};
  },
  methods: {
    select(book) {
      console.log('selected', book)  
      this.$emit("selected", book)
    },
  },
  computed: {},
};
