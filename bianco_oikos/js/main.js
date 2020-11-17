'use strict';

console.clear();

/*--------------------------------------
  Staggering transition

  - Il componente accetta un attributo "target" 
  a cui passare il selettore dell'elemento 
  figlio da animare
  - È necessario dare un attributo data-index
  agli elementi della lista
--------------------------------------*/
Vue.component('staggering-transition', {
  template: '\n    <transition-group\n      appear\n      name="stagger"\n      mode="out-in"\n      tag="div"\n      v-on:before-enter="beforeEnter"\n      v-on:enter="enter"\n    >\n      <slot></slot>\n    </transition-group>\n  ',
  props: {
    'target': {
      type: String,
      required: false
    }
  },
  methods: {
    beforeEnter: function beforeEnter(el) {
      var animEl = el.querySelector(this.target) || el;
      animEl.style.opacity = 0;
    },
    enter: function enter(el) {
      var animEl = el.querySelector(this.target) || el;
      console.log(animEl);
      anime({
        targets: animEl,
        opacity: 1,
        duration: 1000,
        translateY: [30, 0],
        easing: 'easeInOutBack',
        delay: function delay(item) {
          return el.dataset.index * 100;
        },
        complete: function complete(anim) {
          animEl.style.opacity = '';
          animEl.style.transform = '';
        }
      });
    }
  }
});

/*--------------------------------------
  Breadcrumb
--------------------------------------*/
Vue.component('breadcrumb', {
  template: '\n    <transition appear name="breadcrumb" mode="out-in">\n      <section \n        class="container-fluid breadcrumb__wrap"\n        v-if="stageObj.stageType !== \'main-menu\' && stageObj.stageType !== undefined"\n      >\n        <ol class="breadcrumb">\n          <li class="breadcrumb-item" v-for="item, index in pathArr" :key="\'item-\' + index">\n            \n            <!-- Main menu -->\n            <a href="" class="breadcrumb__home" @click.prevent="pathGoto(item.id)" v-if="index === 0" :title="item.id"> \n              <span class="breadcrumb__home-icon">\n                <img src="img/icons/home.png" alt="" />\n              </span>\n              <span class="breadcrumb__home-text"> {{ item.label || item.title }} </span>\n            </a>\n\n            <!-- Links -->\n            <a href="" \n              @click.prevent="pathGoto(item.id)"            \n              :title="item.id" \n              v-if="index !== 0 && index !== pathArr.length-1"> \n                {{ item.label || item.title }} \n            </a>\n\n            <!-- Current -->\n            <span v-if="index === pathArr.length-1"> {{ item.label || item.title }} </span>\n\n          </li>\n        </ol>\n      </section>\n    </transition>\n  ',
  props: {
    stageObj: {
      type: Object,
      required: true
    },
    pathArr: {
      type: Array,
      required: true
    }
  },
  methods: {
    pathGoto: function pathGoto(stageId) {
      // debugger;
      this.$emit('goto', stageId);
    }
  },
  created: function created() {
    console.log('created', this.stageObj.stageType);
  },
  mounted: function mounted() {
    console.log('mounted', this.stageObj.stageType);
  }
});

/*--------------------------------------
  Background
--------------------------------------*/
Vue.component('background', {
  template: '\n    <div class="main-bg" :style="\'background-image:url(\' + (image || defaultImg) + \'); padding-top: \' + offset + \'px\'">\n      <div class="main-bg__overlay py-5">\n        <div class="container-fluid" :style="\'transform: translateY(-\' + offset + \'px)\'">\n          <slot></slot>\n        </div>\n      </div>\n    </div>\n  ',
  data: function data() {
    return {
      defaultImg: 'img/bg/main-menu.jpg'
    };
  },

  props: {
    'image': {
      type: String,
      required: false
    },
    'offset': {
      type: String,
      required: false
    }
  }
});

/*--------------------------------------
  Product tile
--------------------------------------*/
Vue.component('product-tile', {
  template: '\n    <div>\n      <a \n        v-if="prodObj"\n        :href="prodObj.link" \n        :title="prodObj.title" \n        :style="\'background-image:url(\' + prodObj.image || defaultImage + \')\'"\n        class="prod-tile" \n        target="_blank"\n      >\n        <h5 class="prod-tile__name" v-html="makeStrong(prodObj.title)"></h5>\n        <ul class="prod-tile__chars">\n          <li class="prod-tile__char" v-html="char" v-for="char in prodObj.cars.split(\',\')"></li>\n        </ul> \n      </a>\n      <span v-if="!prodObj"> Product data for {{ prodId }} not found! </span>\n    </div>\n  ',
  props: {
    prodId: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      defaultImage: 'https://cdn.pbrd.co/images/H7K0EKc.png'
    };
  },

  computed: {
    prodObj: function prodObj() {
      var _this = this;

      return this.$root.prodsJSON.filter(function (item) {
        return item.id === _this.prodId;
      })[0];
    }
  },
  methods: {
    makeStrong: function makeStrong(name) {
      return name.toLowerCase().replace('bianco', '<strong>bianco</strong>');
    }
  }
});

/*--------------------------------------
  Slider component
--------------------------------------*/
Vue.component('slider', {
  template: '\n    <div class="prods-slider">\n      <div v-for="slide in slides"> \n        <product-tile :prodId="slide"></product-tile>\n      </div>\n    </div>\n  ',
  props: {
    'slides': {
      type: Array,
      required: true
    }
  },
  data: function data() {
    return {
      sliderOptions: {
        dots: true,
        arrows: false,
        mobileFirst: true,
        infinite: false,
        variableWidth: true,
        slidesToShow: 1,
        responsive: [{
          breakpoint: 768,
          settings: {
            // slidesToShow: 3
            dots: false
          }
        }]
      }
    };
  },

  methods: {
    initSlider: function initSlider() {
      $(this.$el).slick(this.sliderOptions);
    },
    destroySlider: function destroySlider() {
      $(this.$el).slick('unslick');
    }
  },
  mounted: function mounted() {
    this.initSlider();
  },

  watch: {
    slides: function slides() {
      var _this2 = this;

      this.destroySlider();
      Vue.nextTick(function () {
        _this2.initSlider();
      });
    }
  }
});

/*--------------------------------------
  Main menu item
--------------------------------------*/
Vue.component('main-menu-item', {
  template: '\n    <article\n      class="main-menu__item"\n      :style="\'background-image: url(\' + settore.image + \')\'"\n      @click="setNextStage(settore.nextStage)"\n      >\n      <div class="main-menu__content">\n        <h3 class="main-menu__title">\n          {{ settore.label }}\n        </h3>\n        <p class="main-menu__abstract">\n          {{ settore.abstract }}\n        </p>\n      </div>\n    </article>',

  props: {
    'settore': {
      type: Object,
      required: true
    },
    'setNextStage': {
      type: Function,
      required: true
    }
  }
});

/* --------------------------------------
  Main Menu 
---------------------------------------*/
Vue.component('main-menu', {
  template: '\n    <section class="main-menu">\n      <div class="container-fluid">\n        <h1 v-html="stageObj.title" class="main-menu__main-title my-2 mb-lg-5"></h1>  \n      </div>\n\n      <background     \n        :image="stageObj.backgroundImage"\n        offset="200"\n      >               \n\n        <staggering-transition target=".transition-item" class="row main-menu__items">\n          \n          <div \n            class="col-md-4"\n            :key="\'item-\' + index"\n            v-for="settore, index in stageObj.data"\n            :data-index="index"\n          >\n            <div class="transition-item">\n              <main-menu-item \n                :settore="settore"\n                :setNextStage="setNextStage"\n              >\n              </main-menu-item>\n            </div>\n          </div>\n        </staggering-transition>\n\n      </background>\n    </section>\n  ',
  props: {
    stageObj: {
      type: Object,
      required: true
    }
  },
  methods: {
    setNextStage: function setNextStage(id) {
      this.$emit('nextstage', id);
    }
  }
});

/* --------------------------------------
  Stage header
---------------------------------------*/
Vue.component('stage-header', {
  template: '\n    <header class="stage__header container-fluid mt-3 mb-4 my-5">\n      <slot></slot>\n    </header>\n  ',
  props: {
    text: String,
    required: true
  }
});

/* --------------------------------------
  Question text
---------------------------------------*/
Vue.component('question-text', {
  template: '\n    <h3 class="question__text mt-2 mt-lg-5 mb-1 mb-lg-4">\n      <slot></slot>\n    </h3>\n  '
});

/* --------------------------------------
  Stage title
---------------------------------------*/
Vue.component('stage-title', {
  template: '\n    <h3 class="stage__title">\n      <slot></slot>\n    </h3>\n  '
});

/* --------------------------------------
  Stage abstract
---------------------------------------*/
Vue.component('stage-abstract', {
  template: '\n    <div class="stage__abstract" v-html="html"></div>\n  ',
  props: {
    html: String,
    required: true
  }
});

/* --------------------------------------
  Question
---------------------------------------*/
Vue.component('question', {
  template: '\n    <div class="question">\n\n      <stage-header>\n        <question-text> \n          {{ stageObj.questionText }} \n        </question-text>\n        <stage-abstract v-if="stageObj.abstract" :html="stageObj.abstract"></stage-abstract>\n      </stage-header>\n\n      <background :image="stageObj.backgroundImage" offset="190">\n        <staggering-transition class="row" target=".transition-item">\n          <div class="col-sm-6" v-for="q, index in stageObj.options" :data-index="index" :key="\'item-\' + index">\n            <div class="transition-item">\n              <article class="choice" @click="setNextStage(q.nextStage)"> \n                <img :src="q.iconUrl" alt="" class="choice__icon" v-if="q.iconUrl" />\n                <div>\n                  <h5 class="choice__title">{{ q.title }}</h5>\n                  <p class="choice__help-text">{{ q.helpText }}</p>\n                </div> \n              </article> \n            </div>\n          </div>\n        </staggering-transition>\n      </background>\n\n\n    </div>',
  props: {
    stageObj: {
      type: Object,
      required: true
    }
  },
  methods: {
    setNextStage: function setNextStage(id) {
      this.$emit('nextstage', id);
    }
  }
});

/* --------------------------------------
  Grid choice
---------------------------------------*/
Vue.component('grid-choice', {
  template: '\n    <div class="grid">\n\n      <stage-header>\n        <question-text> \n          {{ stageObj.questionText }} \n        </question-text>\n        <stage-abstract v-if="stageObj.abstract" :html="stageObj.abstract"></stage-abstract>\n      </stage-header>\n\n      <background :image="stageObj.backgroundImage" offset="190">\n        <staggering-transition class="row" target=".transition-item">\n          <div class="col-sm-6 col-md-4" v-for="q, index in stageObj.options" :key="index" :data-index="index">\n            <div class="transition-item">\n              <article class="choice" @click="setNextStage(q.nextStage)"> \n                <img :src="q.iconUrl" alt="" class="choice__icon" v-if="q.iconUrl" />\n                <div>\n                  <h5 class="choice__title">{{ q.title }}</h5>\n                  <p class="choice__help-text">{{ q.helpText }}</p>\n                </div> \n              </article> \n            </div>\n          </div>\n        </staggering-transition>\n      </background>\n\n    </div>',
  props: {
    stageObj: {
      type: Object,
      required: true
    }
  },
  methods: {
    setNextStage: function setNextStage(id) {
      this.$emit('nextstage', id);
    }
  }
});

/* --------------------------------------
  Accordion item
---------------------------------------*/
Vue.component('accordion-item', {
  template: '\n    <div :data-expanded="isExpanded">\n      <div class="card">\n        <div class="card-header" :class="{\'card-header--active\': isExpanded}">\n          <button data-toggle="collapse" :data-target="\'#q--\' + index" @click="toggleItem(index)">\n            {{ esigenza.label }}\n            <i class="fa fa-caret-down pull-right" v-if="!isExpanded" aria-hidden="true"></i>\n            <i class="fa fa-caret-up pull-right" v-if="isExpanded" aria-hidden="true"></i>\n          </button>\n        </div>\n      </div>\n      <div :id="\'q--\' + index" class="collapse" data-parent="#accordion">\n        <div class="accordion__content">\n          <div class="accordion__block mb-4" v-for="block in esigenza.blocks">\n\n            <!-- Text -->\n            <div v-if="block.type === \'text\'" class="copy-max-width">\n              <h4 v-text="block.title" class="cont-block__title"></h4>\n              <div v-html="block.html" class="mb-5"></div>\n            </div>\n\n            <!-- Products -->\n            <div v-if="block.type === \'products\'">\n              <h4 v-text="block.title" class="cont-block__title"></h4>\n              <div v-html="block.html" class="mb-5"></div>\n              <div class="accordion__products">\n\n                <!-- Links -->\n                <div class="mb-5" v-for="prod in block.prods" v-if="prod.type === \'links\'">\n                  <h5 class="mb-3" v-text="prod.title"></h5>\n                  <div>\n                    <a href="" class="btn btn--white" title="" target="_blank" v-text="item.label" v-for="item in prod.items"></a>\n                  </div>\n                </div>\n\n                <!-- Prods -->\n                <div class="mb-4" v-for="prod in block.prods" v-if="prod.type === \'prods\'">\n                  <h5 class="mb-3" v-text="prod.title"></h5>\n                  <slider :slides="prod.items"></slider>\n                </div>                \n                \n              </div>\n            </div>\n\n          </div>\n        </div>\n      </div>\n    </div>\n  ',
  props: {
    'esigenza': {
      type: Object,
      required: true
    },
    'index': {
      type: Number,
      required: true
    },
    'activeIndex': {
      // type: Number,
      required: true
    }
  },
  data: function data() {
    return {
      isExpanded: false
    };
  },

  watch: {
    activeIndex: function activeIndex() {
      this.isExpanded = this.index === this.activeIndex ? true : false;
    }
  },
  methods: {
    toggleItem: function toggleItem(index) {
      this.isExpanded = !this.isExpanded;
      this.$emit('open', index);
    }
  }
});

/* --------------------------------------
  Accordion
---------------------------------------*/
Vue.component('accordion', {
  template: '\n    <div class="stage">\n\n      <stage-header>\n        <stage-title> {{ stageObj.title }} </stage-title>\n        <stage-abstract v-if="stageObj.abstract" :html="stageObj.abstract"></stage-abstract>\n      </stage-header>\n        \n      <background :image="stageObj.backgroundImage">\n\n        <div class="filter py-3">\n          <div class="filter__wrap">\n            <input type="text" class="" placeholder="Cerca parola chiave" v-model="filterKey">\n            <span class="filter__icon">\n              <img src="img/icons/lens.svg" alt=""> \n            </span>\n          </div>\n        </div>\n\n        <transition-group tag="div">\n          <div class="accordion" id="accordion" key="accordion">\n\n            <accordion-item \n              v-for="esigenza, index in esigenzeFiltered" :key="\'q-\' + index"\n              :esigenza="esigenza" \n              :index="index"\n              :active-index="activeIndex"\n              v-on:open="setActiveIndex"\n            >\n            </accordion-item>\n\n          </div>\n        </transition-group>\n      </background>\n\n    </div>\n  ',
  data: function data() {
    return {
      filterKey: '',
      activeIndex: undefined
    };
  },

  computed: {
    esigenzeInitial: function esigenzeInitial() {
      return this.stageObj.data;
    },
    esigenzeFiltered: function esigenzeFiltered() {
      var vm = this;
      return vm.esigenzeInitial.filter(function (item) {
        return item.label.indexOf(vm.filterKey) !== -1;
      });
    }
  },
  props: {
    stageObj: {
      type: Object,
      required: true
    }
  },
  methods: {
    setActiveIndex: function setActiveIndex(ev) {
      this.activeIndex = ev;
    }
  }
});

/* --------------------------------------
  Products
---------------------------------------*/
Vue.component('products', {
  template: '\n    <div class="products">\n    \n      <stage-header> \n        <stage-title> {{ stageObj.title }} </stage-title>\n        <stage-abstract v-if="stageObj.abstract" :html="stageObj.abstract"></stage-abstract>\n      </stage-header>\n\n      <background :image="stageObj.backgroundImage">\n    \n        <div v-for="block in stageObj.blocks" class="cont-block mb-5">\n          <h4 class="cont-block__title"> {{ block.title }} </h4>\n          <div v-if="block.type === \'links\'">\n            <a :href="link.href" class="btn btn--white" \n              v-for="link in block.links" \n              :title="link.label" target="_blank"\n            > \n              {{ link.label}} \n              <i class="fa fa-sign-out ml-2" aria-hidden="true"></i>\n            </a>\n          </div>\n\n          <div v-if="block.type === \'prods\'">\n            <slider :slides="block.prods"></slider>            \n          </div>\n        </div>\n\n\n\n        <ul class="nav nav-tabs" id="myTab" role="tablist" v-if="stageObj.tabs">\n          <li class="nav-item" v-for="tabItem, i in stageObj.tabs">\n            <a \n              class="nav-link" \n              :class="{\'active\': i === 0}"\n              id="home-tab" \n              data-toggle="tab" \n              :href="\'#\' + tabItem.id" \n              role="tab"\n            >\n              {{ tabItem.label }}\n            </a>\n          </li>\n        </ul>\n        <div class="tab-content" id="myTabContent">\n          <div \n            class="tab-pane fade"\n            :class="{ \'show\': j === 0, \'active\': j === 0 }"\n            :id="tabItem.id" \n            role="tabpanel" \n            v-for="tabItem, j in stageObj.tabs"\n          >\n            <div v-for="block in tabItem.blocks">\n              <h4 class="cont-block__title"> {{ block.title }} </h4>\n              <div v-if="block.type === \'links\'">\n                <a :href="link.href" class="btn btn--white" v-for="link in block.links" :title="link.label" target="_blank"> {{ link.label}} </a>\n              </div>\n              <div v-if="block.type === \'prods\'">\n                \n                <slider :slides="block.prods"></slider>\n\n              </div>\n            </div>\n          </div>\n        </div>\n\n      </background>\n\n    </div>',
  props: {
    stageObj: {
      type: Object,
      required: true
    }
  },
  data: function data() {
    return {
      prodsJSON: null
    };
  },

  methods: {
    setNextStage: function setNextStage(id) {
      this.$emit('nextstage', id);
    }
  }
});

/* --------------------------------------
  Main app
---------------------------------------*/
var app = new Vue({
  el: '.app',
  data: {
    mainMenu: undefined,
    currentStage: {},
    pathArr: [],
    prodsJSON: null
  },
  computed: {},
  methods: {
    getStageObj: function getStageObj(id) {
      var vm = this;
      $.getJSON('data/' + id + '.json').done(function (data) {
        vm.currentStage = data;
        vm.pathArr.push({
          id: id,
          label: data.pathName
        });
        $('html, body').animate({ scrollTop: 0 });
      }).fail(function (err) {
        alert(err.responseText);
      });
    },
    nextStage: function nextStage(id) {
      var vm = this;
      vm.getStageObj(id);
    },
    pathGoto: function pathGoto(id) {
      var idIndex = this.pathArr.reduce(function (tot, curr, i) {
        curr.id === id ? tot = i : null;
        return tot;
      });
      this.pathArr = this.pathArr.slice(0, idIndex);
      this.getStageObj(id);
    }
  },

  mounted: function mounted() {
    var vm = this;
    this.getStageObj('main-menu');

    $.get('https://www.biancoikos.com/Products').done(function (data) {
      vm.prodsJSON = data;
    }).fail(function (err) {
      return alert(err);
    });
  }
});