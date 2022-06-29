

export default {
    template: `
 <section class="about-page main-app">
    <h3>About Us</h3>

    <nav>
        <router-link to="/about/team">Team</router-link> |
        <router-link to="/about/service">Services</router-link>
     </nav>
    <router-view />
    
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem dolor, excepturi vero vitae perferendis molestias rem minima enim exercitationem aspernatur ratione quasi ex repellat? Deleniti facilis blanditiis quod autem quisquam consectetur, praesentium voluptate nostrum recusandae velit alias eum voluptates temporibus. Voluptates, cumque! Impedit, quis. Doloremque molestias voluptate dicta dignissimos atque quidem voluptates, laudantium animi accusantium reiciendis, numquam error veniam veritatis autem facilis cupiditate hic natus nihil alias dolorum, voluptatem commodi praesentium assumenda. Harum autem earum debitis culpa perspiciatis, reprehenderit voluptatem, eveniet quas repellendus nostrum delectus! Culpa error unde molestiae fuga ducimus earum eligendi aut quibusdam, adipisci excepturi minus odio iure.</p>

 </section>
`,
    data() {
        return {};
    },
    created() { },
    methods: {
        
    },
    computed: {},
    unmounted() { },
};