import bookApp from './books/views/book-app.cmp.js';
import homePage from './views/home-page.cmp.js';
import aboutPage from './views/about-page.cmp.js';
import bookDetails from './books/views/book-details.cmp.js';
import bookAdd from './books/cmps/book-add.cmp.js';
import emailApp from '../js/apps/email/views/email-app.cmp.js'
import keeperApp from '../js/apps/keeper/views/keeper-app.cmp.js'
// import carEdit from './views/car-edit.cmp.js'
import emailDetails from  '../js/apps/email/views/email-details.cmp.js'


const aboutTeam = {
    template: `
        <section class="about-team">
            <h2>About Our Team</h2>
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate illum cum nam voluptas iste nulla, dolorum blanditiis! Dolorem, rerum libero! Nihil, corrupti rem! Dolorem rem explicabo pariatur nihil quae laboriosam!
            </p>
        </section>
    `
}
const aboutService = {
    template: `
        <section class="about-service">
            <h2>Top Services</h2>
            <p>
            Services bla Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate illum cum nam voluptas iste nulla, dolorum blanditiis! Dolorem, rerum libero! Nihil, corrupti rem! Dolorem rem explicabo pariatur nihil quae laboriosam!
            </p>
        </section>
    `
}


const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage,
        children: [
            {
                path: 'team',
                component: aboutTeam
            },
            {
                path: 'service',
                component: aboutService
            },
        ]
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/email',
        component: emailApp
    },
    {
        path: '/keeper',
        component: keeperApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
    {
        path: '/Add',
        component: bookAdd
    },
    {
        path: '/email/:emailId',
        component: emailDetails
    },

]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})