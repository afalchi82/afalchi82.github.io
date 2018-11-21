# Bottoni

> An awesome Giuffré Francis Lefebvre project.

```html
<ul>
  <li v-for="i in 10">{{ i }}</li>
</ul>
```


### Azioni principali
<button class="button-style1">
    Azione primaria
</button>

<button class="button-style2">
    Azione secondaria
</button>

<button class="button-style4">
    Azione terziaria
</button>


```html
<button class="button-style1">
    Azione primaria
</button>

<button class="button-style2">
    Azione secondaria
</button>

<button class="button-style4">
    Azione terziaria
</button>
```


### Variante con icona
<button :class="'button-style'+i" class="margin-quartered-right" v-for="i in [1,2,4]">
    <i class="icon icon_send-button"></i>
    Invia
</button> 


```html
<button class="button-style1">
    <i class="icon icon_send-button"></i>
    Invia
</button>
```


### Variante disabilitato
<button class="button-style1" disabled>
    Azione primaria
</button>

<button class="button-style2" disabled>
    Azione secondaria
</button>

<button class="button-style4" disabled>
    Azione terziaria
</button>

```html
<button class="button-style1" disabled>
    Azione primaria
</button>

<button class="button-style2" disabled>
    Azione secondaria
</button>

<button class="button-style4" disabled>
    Azione terziaria
</button>
```