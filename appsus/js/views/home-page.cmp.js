export default {
    template: `
 <section class="home-page">

    <div class="home-page-info">
        <img src="img/hourse.jpg"/>
        <div>
           <h2>Apssus</h2> 
           <h2>All you need in one place</h2>
        </div>
    </div>

        <div class="home-page-links">
            <div class="home-page-link">
            <router-link to="/book" class="nav-link">
                     <img src="img/books.jpg"/>
                    <h1>Books</h1>
                    </router-link>
            </div>

            <div class="home-page-link">
            <router-link to="/email" class="nav-link">
                    <img src="img/emails.jpg"/>
                    <h1>Email</h1>
                    </router-link>
            </div>
            
            <div class="home-page-link">
            <router-link to="/keeper" class="nav-link">
                    <img src="img/notes.png"/>
                    <h1>Keeper</h1>
                    </router-link>
            </div> 
        </div>

        
 </section>
`,
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
};