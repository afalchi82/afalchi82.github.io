const UI_COMPONENTS = {};

UI_COMPONENTS.ArticleCard = {
    props: {
        article: {
            type: Object,
            required: true
        },
        category: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            message: 'Hello, world!'
        };
    },
    template: "#article-card-tpl",
};

UI_COMPONENTS.CarouselSection = {
    props: {
        id: String,
        title: String
    },
    template: "#carousel-section-tpl",
};

UI_COMPONENTS.CatArticle = {
    props: {
        article: {
            type: Object,
            required: true
        },
        category: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
    },
    template: "#cat-article-tpl",
};

UI_COMPONENTS.HeroSection = {
    props: {
        title: String
    },
    template: "#hero-section-tpl",
};

UI_COMPONENTS.LoadingIcon = {
    template: "#loading-icon-tpl",
};


export default UI_COMPONENTS;

 