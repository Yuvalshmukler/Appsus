import emailPreview from "../cmps/email-preview.cmp.js"

export default {
    props: ['emails'],
    template: `
    <section class="email-inbox">
        <ul>
            <li v-for="email in emails" :key="email.id" class="email-preview-container">
            <router-link :to="'/email/'+email.id">
                <email-preview :email="email"></email-preview>
                </router-link>

           
            <!-- <pre>{{emails}}</pre> -->
            </li>
        </ul>
    </section>
    `,
    components: {
        emailPreview,
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