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
        <email-filter @filtered="filterEmail" 
        @readUnread="filterByReadUnread"/>
        <button @click.prevent="sortByDate">Date</button>
        <button @click.prevent="sortByTitle">text</button>
        <section class="email-app-container" v-if="emails" >
            <aside class="side-menu">
                <button @click="composeEmail" class="compose-btn">
                <img src="./img/google-plus.png" class="google-plus">   
                </button>
                <email-side :emails="emails" @filtered="setSideFilter" >
                </email-side>
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
        /* eventBus.on('closeCompo', this.closCompose) */
    },
    data() {
        return {
            emails: null,
            isCompose: false,
            filterBy: null,
            filterByStatus: null,
            filterByBox: null,
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
                    eventBus.emit('show-msg', { txt: 'new note was added', type: 'success' , link: '',})

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
        },
        getUpdateEmails(email) {
            emailService.createNewEmail(email)
                .then((email) => this.emails.unshift(email))
        },
        sortByDate() {
            this.emails.sort((fEmail, sEmail) => {
                if (fEmail.sentAt > sEmail.sentAt) 1
                else if (fEmail.sentAt < sEmail.sentAt) return -1
                else return 0
            })
        },
        sortByTitle() {
            this.emails.sort((a, b) => a.subject.localeCompare(b.subject))

        },
        updateIsRead(emailId) {
            emailService.updateReading(emailId)
        },
        setSideFilter(status) {
            this.filterByBox = status
        }
    },

    computed: {
        emailsToShow() {
            if (!this.emails) return
            var emails = this.emails
            if (this.filterBy) {
                const regex = new RegExp(this.filterBy, "i");
                emails = emails.filter((email) => {
                    return regex.test(email.body) || regex.test(email.subject) || regex.test(email.sender)
                });
            }
            if (this.filterByStatus) {
                if (this.filterByStatus === 'read') {
                    emails = emails.filter(email => email.isRead)
                } else if (this.filterByStatus === 'All') {
                    return emails
                } else {
                    emails = emails.filter(email => !email.isRead)
                }
            }
            if (this.filterByBox) {
                if (this.filterByBox === 'all') return this.emails;
                if (this.filterByBox === 'isRead') {
                    return emails = emails.filter(email => !email.isRead)
                } 
                return this.emails.filter((email) => {
                    return email.boxes[this.filterByBox];
                });

            }
            return emails
        },
    },
    unmounted() {
    },

}