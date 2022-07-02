import { emailService } from '../services/email.service.js'

export default {
    name: '',
    props: [],
    template: `
        <section class="email-compose">
            <form @submit.prevent="sendEmail" class="compose-form">
                <div class="compose-header">
                    <span>New Message</span>
                    <button
                        @click="onCloseCompons"
                        class="close-btn">x
                    </button>
                </div>
                <input class="form-txt" 
                    required type="text" 
                    v-model="email.to" 
                    placeholder="To:" />
                <input class="form-txt"
                    type="text" 
                    placeholder="Cc:" />
                <input class="form-txt" 
                    type="text"
                    placeholder="Bcc:" />
                <input class="form-txt"
                    required type="text"
                    v-model="email.subject"
                    placeholder="Subject:" />          
                <textarea ref="emailBody" 
                    class="form-txt"
                    v-model="email.body" 
                    rows="10">
                </textarea>
                <div class="form-btns">
                    <button class="send-btn" >
                        send
                    </button>
                </div>
            </form>
    </section>
    `,
    data() {
        return {
            email: {
                sender: 'me',
                to: null,
                subject: null,
                body: '',
                boxes: {
                    inbox: true,
                    sentBox: true,
                    draft: false,
                    star: false,
                }
            },
            removed: false
        }
    },
    methods: {
        sendEmail() {
            this.$emit('added', this.email)
            this.$emit('close')
        },
        onCloseCompons() {
            this.$emit('close')
        },
    },
}

