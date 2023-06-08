const IconPdf = {
	props: {
		width: {
			type: Number,
		}
	},
	template: "#icon-pdf-tpl",
};

const PdfObj = {
	props: {
		pdf: {
			type: String,
		}
	},
	template: "#pdf-obj-tpl",
};

const appConfig = {
	data() {
		return {
			posts: [],
			openPost: {}
		};
	},
	methods: {
		setOpenPost(post) {
			this.openPost = post;			
		}
	}, 
	async mounted() {
		try {
			const postsResp = await fetch("pdf/posts.json");
			this.posts = await postsResp.json();
			this.openPost = this.posts[0];
		} catch (err) {
			console.error(err);
		}
	}
};


const app = Vue.createApp(appConfig);

app.component('icon-pdf', IconPdf);
app.component('pdf-obj', PdfObj);
app.mount('#app');


