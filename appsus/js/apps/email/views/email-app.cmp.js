import { emailService } from '../services/email.service.js'
import emailList from '../cmps/email-list.cmp.js'

export default {
    name: '',
    props: [],
    template: `
    <section class="email-app">
        <email-list :emails="emailsToShow"></email-list>
    </section>
    `,
    components: {
        emailList,
    },
    created() {
        emailService.query().then(emails => this.emails = emails)
    },
    data() {
        return {
            emails: null,
        }
    },
    methods: {
        emailsToShow() {
            return this.emails
        }

    },
    computed: {
    },
    unmounted() {
    },

}