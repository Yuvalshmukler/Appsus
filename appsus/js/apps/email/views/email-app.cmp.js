import { emailService } from '../services/email.service.js'
import { eventBus } from '../../../services/eventBus-service.js'
import emailList from '../cmps/email-list.cmp.js'
import emailSide from '../cmps/email-side-nav.cmp.js'
import emailCompose from '../cmps/email-compose.cmp.js'
import emailFilter from '../cmps/email-filter.cmp.js'
import emailHeader from '../cmps/email-header.cmp.js'

export default {
    name: '',
    props: [''],
    template: `
    <section>
        <!-- <email-header></email-header> -->
        <email-filter @filtered="filterEmail" />
        <section class="email-app-container" v-if="emails" >
            <aside class="side-menu">
                <button @click="composeEmail" class="compose-btn">
                <img src="./img/google-plus.png" class="google-plus">    
                <span>Compose</span></button>
                <email-side :emails="emails.length"></email-side>
            </aside>
            <email-list
                :emails="emailsToShow">            
            </email-list>
            <email-compose
                @close="closCompose"
                @emailCreated="getUpdateEmails" 
                v-if="isCompose">
            </email-compose>
        </section>
    </section>
   
    `,
    components: {
        emailList,
        emailSide,
        emailCompose,
        emailFilter,
        emailHeader,
    },
    created() {
        emailService.query()
            .then(emails => {
                /*  console.log(emails); */
                this.emails = emails
            })
        eventBus.on('removed', this.removeEmail)
        /* eventBus.on('closeCompo', this.closCompose) */
    },
    data() {
        return {
            emails: null,
            isCompose: false,
            filterBy: null,
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
        composeEmail() {
            /* console.log('hi'); */
            if (this.isCompose) return
            this.isCompose = true
        },
        closCompose(){
            console.log('hiiiii');
            this.isCompose = false
        }
        ,filterEmail(filterBy) {
            this.filterBy = filterBy
            console.log(this.filterBy);
        },
        getUpdateEmails(){
            /* later */
            emailService.query()
            .then(emails => {
                /*  console.log(emails); */
                this.emails = emails
            })

        }
    },
    computed: {
        emailsToShow() {
            if (!this.filterBy) return this.emails
            console.log(this.emails);
            var emails = this.emails
            if (this.filterBy) {
                const regex = new RegExp(this.filterBy, "i");
                emails = emails.filter((email) => regex.test(email.body));
            }
            return emails
        }
    },
    unmounted() {
    },

}