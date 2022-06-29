import { emailService } from '../services/email.service.js'

export default {
    name:'',
    props:[],
    template: `
    <section>
        <h2>You have a massage from : {{email.sender}}</h2>
        <span>{{email.sentAt}}</span>
        <p>{{email.body}}</p>
    </section>
    `,
    created() {
        this.getEmail()
    },
    data() {
        return{
            email:null,
        }
    },
    methods: {
        getEmail() {
            const emailId = this.$route.params.emailId
            emailService.getEmailById(emailId)
            .then((email) => {
                this.email = email
            })
            .catch(() => {
                this.$router.push('/email')
            })
        }

    },
    computed: {
    },
    unmounted() {
    },
    watch: {
        '$route.params.emailId'() {
            this.getEmail()
        }
    },


}
