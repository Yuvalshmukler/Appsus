export default {
    template:`
    <header class="app-header">
        <div class="logo">
           <img src="img/hourse.jpg"/>
           <h1>Apssus</h1>
          </div>
        <nav class="nav-bar">
            
            <!-- <h2><i class="fa-solid fa-grip"></i> </h2> -->

                <router-link to="/" class="nav-link"> <img src="img/home.png"/></router-link>
                <router-link to="/book" class="nav-link"> <img src="img/book.jpg"/></router-link>
                <!-- <router-link to="/about"><img src="img/keeper.png"/></router-link>| -->
                <router-link to="/email" class="nav-link"><img src="img/email.png"/></router-link>
                <router-link to="/keeper" class="nav-link"><img src="img/keeper.png"/></router-link> 
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