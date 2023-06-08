const PAGE_COMPONENTS = {};

PAGE_COMPONENTS.HomePage = {
    props: {
        categories: Array
    },
    data() {
        return {
            loading: true,
        }
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

        this.loading = false;
    },
    template: "#home-page-tpl",
};

PAGE_COMPONENTS.CategoryPage = {
    props: {
        categories: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            category: {},
        }
    },
    methods: {
        updateData() {
            this.category = this.categories.find(cat => cat.name === this.$route.params.category);
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
    computed: {
        title() {
            if (!this.article) return "";

            const parser = new DOMParser();
            const articleDom = parser.parseFromString(this.article, "text/html");
            const titleNode = articleDom.getElementById("title").content.cloneNode(true);

            return titleNode.textContent;
        }
    },
    data() {
        return {
            article: "",
            loading: true
        };
    },
    methods: {
        async updateData() {
            const articleResp = await fetch(`articles/${this.$route.params.category}/${this.$route.params.article}.html`);
    
            if (articleResp.status === 200) {
                this.article = await articleResp.text();
            }
    
            this.loading = false;
        },
    },
    mounted() {
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

