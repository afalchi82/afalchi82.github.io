const UTILS = {};

const encodeArticleUrl = (title) => {
    return title.replaceAll(/[^\w\s]/ig, "-").replaceAll(/\s/g, "-").toLowerCase();
};

UTILS.ellipsis = (abstract, maxLength = 160) => {
    return abstract.slice(0, maxLength) + '...';
};

UTILS.fetchData = async (url) => {
    try {
        const dataResp = await fetch(url);

        if (dataResp.status !== 200) {
            console.error(url + " non trovato.")
            return;
        }

        return await dataResp.json();
    } catch (err) {
        console.error("Error loading data.");
    }
};

UTILS.categories = [
    {
        name: 'environmental',
        label: 'Environmental',
    },
    {
        name: 'social',
        label: 'Social',
    },
    {
        name: 'governance',
        label: 'Governance',
    },
];

UTILS.getCategoryFromName = (category) => {
    return UTILS.categories.find(item => item.name === category);
};

UTILS.sortByDate = (articles) => {
    const articlesClone = [...articles];
    const dateStringForCompare = date => date.split("/").reverse().join("");
    
    return articlesClone.sort((a, b) => {
        const dateA = a.date ? dateStringForCompare(a.date) : 0;
        const dateB = b.date ? dateStringForCompare(b.date) : 0;
        return dateB - dateA;
    });
};

UTILS.sections = [
    {
        name: 'video',
        label: 'Video'
    },
    {
        name: 'in-primo-piano',
        label: 'In primo piano'
    },
];

UTILS.sources = [
    {
        id: 'ius-societario',
        label: 'Ius – Societario',
        url: 'https://ius.giuffrefl.it/'
    },
    {
        id: 'ius-ue',
        label: 'Ius – UE e internazionale',
        url: 'https://ius.giuffrefl.it/sezione/195/ue-internazionale/'
    },
    {
        id: 'mementopiu',
        label: 'MementoPiù',
        url: 'https://mementopiu.it/'
    },
    {
        id: 'mementopiu-lavoro',
        label: 'MementoPiù Expert Solution Lavoro',
        url: 'https://mementopiu.it/lavoro'
    },
    {
        id: 'quotidianopiu',
        label: 'QuotidianoPiù',
        url: 'https://www.quotidianopiu.it/'
    },
];

export default UTILS;