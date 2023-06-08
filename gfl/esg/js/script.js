import UI_COMPONENTS from "./components/ui.js"; 
import PAGE_COMPONENTS from "./components/pages.js"; 

const categories = [
    {
        code: "E",
        id: "env",
        name: 'environmental',
        label: 'Environmental',
        thumb: "01.jpg"
    },
    {
        code: "S",
        id: "soc",
        name: 'social',
        label: 'Social',
        thumb: "03.jpg"
    },
    {
        code: "G",
        id: "gov",
        name: 'governance',
        label: 'Governance',
        thumb: "05.jpg"
    }
];

const sections = [
    "Home",
    "Environmental",
    "Social",
    "Governance",
];


/* -------------------------------------------------- 
    Init
-------------------------------------------------- */

const routes = [
    {
        path: '/',
        component: PAGE_COMPONENTS.HomePage,
        props: {
            categories
        },
    },
    {
        path: '/:category',
        component: PAGE_COMPONENTS.CategoryPage,
        props: {
            categories
        },
    },
    {
        path: '/:category/:article',
        component: PAGE_COMPONENTS.ArticlePage
    },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

const appConfig = {
    data() {
        return {
            categories,
            sections,
        };
    },
    async mounted() {
        for (const cat of this.categories) {
            try {
                const articlesResp = await fetch(`articles/${ cat.name }/articles.json`);
    
                if (articlesResp.status === 200) {
                    cat.articles = await articlesResp.json();
                }
            } catch (err) {
                console.error("Error loading data.");
            }
        }
    }
};


const app = Vue.createApp(appConfig);

app.component('home-page', PAGE_COMPONENTS.HomePage);
app.component('category-page', PAGE_COMPONENTS.CategoryPage);
app.component('article-page', PAGE_COMPONENTS.ArticlePage);
app.component('not-found-page', PAGE_COMPONENTS.NotFoundPage);

app.component('article-card', UI_COMPONENTS.ArticleCard);
app.component('carousel-section', UI_COMPONENTS.CarouselSection);
app.component('cat-article', UI_COMPONENTS.CatArticle);
app.component('loading-icon', UI_COMPONENTS.LoadingIcon);
app.component('hero-section', UI_COMPONENTS.HeroSection);

app.use(router);
app.mount('#app');



