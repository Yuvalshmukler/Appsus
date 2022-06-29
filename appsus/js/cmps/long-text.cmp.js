export default {
    props: ['txt', 'length'],
  template: `
  <section class="long-text">
      {{txtToShow}}
  </section>
  `,
    computed: {
        txtToShow() {
            return (this.txt.length > this.length) ?
                this.txt.slice(0, this.length) + '...' : this.txt
        }
    },
}