export default {
    template:`
    <header class="app-header">
           <h1>My Book Shop</h1>
           <nav class="nav-bar">
                <router-link to="/"> Home</router-link> |
                <router-link to="/book"> Books</router-link> |
               <!--  <router-link to="/about"> About</router-link>| -->
                <router-link to="/email">Email</router-link>|
                <router-link to="/keeper">Keep <img src="img/keeper.png"/></router-link>
            </nav>
    </header>
   `,
     data() {
       return {
       }
     },
     methods:{},
   computed:{}
   }