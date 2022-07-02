export default {
    name: '',
    props: [],
    template: `
    <section class="email-filter" >
        <input type="text"
        class="search-input"
        v-model="filterBy.body"
        @input="filter"
         placeholder="search Email">
         <select class="filter-Read" @change="getFilter($event)" id="">

            <option  value="All">All</option>
            <option  value="read">read</option>
            <option value="unread">unread</option>
        </select>
    </section>
    `,
    created() {
    },
    data() {
        return {
            filterBy: {
                text: '',
                selectedOption: ''
            }
        }
    },
    methods: {
        filter() {
            this.$emit("filtered", this.filterBy.body);
        },
        getFilter(event) {
            this.filterBy.selectedOption = event.target.value;
            this.$emit("readUnread", this.filterBy.selectedOption);
        }
    },
}