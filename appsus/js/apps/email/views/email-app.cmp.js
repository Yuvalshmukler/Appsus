import { emailService } from '../services/email.service.js'
import emailList from '../cmps/email-list.cmp.js'
import emailSide from '../cmps/email-side-nav.cmp.js'
import { eventBus } from '../../../services/eventBus-service.js'

export default {
    name: '',
    props: [''],
    template: `
   
    <section class="email-app-container" v-if="emails" >
    <aside class="side-menu">
        <email-side :emails="emails.length"></email-side>
    </aside>
        <email-list :emails="emailsToShow"></email-list>
        
    </section>

   
    `,
    components: {
        emailList,
        emailSide,
    },
    created(){
        emailService.query()
        .then(emails => {
           /*  console.log(emails); */
            this.emails = emails
        })
        eventBus.on('removed', this.removeEmail)

    },
    data() {
        return {
            emails: null,
        }
    },
    methods: {
        removeEmail(id) {
            emailService.remove(id)
                .then(() => {
                    /* console.log('Deleted successfully') */
                    this.$router.push('/email')
                    const idx = this.emails.findIndex((email) => email.id === id)
                    /* console.log(idx); */
                    this.emails.splice(idx, 1)
                    /*  showSuccessMsg('Deleted successfully') */
                })
                .catch(err => {
                    console.log(err)
                    /* showErrorMsg('Failed to remove') */
                })
        },


    },
    computed: {
        emailsToShow() {
            return this.emails
        }
    },
    unmounted() {
    },

}