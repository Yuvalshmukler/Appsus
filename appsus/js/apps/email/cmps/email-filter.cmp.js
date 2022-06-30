export default {
    name: '',
    props: [],
    template: `
    <section class="email-filter" >
        <input type="text"
        v-model="filterBy.body"
        @input="filter"
         placeholder="search Email">
    </section>
    `,
    created() {
    },
    data() {
        return {
            filterBy: {
                body: ''
            }
        }
    },
    methods: {
        filter() {
            // this.$emit("filtered", this.filterBy);
            this.$emit("filtered", this.filterBy.body);
        },

    },
    computed: {
    },
    unmounted() {
    },

}