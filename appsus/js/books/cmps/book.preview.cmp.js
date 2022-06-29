export default {
    props: ["book"],
    template: `
      <h5>{{book.title}}</h5>
      <p class="price">{{book.listPrice.amount}} {{book.listPrice.currencyCode}}</p>
  `,
    data() {
      return {};
    },
    methods: {},
    computed: {},
  };
  