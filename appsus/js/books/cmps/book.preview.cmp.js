export default {
    props: ["book"],
    template: `
      <img class="book-preview-img" :src="book.thumbnail"/>
      <h5>{{book.title}}</h5>
      <p class="price">$ {{price}}</p>

  `,
    data() {
      return {};
    },
    methods: {},
    computed: {
      price(){
        // return this.book.listPrice.amount 
        var currencyCode = this.book.listPrice.currencyCode
        if (currencyCode === 'USD') return this.book.listPrice.amount 
        if (currencyCode === 'ILS') return Math.round(this.book.listPrice.amount/3.5 )
        if (currencyCode === 'EUR') return Math.round (this.book.listPrice.amount*1.2 )
        
      }
    },
  };
  