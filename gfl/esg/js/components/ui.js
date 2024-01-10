const UI_COMPONENTS = {};

UI_COMPONENTS.ArticleAuthor = {
    props: {
        author: {
            default: "Redazione",
            type: String,
            required: true,
        },
        authorInfo: {
            type: String,
            required: false,
        },
        date: {
            type: String,
            required: false,
        },
    },
    template: "#article-author-tpl",
};


UI_COMPONENTS.ApprofondisciCard = {
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    template: "#approfondisci-card-tpl",
};


UI_COMPONENTS.CarouselSection = {
    props: {
        articles: Array,
        id: String,
        carouselDescription: String,
        carouselTitle: String,
        carouselType: {
            type: String,
            required: true,
        }
    },
    computed: {
        slidesCount() {
            return Math.floor(this.articles / 3);
        }
    },
    data() {
        return {
            paginatedArticles: []
        }
    },
    mounted() {
        this.paginatedArticles = this.articles.reduce((tot, curr, index) => {
            const currentPage = Math.floor(index / 3);
            
            if (!tot[currentPage]) {
                tot[currentPage] = [];
            }

            tot[currentPage].push(curr);
            return tot;

        }, []);
    },
    template: "#carousel-section-tpl",
};


UI_COMPONENTS.HeroSection = {
    props: {
        articleInfo: {
            type: Object,
            required: false
        },
        category: {
            type: Object,
            required: true
        },
        section: {
            type: Object,
            required: true
        },
    },
    template: "#hero-section-tpl",
};


UI_COMPONENTS.LoadingIcon = {
    template: "#loading-icon-tpl",
};


UI_COMPONENTS.SceltipervoiCard = {
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    template: "#sceltipervoi-card-tpl",
};


UI_COMPONENTS.InPrimoPianoCard = {
    props: {
        article: {
            type: Object,
            required: true
        },
        category: {
            type: Object,
            required: false
        },
    },
    methods: {
        getCategoryCode() {
            return this.category ? this.category.name.charAt(0).toUpperCase() : "";
        }
    },
    template: "#inprimopiano-card-tpl",
};


UI_COMPONENTS.DefaultCard = {
    props: {
        article: {
            type: Object,
            required: true
        },
        category: {
            type: Object,
            required: false
        },
    },
    methods: {
        getCategoryCode() {
            return this.category ? this.category.name.charAt(0).toUpperCase() : "";
        }
    },
    template: "#default-card-tpl",
};

UI_COMPONENTS.VideoCard = {
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    template: "#video-card-tpl",
};


export default UI_COMPONENTS;

 