export default {
    props: ["emails"],
    template: `
    <section v-if="emails">
        <ul class="side-bar-email">
            <li @click="filterByStatus('all')">
                <i class="fa-solid fa-envelope"></i>all</li>
            <li @click="filterByStatus('isRead')">
                <i class="fa-solid fa-inbox">
            </i>{{CountunReaden}}</li>
            <li @click="filterByStatus('star')"><i 
            class="fa-solid fa-star"></i>{{CountunStars}}</li>
            <li @click="filterByStatus('sentBox')">
                <i class="fa-solid fa-paper-plane">
            </i>{{CountunSentEmails}}</li>
            <li @click="filterByStatus('draft')">
                <i class="fa-brands fa-firstdraft">
                </i>{{CountunDraft}}</li>
        </ul>
    </section>
    `,
    data() {
        return {
            filterBy: null
        }
    },
    methods: {
        filterByReaden() {
            filterInbox()
        },
        filterByStatus(status) {
            console.log(status);
            this.$emit('filtered', status)
        },
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
}

