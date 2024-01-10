import UI_COMPONENTS from "./components/ui.js";
import PAGE_COMPONENTS from "./components/pages.js";
import UTILS from "./utils.js";
import VueGtag from 'https://cdn.jsdelivr.net/npm/vue-gtag@2.0.1/+esm'



/* -------------------------------------------------- 
    Init
-------------------------------------------------- */

const routes = [
    {
        path: '/',
        component: PAGE_COMPONENTS.HomePage,
    },
    {
        path: '/:section',
        component: PAGE_COMPONENTS.CategoryPage,
    },
    {
        path: '/in-primo-piano/:category',
        component: PAGE_COMPONENTS.CategoryPage,
    },
    {
        path: '/video/:article',
        component: PAGE_COMPONENTS.ArticlePage,
    },
    {
        path: '/:section/:category/:article',
        component: PAGE_COMPONENTS.ArticlePage,
    },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});

const appConfig = {
    data() {
        return {
            isMobile: false,
            mobileMenuOpen: false
        };
    },
    mounted() {
        const checkMobile = () => {
            if (window.matchMedia("(min-width: 768px)").matches) {
                this.isMobile = false;
                this.mobileMenuOpen = false;
            } else {
                this.isMobile = true;
            }
        }

        window.addEventListener('resize', checkMobile);

        checkMobile();
    },
    watch: {
        '$route'(to, from) {
            this.currentRoute = to.path
        }
    }
};


const app = Vue.createApp(appConfig);

app.config.globalProperties.utils = UTILS;
app.config.globalProperties.categories = UTILS.categories;
app.config.globalProperties.sections = UTILS.sections;
app.config.globalProperties.sources = UTILS.sources;

app.component('home-page', PAGE_COMPONENTS.HomePage);
app.component('category-page', PAGE_COMPONENTS.CategoryPage);
app.component('article-page', PAGE_COMPONENTS.ArticlePage);
app.component('not-found-page', PAGE_COMPONENTS.NotFoundPage);

app.component('article-author', UI_COMPONENTS.ArticleAuthor);
app.component('approfondisci-card', UI_COMPONENTS.ApprofondisciCard);
app.component('carousel-section', UI_COMPONENTS.CarouselSection);
app.component('inprimopiano-card', UI_COMPONENTS.InPrimoPianoCard);
app.component('loading-icon', UI_COMPONENTS.LoadingIcon);
app.component('hero-section', UI_COMPONENTS.HeroSection);
app.component('sceltipervoi-card', UI_COMPONENTS.SceltipervoiCard);
app.component('default-card', UI_COMPONENTS.DefaultCard);
app.component('video-card', UI_COMPONENTS.VideoCard);

app.use(VueGtag, {
    config: { id: "GTM-NW2RPVV" },
    router
});
app.use(router);
app.mount('#app');



