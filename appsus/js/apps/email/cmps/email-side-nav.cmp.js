import { emailService } from '../services/email.service.js'
import { filterInbox, filterSentEmail }
    from '../../../services/eventBus-service.js'

export default {
    props: ["emails"],
    template: `
    <section v-if="emails">
        <ul class="side-bar-email">
            <pre></pre>
            <li @click="filterByReaden"><i class="fa-solid fa-inbox"></i>{{CountunReaden}}</li>
            <li><i class="fa-solid fa-star"></i>{{CountunStars}}</li>
            <li @click="filterBySentEmail"><i class="fa-solid fa-paper-plane"></i>{{CountunSentEmails}}</li>
            <li><i class="fa-brands fa-firstdraft"></i>{{CountunDraft}}</li>
        </ul>
    </section>
    `,
    created() {
    },
    data() {
        return {
        }
    },
    methods: {
        filterByReaden() {
            filterInbox()
        },
        filterBySentEmail() {
            filterSentEmail()
        }
    },

    computed: {
        CountunReaden() {
            return ("inbox " + this.emails.filter((email) => !email.isRead).length)
        },
        CountunStars() {
            return ("starred " + this.emails.filter((email) => email.boxes.star).length)
        },
        CountunSentEmails() {
            return ("sent " + this.emails.filter((email) => email.boxes.sentBox).length)
        },
        CountunDraft() {
            return ("Draft " + this.emails.filter((email) => email.boxes.draft).length)
        }
    },
    unmounted() {
    },
}

/* emails.then(("inbox " + this.emails.filter((email) => email.boxes.inbox === true).length)) */