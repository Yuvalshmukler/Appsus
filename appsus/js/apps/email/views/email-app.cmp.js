import { emailService } from '../services/email.service.js'
import emailList from '../cmps/email-list.cmp.js'
import emailSide from '../cmps/email-side-nav.cmp.js'
export default {
    name: '',
    props: [''],
    template: `
    <section class="email-app-container">

    <aside class="nav-menu">
    </aside>
        <email-list :emails="emailsToShow"></email-list>
        
    </section>
    `,
    components: {
        emailList,
        emailSide,
    },
    created() {
        emailService.query()
            .then(emails => {
               /*  console.log(emails); */
                this.emails = emails
              
            })
    },
    data() {
        return {
            emails: null,
        }
    },
    methods: {
    },
    computed: {
        emailsToShow() {
            return this.emails
        }
    },
    unmounted() {
    },

}