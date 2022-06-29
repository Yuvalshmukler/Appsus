/* import emailPreview from "" */
export default {
    props: ['emails'],
    template: `
    <section class="email-inbox">
        <ul>
            <li v-for="email in emails" :key="email.id" class="email-preview-container">
            <!-- <email-preview></email-preview> -->
            </li>
        </ul>
    </section>
    `,
    components: {
       /*  emailPreview, */
    },

    created() {
        console.log(this.emails);
    },
    data() {
        return {

        }
    },
    methods: {
    },
    computed: {
    },
    unmounted() {
    },

}