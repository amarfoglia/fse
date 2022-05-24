## Profilo Sanitario Sintetico (PSS)
Il Profilo Sanitario Sintetico (Patient Summary) è il documento socio-sanitario informatico redatto e aggiornato dal MMG/PLS, che riassume la storia clinica dell’assistito e la sua situazione corrente conosciuta.
In particolare, lo scopo del documento è quello di favorire la continuità di cura, permettendo un rapido inquadramento del paziente al momento di un contatto con il Servizio Sanitario Nazionale: situazioni di emergenza e di pronto soccorso; continuità informativa per la medicina di gruppo; visite specialistiche o ricovero; servizi diagnostici; attività di riabilitazione; etc.

Il Profilo Sanitario Sintetico è quindi un documento: 
- sintetico: riporta solo le informazioni essenziali; 
- con un unico autore: è creato, aggiornato e mantenuto solo dal MMG/PLS titolare: non può essere creato in maniera automatica a partire dal FSE: è sempre frutto di una valutazione professionale -> necessità di gestire una frequenza di aggiornamento adeguata; 
- non clinicamente specializzato: il contenuto del PSS deve essere tale da contribuire alla continuità di cura a prescindere dallo scenario d’uso (Emergenza, Continuità Assistenziale, …) [solo dati essenziali]; 
- senza destinatario predefinito unico: all’interno di un dominio di condivisione documentale (FSE, Carta Sanitaria,..) deve esistere un solo PSS “valido” per paziente

### Header
- ***ClinicalDocument***: elemento root per la struttura XML che rappresenta il documento CDA. Ogni documento CDA DEVE iniziare con questo elemento, che comprende gli attributi speciali xsi:schemaLocation, xmlns e xmlsn:xsi.
- ***recordTarget***: elemento OBBLIGATORIO che identifica la partecipazione relativa al soggetto a cui il documento di Profilo Sanitario Sintetico si riferisce:

	- *recordTarget/patientRole*: è un elemento OBBLIGATORIO che identifica il ruolo svolto dalla persona a cui il Profilo Sanitario Sintetico si riferisce
	- *recordTarget/patientRole/id*: in dipendenza dalla tipologia di soggetto a cui il documento si riferisce si individuano i seguenti vincoli di identificazione. 
Nel caso in cui il soggetto sia di cittadinanza italiana, o straniero residente, (iscritti al SSN) l’elemento recordTarget/patientRole PUÒ contenere un ulteriore elemento id, unico a livello regionale, che riporta il Codice Identificativo Regionale del soggetto.
	- *recordTarget/patientRole/addr*: L’elemento addr riporta l’indirizzo del paziente, in particolare almeno indirizzo domicilio, CAP domicilio, Codice ISTAT comune domicilio.
	- *recordTarget/patientRole/telecom*: L’elemento telecom, opzionale, riporta il numero di telefono dell’assistito, il suo indirizzo email, il suo indirizzo di PEC.
Esempio di implementazione: 
		```xml
		<telecom use="HP" value="mailto://user@domain.com"></telecom>
		```
	-  *recordTarget/patientRole/patient*: L’entità recordTarget/patientRole/patient è un elemento OBBLIGATORIO che contiene i dati anagrafici del soggetto della prestazione. Per i dettagli relativamente agli elementi patient/name patient/administrativeGenderCode e patient/birthTime si rimanda al documento Rif. 8.
	- *recordTarget/patientRole/patient/guardian*:  Ogni entità che esercita la potestà familiare nei confronti di un minore (e.g. genitore, 550 giudice tutelare) o di tutela legale nei confronti di un adulto è rappresentata dalla classe Guardian. Il Guardian può essere una persona (istanza della classe Person) o un’organizzazione (istanza della classe Organization).

- ***author***: Elemento OBBLIGATORIO che identifica il soggetto che ha creato il documento.

- ***custodian***: Elemento OBBLIGATORIO che identifica l’organizzazione incaricata della custodia del documento originale.

- ***authenticator***: elemento che identifica il soggetto che effettua la validazione clinica del documento. Il soggetto che effettua la validazione è la stessa persona che interpreta il ruolo di autore (author). Il ruolo di validatore è differente da quello di firmatario del documento che, se presente, è riportato in legalAuthenticator.

- ***documentationOf***: elemento, OBBLIGATORIO, indica che questo documento è stato creato al fine di documentare un evento (documentationOf/serviceEvent) di Cura del Paziente. L’elemento serviceEvent/EffectiveTime sarà utilizzato per riportare la data dell’ultimo aggiornamento delle informazioni relative al PSS.

- ***relatedDocument***: elemento che viene utilizzato nella gestione delle trasformazioni successive alla prima versione del documento. relatedDocument è un elemento OPZIONALE alla prima generazione di un documento CDA ed è OBBLIGATORIO per le trasformazioni successive.
  
### Body
Il body, strutturato secondo sezioni specifiche, contiene l’insieme dei dati clinici associati al paziente. I diversi elementi che compongono il body potranno contenere uno o più elementi di tipo che potranno essere di tipo solo narrativo, o parzialmente/totalmente codificati

 | Sezione PSS        | Descrizione                     |
  |----------------|--------------|
  | Allergie e Intolleranze | Sezione concepita per raccogliere ogni informazione relativa ad allergie, reazioni avverse, ed allarmi passati o presenti inerenti il paziente, se ritenute rilevanti. Tale sezione deve essere sempre presente e deve riportare almeno le seguenti informazioni, se riferite dall’assistito: reazioni avverse ai farmaci e/o alimenti note dell'assistito e eventuale descrizione delle caratteristiche della reazione osservata, allergie documentate cutanee, respiratorie o sistemiche dell'assistito e eventuale descrizione delle caratteristiche della reazione osservata, allergie a veleno di imenotteri. La parte della sezione inerente le allergie deve essere sempre presente, se non applicabile deve essere riportata esplicitamente la dizione: “Non sono note allergie” o un’espressione analoga.
  | Terapie farmacologiche | Sezione deputata alla registrazione di tutte le informazioni inerenti le terapie farmacologiche (prescrizioni, somministrazioni,…): terapie in atto, storia delle prescrizioni/terapie farmacologiche. Tale sezione deve essere sempre presente e deve riportare le terapie croniche in atto alla data di compilazione, ritenute rilevanti dal medico, come ad esempio la TAO e il trattamento insulinico. Informazioni su terapie pregresse possono essere eccezionalmente presenti qualora il medico le ritenga rilevanti per un corretto quadro clinico del paziente. Nel caso in cui non vi siano terapie in atto la sezione dovrebbe esplicitamente riportare la dizione “Non sono note terapie farmacologiche continuative in atto” o un’espressione analoga.
  | Vaccinazioni | Sezione usata per riportare le informazioni relative allo stato attuale di immunizzazione (vaccinazioni) del paziente e alle vaccinazioni effettuate a cui il paziente si è sottoposto in passato, di cui è a conoscenza documentata il medico di famiglia.
  | Lista dei Problemi | Tale sezione è concepita per documentare tutti i problemi clinici rilevanti noti al momento in cui è stato generato il documento (problemi clinici, condizioni, sospetti diagnostici e diagnosi certe, sintomi attuali o passati). Le parti inerenti i problemi potranno essere strutturate secondo strutture SOVP (Soggettività, Oggettività, Valutazione, Pianificazione). Tale sezione deve essere sempre presente e deve riportare almeno le seguenti informazioni: Patologie croniche e/o rilevanti, organi mancanti, trapianti effettuati (diagnosi), rilevanti malformazioni. Se non applicabile, deve essere riportata esplicitamente la dizione: “Non sono noti problemi cronici attivi” o un’espressione analoga”.
   | Protesi, Impianti e Ausili | Sezione in cui sono descritte tutte le informazioni inerenti dispositivi medici, ausili, protesi,…(“devices”) siano essi impiantati che esterni, da cui dipende, o è dipeso, lo stato di salute del paziente. Tale sezione deve essere sempre presente e deve riportare almeno le seguenti informazioni relative a protesi e impianti permanenti e ad ausili, in uso dal paziente. Se non applicabile, deve essere riportata esplicitamente la dizione: “Non sono noti protesi, impianti o ausili” o un’espressione analoga.
Trattamenti e Procedure Terapeutiche, Chirurgiche e Diagnostiche | Sezione utilizzata per documentare le procedure (interventistiche, diagnostiche, chirurgiche, terapeutiche,…) pertinenti il paziente oggetto del documento. Tale sezione deve essere sempre presente e deve riportare almeno le infomazioni sui trapianti effettuati. Se non applicabile, deve essere riportata esplicitamente la dizione: “Non sono noti trattamenti e procedure chirurgiche” o un’espressione analoga.
| Stato funzionale del paziente | Tale sezione deve essere sempre presente e deve riportare almeno la valutazione della capacità motoria dell’assistito (autonomo, assistito, allettato). Opzionalmente possono riportate le indicazioni sul regime di assistenza (ADI, ADP). La sezione è deputata alla descrizione in senso lato delle capacità funzionali attuali del paziente, include informazioni, tra le altre, relative a: problemi ambulatori, mental test, scala di depressione, valutazioni ADL (Activities of Daily Living), problemi di comunicazione (parlato, scritto, problemi cognitivi,….), capacità percettive (vista, udito, tatto, gusto, problemi di equilibrio,…), problemi di socializzazione e/o occupazionali. Il documento dovrebbe riportare ogni deviazione da condizioni di normalità.
| Indagini diagnostiche e Esami di laboratorio | Sezione in cui sono riportati tutti i risultati relativi ad indagini diagnostiche e ad esami di laboratorio rilevanti ai fini della storia clinica del paziente.
| Esenzioni | Eventuali codici di esenzione dal pagamento del ticket dell’assistito
| Reti di patologia | Eventuali reti di patologia cui appartiene l’assistito


 ***Allergie e intolleranze:*** Le informazioni relative alle allergie ed alle reazioni avverse ed ad eventuali altre condizioni di allarme sono mappate all’interno della sezione individuata dal codice LOINC “48765-2” (“Allergie &o reazioni avverse”).
 Tale sezione deve riportare almeno le seguenti informazioni, se riferite dall’assistito: 
 - Reazioni avverse ai farmaci e/o alimenti note dell'assistito e eventuale descrizione delle caratteristiche della reazione osservata; 
 - Allergie documentate cutanee, respiratorie o sistemiche dell'assistito e eventuale descrizione delle caratteristiche della reazione osservata; 
 - Allergie a veleno di imenotteri
 
 Esempio di utilizzo:
 ```xml
	<component>
	  <section>
         <templateId root=’2.16.840.1.113883.2.9.10.1.4.2.1'/>
         <id $ID_SEZ />
		 <code code='48765-2' displayName='Allergie, Reazioni Avverse’ codeSystem='2.16.840.1.113883.6.1' codeSystemName='LOINC'/>
		 <title>Allergie e Intolleranze</title>
		 <text>
		   $NARRATIVE_BLOCK
		 </text>
<!-- Molteplicità 1 …N - Allergia o Intolleranza -->
	 <entry>
	   $ALLERGY
	 </entry>
<!-- Descrizione Commenti e Note molteplicità 0..1--->
			     $NOTE
			     
    </section>
  </component>
```

 ***Terapie farmacologiche (Medications):***
 Le informazioni relative alle terapie farmacologiche in corso e tutte quelle riconosciute come rilevanti dal medico devono essere descritte all’interno della sezione individuata dal codice LOINC “10160-0” (“Storia di uso di farmaci”).

 ***Vaccinazioni (Immunizations):***
Tutte le informazioni relative allo stato attuale di immunizzazione (vaccinazioni) del paziente e alle vaccinazioni effettuate dal MMG/PLS a cui il paziente si è sottoposto in passato devono essere descritte all’interno della sezione individuata dal codice LOINC “11369-6” (“Storia di immunizzazioni”).

Esempio di uso: 10/05/2007 Febbre Gialla (Viaggio in Indonesia). Lotto: 356/B/123456 11/02/2005 Tetano 2 (IMOVAXTETANO*1SIR 0,5 ml) (AIC 026171013) 13/06/2007 DIFTERITE/TETANO

Le informazioni gestite per indicare i dettagli della vaccinazione saranno: 
- Nome Vaccino (Obbligatorio) 
- Numero Richiamo (se indicato) 
- Periodo di copertura 
- Data Somministrazione (Obbligatorio) 1890 
- Farmaco Utilizzato (codice AIC) 
- Lotto Vaccino 
- Eventuale Reazione 
- Note

Al momento tale sezione viene utilizzata per riportare le vaccinazioni, non le immunizzazioni “naturali”. Quest’ultime potranno essere derivate dalle patologie (o storia delle malattie) remote (sezione “problems”).

***Lista dei Problemi (Problems):***
Questa sezione riporta la lista dei problemi clinici, i sospetti diagnostici e le diagnosi certe, i sintomi attuali o passati, le liste delle malattie pregresse e gli organi mancanti che il medico titolare dei dati del paziente, fra tutti i problemi presenti nella cartella informatizzata, ritiene significativi per riassumere la storia clinica e la condizione attuale dell’assistito.

Questa sezione è individuata dal codice LOINC “11450-4” (“Lista dei problemi”).

In questa sezione andranno pertanto rappresentati almeno i seguenti item: 
- Patologie croniche e/o rilevanti 
- Organi mancanti 
- Diagnosi di trapianti effettuati
- Rilevanti malformazioni.

Possono inoltre essere riportate tutte le patologie note in atto al momento della compilazione del documento. 
Di seguito sono riportati alcuni esempi di rappresentazione del contenuto di questa sezione: 
- Organi Mancanti 
	- Organi mancanti: gamba destra 
- Note di Storia Clinica 
	- NOTA generale: fin da piccola era cagionevole di salute 
- Patologie: 
	- BRONCHITE ASMATICA (2008 Apr) 
	- DIABETE MELLITO (2008 Apr) 
	- BRONCHITE CRONICA OSTRUTTIVA (2008 Apr) 
	-  IPERTENSIONE ARTERIOSA (1997) 2210 
	-  ANGINA PECTORIS (1997) Patologie remote 
	-  K CUTANEO (1997)

Le informazioni che si intende inserire nella sezione “Problemi” devono essere riportate sul CDA-PSS come act/entryRelationship/observation secondo il loro rilievo clinico.

***Protesi, impianti e ausili (Medical equipment):*** Tutte le informazioni relative a protesi o ausili sono registrate all’interno della sezione individuata dal codice LOINC “46264-8” (“Storia di uso di dispositivi medici”). 
Tale sezione deve riportare tutte le protesi ed impianti permanenti, nonché tutti gli ausili, impiantati o esterni, di supporto per il paziente.

Esempi di informazioni gestite: 
- PORTATORE PACE MAKER (ICD9-CM V4501) (Maggio 2008) 
- PROTESI DI ARTO INFERIORE

***Trattamenti e procedure terapeutiche, chirurgiche e diagnostiche (Procedures):*** Le informazioni relative alle procedure diagnostiche invasive, interventistiche, chirurgiche, terapeutiche non farmacologiche inerenti la storia clinica del paziente e di interesse all’interno del documento sono mappate nella sezione individuata dal codice LOINC “47519-4” (“Storia di Procedure”). 
La sezione dovrebbe almeno contenere le procedure di maggiore rilevanza, ad esempio gli interventi chirurgici a cui il paziente è stato sottoposto. 
Devono essere riportate obbligatoriamente le indicazioni su interventi chirurgici legati a trapianti. 
Si osserva che in generale sono di interesse per questa sezione i trattamenti e le procedure che sono già stati effettuati.

Esempi di procedure: 
- Asportazione K Cutaneo
- Appendicectomia 
- Cordotomia percutanea

***Stato funzionale del Paziente (Functional status)***
Questa sezione (individuata dal codice LOINC “47420-5”, “Nota di valutazione dello stato funzionale”) contiene le informazioni che descrivono eventuali comportamenti e/o condizioni del paziente che si discostano dalla norma.
Tale sezione deve riportare almeno la valutazione della capacità motoria dell’assistito (autonomo, assistito, allettato).
Opzionalmente possono riportate le indicazioni sul regime di assistenza (ADI, ADP) attivo.

Esempi di informazioni incluse in questa sezione: 
- Capacità motoria: allettato
- Stato mentale
- Capacità di comunicazione 
- Percezione
- In regime di ADI

***Indagini diagnostiche e esami di laboratorio (Results):*** Questa sezione contiene tutti i risultati relativi ad indagini diagnostiche e ad esami di laboratorio rilevanti ai fini della storia clinica del paziente.
È importante evidenziare che seppure vi sia la possibilità di riportare tutti gli esiti degli accertamenti sostenuti dal paziente nella sua storia clinica, lo standard limita l’obbligatorietà ai soli esiti che, a giudizio dell’operatore sanitario autore del PSS, assumono rilevanza ai fini di una corretta valutazione dello stato clinico del paziente.
Esempi di informazioni incluse in questa sezione: 
- Gruppo sanguigno A + 
- Sodio Sangue: 134 mEq/L 
- Calcio: 7 mg/dL

***Esenzioni:***
Sezione individuata dal codice LOINC “57827-8” (“Motivo di esenzione dal co-pagamento”) destinata alla rappresentazione delle esenzioni dal pagamento del ticket di cui gode l’assistito. Si riporteranno esenzioni per patologie croniche, malattie rare, invalidità, diagnosi precoce tumori, gravidanza, reddito.
Esempi di informazioni gestite: 
- 001.253.0 – Acromegalia e gigantismo

***Reti di Patologia:*** In attesa che venga rilasciato dal Regenstrief Institute un codice LOINC idoneo a seguito di relativa richiesta, questa sezione destinata alla rappresentazione delle reti di patologia a cui appartiene l’assistito, deve essere individuata dal codice provvisorio “PSSIT99” (“Reti di Patologia”).
Esempi di informazioni gestite: 
- Paziente seguito dalla Rete Oncologica della Romagna
