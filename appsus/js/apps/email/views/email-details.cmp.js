import { emailService } from '../services/email.service.js'
import { deleteEmail } from '../../../services/eventBus-service.js'
import { updateIsRead } from '../../../services/eventBus-service.js'
import { updateEmail } from '../../../services/eventBus-service.js'
import { eventBus } from '../../../services/eventBus-service.js'
import emailSideNavCmp from '../cmps/email-side-nav.cmp.js'

export default {
    name: '',
    props: [],
    template: `
    <section class="email-contact-container" v-if="email">
        <email-SideNavCmp></email-SideNavCmp>
        <section class="email-body-container">
            <h2>You have a massage from : {{email.sender}}</h2>
            <h5>{{email.emailAdress}}</h5>
            <span class="trashIcon" title="delete" @click="onDeleteEmail">
                <i class="fa-solid fa-trash"></i></span>
            <span class="undoIcon" title="unread" @click="undoReading(email)"
            @click="backToInbox">
                <i class="fa-solid fa-envelope"></i></span>
            <span >{{date}}</span>
            <p>{{email.body}}</p>
            <button @click="backToInbox">Go back</button>
        </section>
    </section>
    `,
    created() {
        this.getEmail()

    },
    data() {
        return {
            email: null,
        }
    },
    components: {
        emailSideNavCmp
    },
    methods: {
        getEmail() {
            const emailId = this.$route.params.emailId
            emailService.getEmailById(emailId)
                .then((email) => {
                    this.email = email
                    updateIsRead(email.id)
                })
                .catch(() => {
                    this.$router.push('/email')
                })
        },
        onDeleteEmail() {
            deleteEmail(this.email.id);
        },
        backToInbox() {
            this.$router.push('/email')
        },
        undoReading(email){
            console.log(email);
            JSON.parse(JSON.stringify(email))
            email.isRead = false
            updateEmail(email)
            eventBus.emit('show-msg', { txt: 'update successfully', type: 'success', link: '', })
        }
    },
    computed: {
        date() {
            const date = new Date(this.email.sentAt)
            return date.toLocaleDateString() + '  ' +
                date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    },
    watch: {
        '$route.params.emailId'() {
            this.getEmail()
        }
    },
}
