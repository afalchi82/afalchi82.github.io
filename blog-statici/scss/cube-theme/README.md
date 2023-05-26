# cube-theme

Un set di variabili relative allo stile grafico di Cliens Cube da utilizzare in progetti che usano le stesse linee guida.  
Il sistema è pensato per essere integrato in qualsiasi base di codice SCSS a prescindere dalle librerie utilizzate.

## Come usarlo

1. Scaricare il file `dist/_design-tokens.scss` in una cartella del proprio progetto
1. Fare `@import` o `@use` per usarlo come dipendenza in altri file `.scss`
1. Se servisse, **sovrascrivere le variabili in un nuovo file**, non direttamente in `_design-tokens.scss`

## Come sviluppare

1. Modificare o aggiungere i valori desiderati nel file `src/_design-tokens.scss`

### Per rilasciare una nuova versione

1. Aggiornare il numero di versione in `package.json`
1. Lanciare lo script per aggiornare il n. di versione sui file di distribuzione:  
    `npm run build`
1. Commit e push sul repository
1. Creare un nuovo tag usando SEMVER    