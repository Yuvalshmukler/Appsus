export default {
    name:'',
    props:['emails'],
    template: `
    <section>
        <ul class="side-bar-email">
            
            <li v-bind="countEmails"><i class="fa-solid fa-inbox"></i>inbox</li>
            <li><i class="fa-solid fa-star"></i>starred</li>
            <li><i class="fa-solid fa-paper-plane"></i>sent Emails</li>
            <li><i class="fa-brands fa-firstdraft"></i>Draft</li>
        </ul>
    </section>
    `,
    created() {
        /* console.log(this.emails); */
    },
    data() {
        return{

        }
    },
    methods: {
        countEmails(){

        }
    },
    computed: {
    },
    unmounted() {
    },

}