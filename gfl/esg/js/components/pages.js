const PAGE_COMPONENTS = {};

PAGE_COMPONENTS.HomePage = {
    data() {
        return {
            heroVideo: {},
            loading: true,
            sceltiPerVoiArticles: [],
            inPrimoPianoArticles: [],
        }
    },
    async mounted() {
        const inPrimoPianoArticles = await this.utils.fetchData('articles/in-primo-piano.json');
        this.inPrimoPianoArticlesHome = inPrimoPianoArticles.filter(art => !art.hidden).filter(item => item.homeIndex).sort((a, b) => a.homeIndex - b.homeIndex);
        
        this.approfondisciArticles = await this.utils.fetchData('articles/approfondisci.json');
        this.sceltiPerVoiArticles = await this.utils.fetchData('articles/scelti-per-voi.json');
        this.heroVideo = inPrimoPianoArticles.find(item => item.videoHome);

        this.loading = false;
    },
    template: "#home-page-tpl",
};


PAGE_COMPONENTS.CategoryPage = {
    data() {
        return {
            articles: [],
            category: {},
            loading: true,
            section: {},
        }
    },
    methods: {
        async updateData() {
            this.category = this.categories.find(item => item.name === this.$route.params.category) || {};
            this.section = this.sections.find(item => item.name === (this.$route.params.section || this.$route.path.split('/')[1]));
            
            const articlesResp = await fetch(`articles/${ this.section.name }.json`);
            const articlesJson = await articlesResp.json();
            this.articles = this.$route.params.category ? articlesJson.filter(item => item.category === this.$route.params.category) : articlesJson;

            this.articles = this.utils.sortByDate(this.articles);
            this.articles = this.articles.filter(art => !art.hidden);
            this.loading = false;
        }        
    },
    mounted() {
        this.updateData();
    },
    watch: {
        $route(to, from) {
            this.updateData();
        }
    },
    template: "#category-page-tpl",
};

PAGE_COMPONENTS.ArticlePage = {
    data() {
        return {
            article: "",
            articleInfo: {},
            articles: [],
            category: {},
            loading: true,
            section: {},
        };
    },
    methods: {
        getSource() {
            const source = this.sources.find(item => item.id === this.articleInfo.source);
            if (!source) return null;            
            return source;
        },
        async updateData() {
            this.category = this.categories.find(cat => cat.name === this.$route.params.category) || {};
            this.section = this.sections.find(item => item.name === (this.$route.params.section || this.$route.path.split('/')[1]));

            this.articles = await this.utils.fetchData(`articles/${ this.section.name }.json`);        
            const articleResp = await fetch(`articles/${ this.section.name }/${ this.$route.params.article }.html`);

            this.articleInfo = this.articles.find(item => item.url === this.$route.params.article);    
            this.article = await articleResp.text();    
            this.articleSource = this.getSource();
            this.loading = false;
        },
    },
    async mounted() {
        this.updateData();
    },
    watch: {
        $route(to, from) {
            this.updateData();
        }
    },
    template: "#article-page-tpl",
};

PAGE_COMPONENTS.NotFoundPage = {
    props: {
        article: Object
    },
    data() {
        return {};
    },
    template: `<h1 class="text-center my-5">Pagina non trovata</h1>`,
};

export default PAGE_COMPONENTS;

