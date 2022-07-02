export default {
  template: `
    <header class="app-header ">
        <div class="logo">
        <router-link to="/" class="nav-link">
           <img src="img/hourse.jpg"/></router-link>
           <h1>Apssus</h1>
          </div>
        <nav class="nav-bar">
          <button @click="toggleMenu = !toggleMenu">
            <i class="fa-solid fa-bars"
            class="nav-menu">
            </i></button>
            <transition>
                <div v-if="toggleMenu" class="app-navigation" @click="toggleMenu = false">
                  <router-link to="/" class="nav-link">
                     <img src="img/home.png"/></router-link>
                  <router-link to="/book" class="nav-link">
                     <img src="img/book.jpg"/></router-link>
                  <router-link to="/email" class="nav-link">
                    <img src="img/email.png"/></router-link>
                  <router-link to="/keeper" class="nav-link">
                    <img src="img/keeper.png"/></router-link> 
                </div>
            </transition>
        </nav>
    </header>
   `,
  data() {
    return {
      toggleMenu: false,
    }
  },
  methods: {},
  computed: {}
}