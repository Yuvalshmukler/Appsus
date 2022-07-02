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
    <section v-if="emails">
        <!-- <email-header></email-header> -->
        <email-filter @filtered="filterEmail" @readUnread="filterByReadUnread"/>
        <button @click="sortByDate">Date</button>
        <button>text</button>
        <section class="email-app-container" v-if="emails" >
            <aside class="side-menu">
                <button @click="composeEmail" class="compose-btn">
                <img src="./img/google-plus.png" class="google-plus">    
                <span>Compose</span></button>
                <email-side :emails="emails"></email-side>
            </aside>
            <email-list
                :emails="emailsToShow">                           
            </email-list>
            <email-compose
                @close="closCompose"
                @added="getUpdateEmails" 
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
        eventBus.on('isRead', this.updateIsRead)
        eventBus.on('filterByInbox', this.filterByInbox)
        eventBus.on('filterBySent', this.filterBySent)
        /* eventBus.on('closeCompo', this.closCompose) */
    },
    data() {
        return {
            emails: null,
            isCompose: false,
            filterBy: null,
            filterByStatus: null,
            sortBy: {
                date: false,
                emails: false
            }
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
        closCompose() {
            this.isCompose = false
        }
        , filterEmail(filterBy) {
            this.filterBy = filterBy
        },
        filterByReadUnread(filterBy) {
            this.filterByStatus = filterBy
            console.log('filterByBoxes', this.filterByStatus);

        },
        getUpdateEmails(email) {
            emailService.createNewEmail(email)
                .then((email) => this.emails.unshift(email))
        },
        sortByDate() {
            console.log('lol');
            this.sortBy.date = true
        },
        updateIsRead(emailId) {
            emailService.updateReading(emailId)
        },
        filterByInbox() {
            this.emails = this.emails.filter((email) => !email.isRead)
        },
        filterBySent() {
            this.emails = this.emails.filter((email) => email.boxes.sentBox)
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
/*             if (this.filterByStatus) {
                console.log('hello read');
                emails = emails.filter(email => email.isRead)
            }
 */            return emails

        },
    },
    unmounted() {
    },

}