import longText from '../../../cmps/long-text.cmp.js'
import { utilService } from '../../../services/util.service.js'

export default {
    name: '',
    props: ["email"],
    template: `
    <section v-if="email" class="email-preview-container">
        <!-- <i class="fa-solid fa-star"></i> -->
            <span class="email-preivew-sender">
                {{email.sender}}
            </span>
            <div class="email-review-subject">{{email.subject}}</div>
            <div class="email-preview-content">
                <long-text class="email-preview-body" 
                :txt="email.body" length="68">
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

    created() {
    },
    data() {
        return {

        }
    },
    methods: {
    },
    computed: {
        formatAMPM() {

            if (!this.email) return
            const date = new Date(this.email.sentAt)
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        }
    }
}