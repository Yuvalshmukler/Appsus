import emailPreview from "../cmps/email-preview.cmp.js"

export default {
    props: ['emails'],
    template: `
    <section v-if="emails" class="email-inbox">
            <div class="email-inbox-nav">
                <li>From</li>
                <li>Subject</li>
                <li>Body</li>
                <li>Date</li>
            </div>
            <div v-for="email in emails" class="email-preview"
                v-bind:class="isReaded(email)">
                <router-link :to="'/email/'+email.id" class="email-link">
                    <email-preview :email="email"></email-preview>
                    </router-link>
            </div>
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
        isReaded(email) {
            return { unread: !email.isRead, read: email.isRead }
        }
    },
}