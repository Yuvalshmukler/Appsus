import { emailService } from '../services/email.service.js'
import { deleteEmail } from '../../../services/eventBus-service.js'
import { updateIsRead } from '../../../services/eventBus-service.js'
import { eventBus } from '../../../services/eventBus-service.js'
import emailSide from '../cmps/email-side-nav.cmp.js'

export default {
    name: '',
    props: [],
    template: `
    <section class="email-contact-container" v-if="email">
        <email-side ></email-side>
        <section class="email-body-container">
            <h2>You have a massage from : {{email.sender}}</h2>
            <h5>{{email.emailAdress}}</h5>
            <span class="trashIcon" @click="onDeleteEmail"><i class="fa-solid fa-trash"></i></span>
            <span class="replayIcon" @click="onReplay"><i class="fa-solid fa-reply"></i></span>
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
        emailSide
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
        backToInbox(){
            this.$router.push('/email')
        },
    },
    computed: {
        date() {
            const date = new Date(this.email.sentAt)
            return date.toLocaleDateString() + '  ' +
                date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        }
    },
    unmounted() {
    },
    watch: {
        '$route.params.emailId'() {
            this.getEmail()
        }
    },


}
