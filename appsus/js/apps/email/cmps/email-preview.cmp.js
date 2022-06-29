import longText from '../../../cmps/long-text.cmp.js'
import { utilService } from '../../../services/util.service.js'

export default {
    name: '',
    props: ["email"],
    template: `
    <section v-if="email" class="email-preview-container">
   
        <span class="email-preivew-sender" :style="sender">
            {{email.sender}}
        </span>

        <div class="email-review-subject">{{email.subject}}</div>
        <div class="email-preview-content">
            <long-text class="email-preview-body" 
            :txt="email.body" length="40">
            </long-text>
        </div>  

        <span class="email-preview-time">
            {{email.sentAt}}
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
    }
}