import longText from '../../../cmps/long-text.cmp.js'
import { utilService } from '../../../services/util.service.js'

export default {
    name: '',
    props: ["email"],
    template: `
    <section class="email-preview-container">
    <!-- <i class="fa-solid fa-star"></i> -->
        <span class="email-preivew-sender" :style="sender">
            {{email.sender}}
        </span>

        <div class="email-review-subject">{{email.subject}}</div>
        <div class="email-preview-content">
            <long-text class="email-preview-body" 
            :txt="email.body" length="60">
            </long-text>
        </div>  

        <span class="email-preview-time">
            {{formatAMPM(email.sentAt)}}
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
        formatAMPM(date) {
            var hours = date.getHours()
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        }

    },
    computed: {
    }
}