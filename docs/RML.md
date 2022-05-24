## Referto di Medicina di Laboratorio (RML)\
Il Referto di Medicina di Laboratorio rappresenta il risultato di una prestazione svolta da uno specifico laboratorio interno ad una struttura sanitaria.
### Header
- ***code***: codice LOINC ``"11502-2"``.
  ```xml
  <code code="11502-2"
        codeSystem="2.16.840.1.113883.6.1"
        codeSystemName="LOINC"
        codeSystemVersion="2.19"
        displayName="Referto di Laboratorio"/> 
  ```
- ***inFulfillmentOf***: deve esistere almeno una istanza che indica che il documento CDA prodotto è stato creato in risposta ad una precedente richiesta.
### Body
Il CDA del Referto di Medicina di Laboratorio DEVE contenere l’elemento structuredBody. y. Il body è organizzato secondo una gerarchia di ``section``:
- _section di specialità_: livello più "alto" (OBBLIGATORIO);
- _section foglia_: rappresenta il livello "inferiore". Può rappresentare una batteria di esami (es. EMOCROMO), un singolo esame o lo studio completo di un campione.

#### **Section di specilità**
Un Referto di Medicina di Laboratorio PUÒ contenere risultati di esami di laboratorio afferenti ad una singola specialità (ad esempio uno studio microbiologico) o a più specialità. 
L’elemento ``structuredBody`` DEVE contenere almeno un elemento ``component/section``, le cui componenti devono essere valorizzate come segue:
- ***code***: deve assumere valori costanti in base alla codifica LOINC
  ![LOINC - Specialità di Laboratorio (a)](images/RML-specialit%C3%A0%20(a).png)

  ![LOINC - Specialità di Laboratorio (b)](images/RML-specialit%C3%A0%20(b).png)
- ***codeSystem***: rappresenta l'OID del sistema di codifica LOINC che deve assumere il valore costante ``2.16.840.1.113883.6.1``.
- ***codeSystemName***: tale attributo deve assumere il valore costante LOINC.

#### **Section foglia**
L’elemento ``structuredBody/component/section/component/section`` (section foglia) DEVE contenere l’elemento section/code. Le componenti dell’elemento ``section/code`` DEVONO essere valorizzate come segue:
- ***code***: deve assumere uno dei valori del sistema di codifica LOINC;
- ***codeSystem***: deve assumere valore costante ``2.16.840.1.113883.6.1``;
- ***codeSystemName***: deve assumere il valore del vocabolario LOINC.
- ***text***: il campo può modellare diverse tipologie di risultati, ognuno strutturato in modo diverso.
  - _Esame singolo_: deve contenere una tabella raffigurante il risultato dell'esame. Il contenuto informativo della tabella potrebbe essere il seguente:
    - Nome dell'esame;
    - Metodo utilizzato;
    - Materiale;
    - Risultato dell'esame effettuato sul campione;
    - Unità di misura;
    - Intervallo di riferimento;
    - Codice di interpretazione.
  - _Esami ripetuti_:  sono denominate curve
le indagini che prevedono di ripetere lo stesso esame su campioni prelevati in tempi diversi dallo stesso paziente al quale è stato somministrato un farmaco specifico. Deve definre una tabella contenente i singoli Esami.
  - _Batteria di esami_: (es. batteria di esami EMOCROMO per la specialità HEMATOLOGY STUDIES).
  - _Studio Microbiologico_: comprende anche le prove di resistenza agli antibiotici. I dettagli possono fare riferimento per esempio all’esame colturale in aerobiosi nella specialità MICROBIOLOGY STUDIES.

- ***entry***: un solo _entry_ contenente un unico _act_.
  - entry/act __code__: deve coincidere con l’elemento _section/code_ della ``section``;
  - entry/act/ _statusCode_: rappresenta lo stao in cui si trovano le informazioni riportate all'interno dell'elemento _act_.
  > Tale attributo di tipo ST (Character String) DEVE assumere uno dei seguenti valori:
  > - _completed_: tutti i risultati degli esami sono presenti e completi;
  > - _active_: i risultati potrebbero essere presenti in futuro;
  > - _aborted_: non tutti i risultati sono presenti e ne lo saranno in futuro.