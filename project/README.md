# FSE-ontology

## Prerequisiti

- [Stardog](https://www.stardog.com): istanza avviata e raggiungibile all'indirizzo `http://localhost:5820`
- [Node.js](https://nodejs.org) e [NPM](): è possibile verificare l'installazione con i comandi `node -v` e `npm -v`

## Setup

- Clonare la repo (qualora non fosse già disponibile in locale)
  ```
  git clone https://github.com/FrancescoBoschi/FSE-ontology.git
  ```
- Utilizzando Stardog Studio [http://stardog.studio](http://stardog.studio):
  - Creare un nuovo database con il nome `fse`
  - Importare i namespace dal file `fse_namespaces.ttl` nella repository
  - Importare le seguenti ontologie esterne:
    - Disease Ontology (doid)
    - Drug Ontology (dron)
    - Friend of a Friend (foaf)
    - LOINC (loinc)
    - ORG (org)

    Le versioni delle ontologie utilizzate per il progetto sono disponibili all'indirizzo [https://drive.google.com/drive/folders/1GFto2GoLGlaf-MHzgDcVUAqTOCW_1k0d?usp=sharing](https://drive.google.com/drive/folders/1GFto2GoLGlaf-MHzgDcVUAqTOCW_1k0d?usp=sharing).\
    Le ontologie dron e loinc contengono una quantità elevata di dati. In caso di problemi nell'importazione è possibile utilizzare il sistema anche senza di esse con alcune funzionalità limitate.

  - Creare un nuovo model con nome `fse` e IRI `https://fse.ontology`
  - Sostituire il contenuto della sezione **Text Editor** con quello del file `fse_https __fse.ontology_.ttl` nella repository
  - *Opzionale*: per inserire alcuni dati nell'ontologia è possibile eseguire la query contenuta nel file `insert-data-fse.rq` nella repository
- Aprire un terminale nella cartella `solid-fse` della repository e utilizzare i seguenti comandi
  ```bash
  # Installazione delle dipendenze
  npm i
  # Avvio del programma
  npm run start
  ```
- L'applicativo Solid FSE è ora raggiungibile all'indirizzo [http://localhost:8080](http://localhost:8080)
