export default {
    template: `
 <section class="home-page">

    <div class="home-page-info">
        <img src="img/hourse.jpg"/>
        <div>
           <h2>Apssus</h2> 
           <h2>All you need in one place</h2>
           <!-- <p>Electronic mail (email or e-mail) is a method of exchanging messages ("mail") between people using electronic devices. Email was thus conceived as the electronic (digital) version of, or counterpart to, mail, at a time when "mail" meant only physical mail (hence e- + mail). Email later became a ubiquitous (very widely used) communication medium, to the point that in current use, an e-mail address is often treated as a basic and necessary part of many processes in business, commerce, government, education, entertainment, and other spheres of daily life in most countries. Email is the medium, and each message sent therewith is called an email (mass/count distinction).</p> -->
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