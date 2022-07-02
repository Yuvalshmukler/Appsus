import { eventBus } from "../services/eventBus-service.js";

export default {
    template: `
 <section v-if="msg" class="user-msg" :class="msg.type">
    <p>{{msg.txt}}</p>
    <div v-if="msg.link">
    <p>{{msg.link}}</p>
</div>  
 </section>
`,
    data() {
        return {
            unsubscribe: null,
            msg: ''
        };
    },
    created() {
        this.unsubscribe = eventBus.on('show-msg', this.showMsg)
    },
    methods: {
        showMsg(msg) {
            this.msg = msg
            setTimeout(() => {
                this.msg = null
            }, 1500)
        }
    },
    computed: {},
    unmounted() {
        this.unsubscribe()
    },
};