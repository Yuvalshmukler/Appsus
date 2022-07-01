import { eventBus } from "../services/eventBus-service.js";

export default {
    template: `
 <section v-if="msg" class="user-msg" :class="msg.type">
    <p>{{msg.txt}}</p>
    <!-- <p @click="msg=''">X</p> -->
    <div v-if="msg.link">
    <p>{{msg.link}}</p>
        <!-- <router-link :to="msg.link">Check it Out</router-link> -->  
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
        /* console.log('msg created', this.showMsg ) */
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