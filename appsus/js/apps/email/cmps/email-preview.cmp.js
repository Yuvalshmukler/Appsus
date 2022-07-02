import longText from '../../../cmps/long-text.cmp.js'
import { updateEmail } from '../../../services/eventBus-service.js'

export default {
    name: '',
    props: ["email"],
    template: `
    <section v-if="email" class="email-preview-container">
            <span @click.prevent="toggleStar" class="email-preivew-star" 
                 v-bind:class="{yellow:email.boxes.star}">
                <i class="fa-solid fa-star"></i>
            </span>
            <span class="email-preivew-sender">
                {{email.sender}}
            </span>
            <div class="email-review-subject">{{email.subject}}</div>
            <div class="email-preview-content">
                <long-text class="email-preview-body" 
                :txt="email.body" length="58">
                </long-text>
            </div>  
            
            <span class="email-preview-time">
                {{formatAMPM}}
            </span>
    </section>
    `,
    components: {
        longText
    },
    data() {
        return {
        }
    },
    methods: {
        toggleStar(){
            const email = JSON.parse(JSON.stringify(this.email))
            email.boxes.star = !email.boxes.star
            updateEmail(email)
        }
    },
    computed: {
        formatAMPM() {

            if (!this.email) return
            const date = new Date(this.email.sentAt)
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        }
    }
}