'use strict';

/*
  Ogni oggetto stage contiene:
  stageType,
  nextStage
*/

var stageTemplate = {
  id: '[String], stesso nome del file',
  stageType: '[string]'

};

var prods = {
  310: {
    name: 'Bianco 310',
    url: 'link',
    image: 'image'
  },
  313: {
    name: 'Bianco 313',
    url: 'link',
    image: 'image'
  },
  315: {
    name: 'Bianco 315',
    url: 'link',
    image: 'image'
  }
};

/* --------------------------------------
  Composizione percorsi
-------------------------------------- */
var paths = {
  oggetto: ['collocazione', 'materiale', 'prodotti'],
  esigenza: ['esigenze'],
  ambiente: []
};

var collocazioniBis = {
  id: '',
  stage: 'question',
  data: []
};

var collocazioni = [{
  id: 0,
  label: 'Esterno',
  nextStage: 'materiali',
  materials: [{
    id: 'materiali ferrosi',
    types: [{
      label: 'preparazione supporto',
      prods: ['Novalis fondo riempitivo', 'Novalis sottosmalto']
    }, {
      label: 'smalto',
      prods: ['Bianco 313', 'Bianco 315']
    }]
  }, {
    id: 'legno',
    types: [{
      label: 'preparazione supporto',
      prods: ['Novalis fondo riempitivo', 'Novalis sottosmalto']
    }, {
      label: 'smalto',
      prods: ['Bianco 313', 'Bianco 315']
    }]
  }, {
    id: 'materiali non ferrosi',
    types: [{
      label: 'preparazione supporto',
      prods: ['Novalis fondo riempitivo', 'Novalis sottosmalto']
    }, {
      label: 'smalto',
      prods: ['Bianco 313', 'Bianco 315']
    }]
  }, {
    id: 'materiali con scarsa adesione',
    types: [{
      label: 'preparazione supporto',
      prods: ['Novalis fondo riempitivo', 'Novalis sottosmalto']
    }, {
      label: 'smalto',
      prods: ['Bianco 313', 'Bianco 315']
    }]
  }, {
    id: 'molto porosi',
    types: [{
      label: 'preparazione supporto',
      prods: ['Novalis fondo riempitivo', 'Novalis sottosmalto']
    }, {
      label: 'smalto',
      prods: ['Bianco 313', 'Bianco 315']
    }]
  }]
}, {
  id: 1,
  label: 'Interno',
  materials: [{
    id: 'materiali ferrosi',
    abstract: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab natus, nostrum magnam delectus.',
    types: [{
      label: 'preparazione supporto',
      prods: ['Novalis fondo riempitivo', 'Novalis sottosmalto']
    }, {
      label: 'smalto',
      prods: ['Bianco 313', 'Bianco 315']
    }]

  }, {
    id: 'legno',
    abstract: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab natus, nostrum magnam delectus.',
    types: [{
      label: 'preparazione supporto',
      prods: ['Novalis fondo riempitivo', 'Novalis sottosmalto']
    }, {
      label: 'smalto',
      prods: ['Bianco 313', 'Bianco 315']
    }]

  }, {
    id: 'materiali non ferrosi',
    abstract: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab natus, nostrum magnam delectus.',
    types: [{
      label: 'preparazione supporto',
      prods: ['Novalis fondo riempitivo', 'Novalis sottosmalto']
    }, {
      label: 'smalto',
      prods: ['Bianco 313', 'Bianco 315']
    }]

  }, {
    id: 'materiali con scarsa adesione',
    abstract: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab natus, nostrum magnam delectus.',
    types: [{
      label: 'preparazione supporto',
      prods: ['Novalis fondo riempitivo', 'Novalis sottosmalto']
    }, {
      label: 'smalto',
      prods: ['Bianco 313', 'Bianco 315']
    }]

  }, {
    id: 'molto porosi',
    abstract: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab natus, nostrum magnam delectus.',
    types: [{
      label: 'preparazione supporto',
      prods: ['Novalis fondo riempitivo', 'Novalis sottosmalto']
    }, {
      label: 'smalto',
      prods: ['Bianco 313', 'Bianco 315']
    }]

  }]
}];

var json = {

  useCases: [{
    id: 0,
    label: 'oggetto',

    locations: [{
      id: 'esterno',
      materials: [{
        id: 'materiali ferrosi',
        types: [{
          label: 'preparazione supporto',
          prods: ['Novalis fondo riempitivo', 'Novalis sottosmalto']
        }, {
          label: 'smalto',
          prods: ['Bianco 313', 'Bianco 315']
        }]
      }, {
        id: 'legno',
        types: [{
          label: 'preparazione supporto',
          prods: ['Novalis fondo riempitivo', 'Novalis sottosmalto']
        }, {
          label: 'smalto',
          prods: ['Bianco 313', 'Bianco 315']
        }]
      }, {
        id: 'materiali non ferrosi',
        types: [{
          label: 'preparazione supporto',
          prods: ['Novalis fondo riempitivo', 'Novalis sottosmalto']
        }, {
          label: 'smalto',
          prods: ['Bianco 313', 'Bianco 315']
        }]
      }, {
        id: 'materiali con scarsa adesione',
        types: [{
          label: 'preparazione supporto',
          prods: ['Novalis fondo riempitivo', 'Novalis sottosmalto']
        }, {
          label: 'smalto',
          prods: ['Bianco 313', 'Bianco 315']
        }]
      }, {
        id: 'molto porosi',
        types: [{
          label: 'preparazione supporto',
          prods: ['Novalis fondo riempitivo', 'Novalis sottosmalto']
        }, {
          label: 'smalto',
          prods: ['Bianco 313', 'Bianco 315']
        }]
      }]
    }, {
      id: 'interno',
      materials: [{
        id: 'materiali ferrosi',
        types: [{
          label: 'preparazione supporto',
          prods: ['Novalis fondo riempitivo', 'Novalis sottosmalto']
        }, {
          label: 'smalto',
          prods: ['Bianco 313', 'Bianco 315']
        }]

      }, {
        id: 'legno',
        types: [{
          label: 'preparazione supporto',
          prods: ['Novalis fondo riempitivo', 'Novalis sottosmalto']
        }, {
          label: 'smalto',
          prods: ['Bianco 313', 'Bianco 315']
        }]

      }, {
        id: 'materiali non ferrosi',
        types: [{
          label: 'preparazione supporto',
          prods: ['Novalis fondo riempitivo', 'Novalis sottosmalto']
        }, {
          label: 'smalto',
          prods: ['Bianco 313', 'Bianco 315']
        }]

      }, {
        id: 'materiali con scarsa adesione',
        types: [{
          label: 'preparazione supporto',
          prods: ['Novalis fondo riempitivo', 'Novalis sottosmalto']
        }, {
          label: 'smalto',
          prods: ['Bianco 313', 'Bianco 315']
        }]

      }, {
        id: 'molto porosi',
        types: [{
          label: 'preparazione supporto',
          prods: ['Novalis fondo riempitivo', 'Novalis sottosmalto']
        }, {
          label: 'smalto',
          prods: ['Bianco 313', 'Bianco 315']
        }]

      }, {
        id: 'terracotta',
        types: [{
          label: 'preparazione supporto',
          prods: ['Novalis fondo riempitivo', 'Novalis sottosmalto']
        }, {
          label: 'smalto',
          prods: ['Bianco 313', 'Bianco 315']
        }]
      }]
    }]
  }, {
    id: 1,
    label: 'esigenza',
    esigenze: [{
      label: 'Vorrei usare la stanza subito dopo l’applicazione',
      html: ''
    }, {
      label: 'Vorrei una pittura senza odore',
      html: ''
    }, {
      label: 'Vorrei una pittura senza solventi tossici e nocivi ',
      html: ''
    }, {
      label: 'Vorrei una pittura che contrasta il fenomeno dell’umidità di risalita ',
      html: ''
    }, {
      label: 'Vorrei una pittura che contrasta la muffa',
      html: ''
    }, {
      label: 'Vorrei una pittura efficace contro le alonature da termosifone / calorifero',
      html: ''
    }, {
      label: 'Vorrei una pittura efficace contro il fenomeno dello sfarinamento',
      html: ''
    }, {
      label: 'Superficie di difficile aggrappaggio',
      html: ''
    }, {
      label: 'Superficie molto assorbente',
      html: ''
    }, {
      label: 'Fondi irregolari ',
      html: ''
    }, {
      label: 'Vecchie pitture in fase di distacco',
      html: ''
    }, {
      label: 'Scarso isolamento termico',
      html: ''
    }, {
      label: 'Migliorare la profumazione dell’ambiente',
      html: ''
    }, {
      label: 'Ripitturare pareti già tinteggiate con colori accesi',
      html: ''
    }, {
      label: 'Proteggere la parete tinteggiata',
      html: ''
    }]
  }, {
    id: 2,
    label: 'ambiente',
    contesti: [{
      id: 'lavoro',
      ambienti: [{
        id: 'bagniLuogoPubblico',
        types: [{
          label: 'Nuovo',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Nuovo con Cartongesso',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Rasatura a stucco',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Rasatura civile',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }]
      }, {
        id: 'bagniServizio',
        types: [{
          label: 'Nuovo',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Nuovo con Cartongesso',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Rasatura a stucco',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Rasatura civile',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }]
      }, {
        id: 'bagniAccessoPubblico',
        types: [{
          label: 'Nuovo',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Nuovo con Cartongesso',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Rasatura a stucco',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Rasatura civile',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }]
      }, {
        id: 'bagniRappresentanza',
        types: [{
          label: 'Nuovo',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Nuovo con Cartongesso',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Rasatura a stucco',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Rasatura civile',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }, {
            type: 'design',
            prods: ['Bianco 074', 'Bianco 062', 'Bianco 044']
          }]
        }]
      }, {
        id: 'ufficiPubbliciAContattoPubblico',
        types: [{
          label: 'Nuovo',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 307', 'Bianco 308', 'Bianco 310', 'Bianco 311', 'Bianco 312']
          }, {
            type: 'design',
            prods: ['Bianco 054', 'Bianco 028', 'Bianco 041']
          }]
        }, {
          label: 'Nuovo con Cartongesso',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 307', 'Bianco 308', 'Bianco 310', 'Bianco 311', 'Bianco 312']
          }, {
            type: 'design',
            prods: ['Bianco 054', 'Bianco 028', 'Bianco 041']
          }]
        }, {
          label: 'Rasatura a stucco',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 307', 'Bianco 308', 'Bianco 310', 'Bianco 311', 'Bianco 312']
          }, {
            type: 'design',
            prods: ['Bianco 054', 'Bianco 028', 'Bianco 041']
          }]
        }, {
          label: 'Rasatura civile',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 307', 'Bianco 308', 'Bianco 310', 'Bianco 311', 'Bianco 312']
          }, {
            type: 'design',
            prods: ['Bianco 054', 'Bianco 028', 'Bianco 041']
          }]
        }]
      }, {
        id: 'laboratori',
        types: [{
          label: 'Nuovo',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Nuovo con Cartongesso',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Rasatura a stucco',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Rasatura civile',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }, {
            type: 'design',
            prods: ['Bianco 074', 'Bianco 062', 'Bianco 044']
          }]
        }]
      }, {
        id: 'luoghiRappresentanza',
        types: [{
          label: 'Nuovo',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Nuovo con Cartongesso',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Rasatura a stucco',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Rasatura civile',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }, {
            type: 'design',
            prods: ['Bianco 074', 'Bianco 062', 'Bianco 044']
          }]
        }]
      }, {
        id: 'preparazioneCibi',
        types: [{
          label: 'Nuovo',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Nuovo con Cartongesso',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Rasatura a stucco',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Rasatura civile',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }, {
            type: 'design',
            prods: ['Bianco 074', 'Bianco 062', 'Bianco 044']
          }]
        }]
      }, {
        id: 'laboratoriArtigianali',
        types: [{
          label: 'Nuovo',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Nuovo con Cartongesso',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Rasatura a stucco',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Rasatura civile',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }, {
            type: 'design',
            prods: ['Bianco 074', 'Bianco 062', 'Bianco 044']
          }]
        }]
      }, {
        id: 'showroom',
        types: [{
          label: 'Nuovo',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Nuovo con Cartongesso',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Rasatura a stucco',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Rasatura civile',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }, {
            type: 'design',
            prods: ['Bianco 074', 'Bianco 062', 'Bianco 044']
          }]
        }]
      }, {
        id: 'magazzini',
        types: [{
          label: 'Nuovo',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Nuovo con Cartongesso',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Rasatura a stucco',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Rasatura civile',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }, {
            type: 'design',
            prods: ['Bianco 074', 'Bianco 062', 'Bianco 044']
          }]
        }]
      }]
    }, {
      id: 'casa',
      tipiProdotto: [{
        id: 'unicoProdotto',
        types: [{
          label: 'Pareti',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }, {
          label: 'Soffitti',
          solutions: [{
            type: 'paint',
            prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
          }]
        }],
        quantoCucini: [{
          id: 'poco'
        }]
      }, {
        id: 'ambienti',
        ambienti: [{
          cucina: [{
            id: 'molto',
            types: [{
              label: 'Nuovo',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Nuovo con Cartongesso',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Rasatura a stucco',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Rasatura civile',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }]
          }, {
            id: 'poco',
            types: [{
              label: 'Nuovo',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Nuovo con Cartongesso',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Rasatura a stucco',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Rasatura civile',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }]
          }]
        }, {
          soggiorno: [{
            id: 'bambini',
            types: [{
              label: 'Nuovo',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Nuovo con Cartongesso',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Rasatura a stucco',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Rasatura civile',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }, {
                type: 'design',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }]
          }, {
            id: 'nobambini',
            types: [{
              label: 'Nuovo',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Nuovo con Cartongesso',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Rasatura a stucco',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Rasatura civile',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }]
          }]
        }, {
          studio: [{
            id: 'professione',
            types: [{
              label: 'Nuovo',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Nuovo con Cartongesso',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Rasatura a stucco',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Rasatura civile',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }, {
                type: 'design',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }]
          }, {
            id: 'privato',
            types: [{
              label: 'Nuovo',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Nuovo con Cartongesso',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Rasatura a stucco',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Rasatura civile',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }]
          }]
        }, {
          camera: [{
            id: 'bambini',
            types: [{
              label: 'Nuovo',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Nuovo con Cartongesso',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Rasatura a stucco',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Rasatura civile',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }, {
                type: 'design',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }]
          }, {
            id: 'padronaleOspiti',
            types: [{
              label: 'Nuovo',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Nuovo con Cartongesso',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Rasatura a stucco',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Rasatura civile',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }]
          }]
        }, {
          bagno: {
            questions: [{
              id: 'arieggiare',
              questionText: 'La STANZA PUO’ ESSERE ARIEGGIATA ?',
              answers: [{
                id: 1,
                label: 'Sì',
                types: [{
                  label: 'Nuovo',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Nuovo con Cartongesso',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Rasatura a stucco',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Rasatura civile',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }, {
                    type: 'design',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }]
              }, {
                id: 0,
                label: 'No',
                types: [{
                  label: 'Nuovo',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Nuovo con Cartongesso',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Rasatura a stucco',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Rasatura civile',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }, {
                    type: 'design',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }]
              }]
            }, {
              id: 'muffa',
              questionText: 'Hai un problema di muffa?',
              answers: [{
                id: 1,
                label: 'Sì',
                types: [{
                  label: 'Nuovo',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Nuovo con Cartongesso',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Rasatura a stucco',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Rasatura civile',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }, {
                    type: 'design',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }]
              }, {
                id: 0,
                label: 'No',
                types: [{
                  label: 'Nuovo',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Nuovo con Cartongesso',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Rasatura a stucco',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Rasatura civile',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }, {
                    type: 'design',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }]
              }]
            }]
          }
        }, {
          ripostigli: {
            questions: [{
              id: 'umidita',
              questionText: 'Hai umidità di risalita?',
              answers: [{
                id: 1,
                label: 'Sì',
                types: [{
                  label: 'Nuovo',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Nuovo con Cartongesso',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Rasatura a stucco',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Rasatura civile',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }, {
                    type: 'design',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }]
              }, {
                id: 0,
                label: 'No',
                types: [{
                  label: 'Nuovo',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Nuovo con Cartongesso',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Rasatura a stucco',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Rasatura civile',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }, {
                    type: 'design',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }]
              }]
            }]
          }
        }, {
          scalaCorridoioIngresso: {
            id: 1,
            label: 'Sì',
            types: [{
              label: 'Nuovo',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Nuovo con Cartongesso',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Rasatura a stucco',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }, {
              label: 'Rasatura civile',
              solutions: [{
                type: 'paint',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }, {
                type: 'design',
                prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
              }]
            }]
          }
        }, {
          cantina: {
            questions: [{
              id: 'umidita',
              questionText: 'Hai umidità di risalita?',
              answers: [{
                id: 1,
                label: 'Sì',
                types: [{
                  label: 'Nuovo',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Nuovo con Cartongesso',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Rasatura a stucco',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Rasatura civile',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }, {
                    type: 'design',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }]
              }, {
                id: 0,
                label: 'No',
                types: [{
                  label: 'Nuovo',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Nuovo con Cartongesso',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Rasatura a stucco',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }, {
                  label: 'Rasatura civile',
                  solutions: [{
                    type: 'paint',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }, {
                    type: 'design',
                    prods: ['Bianco 310', 'Bianco 311', 'Bianco 312']
                  }]
                }]
              }]
            }]
          }
        }]
      }]
    }]
  }]
};

var oggettoEsterno = {
  stageType: 'grid-choice',
  questionText: "Di che materiale è fatto l'oggetto?",
  options: [{
    id: 0,
    title: "Materiali ferrosi",
    nextStage: 'oggettoMatFerrosi'
  }, {
    id: 1,
    title: "Legno",
    nextStage: 'oggettoLegno'
  }, {
    id: 0,
    title: "Materiali non ferrosi",
    nextStage: 'oggettoMatNonFerrosi'
  }, {
    id: 1,
    title: "Materiali con scarsa adesione",
    nextStage: 'oggettoMatScarsaAdesione'
  }, {
    id: 0,
    title: "Materiali molto porosi",
    nextStage: 'oggettoMatPorosi'
  }]
};

var oggettoInterno = {
  stageType: 'grid-choice',
  questionText: "Di che materiale è fatto l'oggetto?",
  options: [{
    id: 0,
    title: "Materiali ferrosi",
    nextStage: 'oggettoStep2A'
  }, {
    id: 1,
    title: "Legno",
    nextStage: 'oggettoStep2B'
  }, {
    id: 0,
    title: "Materiali non ferrosi",
    nextStage: 'oggettoStep2A'
  }, {
    id: 1,
    title: "Materiali con scarsa adesione",
    nextStage: 'oggettoStep2B'
  }, {
    id: 0,
    title: "Materiali molto porosi",
    nextStage: 'oggettoStep2A'
  }, {
    id: 0,
    title: "Cornice e battiscopa",
    nextStage: 'oggettoStep2A'
  }]
};