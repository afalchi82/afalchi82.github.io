'use strict';

console.clear();

/*--------------------------------------
  Background
--------------------------------------*/
Vue.component('background', {
  template: '\n    <div class="main-bg">\n      <div class="container-fluid">\n        <slot></slot>\n      </div>\n    </div>\n  '
});

/*--------------------------------------
  Product tile
--------------------------------------*/
Vue.component('product-tile', {
  template: '<strong>Gianni is Cool!</strong>'
});

/*--------------------------------------
  Slider component
--------------------------------------*/
Vue.component('slider', {
  template: '\n    <div class="slider">\n      Slider:\n      <div v-for="slide in slides"> \n        <article> {{ slide }} </article>\n      </div>\n    </div>\n  ',
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
        responsive: [{
          breakpoint: 768,
          settings: {
            // slidesToShow: 3
            variableWidth: true
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
    console.log('Slider mounted');
  },

  watch: {
    slides: function slides() {
      var _this = this;

      this.destroySlider();
      Vue.nextTick(function () {
        _this.initSlider();
      });
    }
  }
});

/* --------------------------------------
  Main Menu 
---------------------------------------*/
Vue.component('main-menu', {
  template: '\n    <section class="main-menu">\n      <div class="container-fluid">\n        <h1 v-html="stageObj.title" class="main-menu__main-title"></h1>  \n      </div>\n      <background>      \n\n        <div class="row">\n          <div class="col-md-4">Gianni</div>\n          <div class="col-md-4">Gianni</div>\n          <div class="col-md-4">Gianni</div>\n        </div>\n        <div class="row main-menu__items">\n          <div class="col-md-4">\n            <div\n              class="main-menu__item col-md-4"\n              v-for="settore, index in stageObj.data"\n              :style="\'background-image: url(\' + settore.image + \')\'"\n              :key="\'item-\' + index"\n              @click="setNextStage(settore.nextStage)"\n              >\n              <div class="main-menu__content">\n                <h3 class="main-menu__title">\n                  {{ settore.label }}\n                </h3>\n                <p class="main-menu__abstract">\n                  {{ settore.abstract }}\n                </p>\n              </div>\n            </div>\n          </div>\n        </div>\n      </background>\n    </section>\n  ',
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
  Question
---------------------------------------*/
Vue.component('question', {
  template: '\n    <div class="question">\n      <h3> {{ stageObj.questionText }}</h3>\n      <div v-for="q in stageObj.options">\n        <a class="btn btn-primary" @click="setNextStage(q.nextStage)"> {{ q.title }} </a> \n      </div>\n    </div>',
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
  template: '\n    <div class="grid">\n      <h3> {{ stageObj.questionText }}</h3>\n      <div v-for="q in stageObj.options">\n        <a class="btn btn-primary" @click="setNextStage(q.nextStage)"> {{ q.title }} </a> \n      </div>\n    </div>',
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
  Accordion
---------------------------------------*/
Vue.component('accordion', {
  template: '\n    <div class="stage" id="accordion">\n\n      <header>\n        <h3>Esigenze</h3>\n        {{ stageObj.stageType }}\n        <input type="text" class="form-control mb-2" placeholder="Cerca parola chiave" v-model="filterKey">\n      </header>\n\n      <transition-group>\n        <div v-for="esigenza, index in esigenzeFiltered" :key="\'q-\' + index">\n          <div class="card">\n            <div class="card-header">\n              <button data-toggle="collapse" :data-target="\'#q--\' + index" >\n                {{ esigenza.label }}\n              </button>\n            </div>\n          </div>\n          <div :id="\'q--\' + index" class="collapse" data-parent="#accordion">\n            <div v-for="block in esigenza.content">\n\n              <!-- Abstract -->\n              <div v-if="block.type === \'abstract\'">\n                <div v-html="block.html"></div>\n              </div>\n\n              <!-- Consigli -->\n              <div v-if="block.type === \'consigli\'">\n                <h4 v-text="block.title"></h4>\n                <div v-html="block.html"></div>\n              </div>\n\n              <!-- Prodotti -->\n              <div v-if="block.type === \'prodotti\'">\n                <h4 v-text="block.title"></h4>\n                <div v-html="block.html"></div>\n                <table>\n                  <tr v-for="prod in block.prods">\n                    <td>\n\n                    </td>\n                  </tr>\n                </table>\n              </div>\n\n            </div>\n          </div>\n        </div>\n      </transition-group>\n\n    </div>\n  ',
  data: function data() {
    return {
      filterKey: '',
      prodsLibrary: prods
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
    },
    nextStage: {
      type: Function,
      required: true
    }
  }
});

/* --------------------------------------
  Products
---------------------------------------*/
Vue.component('products', {
  template: '\n    <div class="products">\n      <h3> {{ stageObj.title }}</h3>\n      <div v-html="stageObj.abstract"></div>\n      <div v-for="block in stageObj.blocks">\n        <h4> {{ block.title }} </h4>\n        <div v-if="block.type === \'links\'">\n          <a :href="link.href" v-for="link in block.links" :title="link.label" target="_blank"> {{ link.label}} </a>\n        </div>\n        <div v-if="block.type === \'prods\'">\n\n         <slider :slides="block.prods"></slider>\n\n\n\n          <a \n            :href="prod.href" \n            v-for="prod in block.prods" \n            :title="prod" \n            target="_blank"\n            v-if="prodsLib[prod]"\n          >  \n            {{ prodsLib[prod].name }} \n          </a>\n        </div>\n      </div>\n\n\n\n      <ul class="nav nav-tabs" id="myTab" role="tablist" v-if="stageObj.tabs">\n        <li class="nav-item" v-for="tabItem, i in stageObj.tabs">\n          <a \n            class="nav-link" \n            :class="{\'active\': i === 0}"\n            id="home-tab" \n            data-toggle="tab" \n            :href="\'#\' + tabItem.id" \n            role="tab"\n          >\n            {{ tabItem.label }}\n          </a>\n        </li>\n      </ul>\n      <div class="tab-content" id="myTabContent">\n        <div \n          class="tab-pane fade"\n          :class="{ \'show\': j === 0, \'active\': j === 0 }"\n          :id="tabItem.id" \n          role="tabpanel" \n          v-for="tabItem, j in stageObj.tabs"\n        >\n          <div v-for="block in tabItem.blocks">\n            <h4> {{ block.title }} </h4>\n            <div v-if="block.type === \'links\'">\n              <a :href="link.href" v-for="link in block.links" :title="link.label" target="_blank"> {{ link.label}} </a>\n            </div>\n            <div v-if="block.type === \'prods\'">\n              \n              <a \n                :href="prod.href" \n                v-for="prod in block.prods" \n                :title="prod" \n                target="_blank"\n                v-if="prodsLib[prod]"\n              >  \n                {{ prodsLib[prod].name }} \n              </a>\n            </div>\n          </div>\n        </div>\n      </div>\n\n\n\n\n\n\n    </div>',
  props: {
    stageObj: {
      type: Object,
      required: true
    },
    prodsLib: {
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
  Main app
---------------------------------------*/
var app = new Vue({
  el: '.app',
  data: {
    mainMenu: undefined,
    currentStage: {},
    path: [],
    prodsLib: {}
  },
  computed: {},
  methods: {

    // TODO: Eliminare
    goNext: function goNext(nextStage) {
      var vm = this;
      vm.currentStage = nextStage;
    },
    getStageObj: function getStageObj(id) {
      var vm = this;
      var JSONdata = $.getJSON('data/' + id + '.json', function (data) {
        // console.log(data);
        vm.currentStage = data;
      });
    },
    nextStage: function nextStage(id) {
      var vm = this;
      // console.log(id);
      vm.getStageObj(id);
      vm.path.push(id);
    },
    pathGoto: function pathGoto(id) {
      var vm = this;

      this.path = this.path.slice(0, this.path.indexOf(id) + 1);
      this.getStageObj(id);

      console.log(vm.path, this.path.indexOf(id));
    }
  },

  mounted: function mounted() {
    var vm = this;

    vm.getStageObj('main-menu');

    // Load products JSON
    $.getJSON('data/products-library.json', function (data) {
      vm.prodsLib = data;
    });
  }
});