## Verbale di Pronto Soccorso (VPS)
Il Verbale di Pronto Soccorso è la localizzazione Italiana delle specifiche per l’implementazione del documento clinico, riassume i risultati di tutte le indagini eseguite in regime di urgenza in Pronto Soccorso, attestando quanto effettuato per l’inquadramento diagnostico e terapeutico. Esso è indirizzato al paziente ed al suo medico curante. 

### Header
- ***code***: Elemento OBBLIGATORIO che indica la tipologia di documento. 
Esempio di utilizzo:
  ```xml
  <code code="59258-4"
        codeSystem="2.16.840.1.113883.6.1"
        codeSystemName="LOINC"
        codeSystemVersion="[Versione Loinc]"
        displayName="Verbale di Pronto Soccorso"/>
  ```
- ***recordTarget***: Elemento OBBLIGATORIO che identifica il soggetto della prestazione, ovvero il paziente soggetto del ricovero in Pronto Soccorso. ```<recordTarget>``` è un elemento composto da un ruolo ```<patientRole>``` svolto da un'entità identificata dall'elemento ```<patient>```.

	- ***patientRole***: L'elemento ```<patientRole>``` DEVE prevedere al suo interno almeno un elemento di tipo ```<id>```, destinato ad accogliere la chiave identificativa del paziente, secondo gli schemi assegnati da ogni singola organizzazione, ed eventualmente ulteriori elementi di tipo  ```<id>```, destinati ad accogliere le informazioni relative al codice fiscale ed altri identificativi (regionali, europei, termporanei, ecc). 
È inoltre possibile riportare tramite ```<addr>``` l’indirizzo di residenza del paziente, e tramite ```<telecom>``` il recapito telefonico del paziente. 
Diverse sono le casistiche possibili e le relative eccezioni, che dipendono dalla tipologia di soggetto in esame; tali casistiche possono essere così sintetizzate: 
		-  Soggetti assicurati da istituzioni estere; 
		- Europei Non Iscritti (ENI) al SSN; 
		- Stranieri Temporaneamente Presenti (STP); 
		- Cittadino italiano o straniero residente (iscritto SSN).

	- ***patient***: L'elemento ```<addr>``` contiene i dettagli anagrafici relativi al paziente. Riporta alcuni sotto-elementi OBBLIGATORI con l'indicazione dei dati anagrafici quali: 
		- il nominativo del paziente, attraverso l'elemento ```<name>``` (ed i sotto-elementi ```<family>``` e ```<given>```),
		- il sesso, attraverso l'elemento ```<administrativeGenderCode>```
		- la data di nascita in ```<birthTime>```.

Esempio di utilizzo:
```xml
 <recordTarget>
	 <patientRole>
		 <id root="2.16.840.1.113883.2.9.2.90.4.1"
			 extension="SIS.12383741345"
			 assigningAuthorityName="Regione Toscana"/>
		 <id root="2.16.840.1.113883.2.9.4.3.2"
			extension="XYILNI99M22G999T"
		assigningAuthorityName="Ministero Economia e Finanze"/>
		 <patient>
			 <name>
				 <family>Guido</family>
				 <given>Rossi</given>
			 </name>
			 <administrativeGenderCode code="M"
			 codeSystem="2.16.840.1.113883.5.1"/>
			 <birthTime value="20080329"/>
			 <birthplace>
				 <place>
					 <addr>
						 <city>Cirie'</city>
						 <censusTract>001086</censusTract>
					 </addr>
				 </place>
			 </birthplace>
		 </patient>
	 </patientRole>
</recordTarget>
  ```
  
-   **author** :  elemento OBBLIGATORIO che identifica il soggetto che ha creato il documento. Nel caso del Verbale di Pronto Soccorso DEVE essere una persona. DEVE contenere un sotto-elemento ```<time>```, con l'indicazione dell'ora di produzione del documento. La valorizzazione deve essere effettuata attraverso un tipo Time Stamp (TS).
La sezione DEVE contenere un elemento ```<assignedPerson>/<name>``` che riporti i dati relativi al nome del soggetto in esame all'interno delle sezioni opportune, e PUÒ contenere altri elementi facoltativi dedicati alla memorizzazione di indirizzo, recapiti telefonici, ecc. (sezioni ```<addr>```, ```<telecom>```, ...)

-   **custodian** :  Elemento OBBLIGATORIO che identifica l'organizzazione incaricata della custodia del documento originale, corrispondente al conservatore dei beni digitali. Tale organizzazione è solitamente la struttura di cui fa parte colui che ha creato il documento.
L'elemento ```<custodian>```, è composto da un ruolo, rappresentato dall'elemento nominato ```<assignedCustodian>```, svolto da un'entità rappresentata dall'elemento.
L'elemento ```<representedCustodianOrganization>``` DEVE contenere al suo interno un elemento ```<id>``` che riporta l'identificativo della struttura che ha la responsabilità della conservazione del documento.

-   **legalAuthenticator** :  Elemento OBBLIGATORIO che riporta il firmatario del documento. L'elemento ```<legalAuthenticator>``` DEVE contenere un elemento ```<time>``` con l'indicazione dell'ora in cui il documento è stato firmato, un elemento ```<signatureCode>``` per indicare che il documento è firmato, ed un elemento ```<assignedEntity>```, destinato ad accogliere l'elemento del medico responsabile del documento. La sezione DEVE contenere un elemento ```<assignedEntity>/<name>``` per riportare i dati relativi al nome del soggetto firmatario.

-   **componentOf** :  Elemento OBBLIGATORIO che identifica l’accesso a cui si riferisce il verbale, riferito da ```<componentOf>/<encompassingEncounter>```. Su questo elemento vengono riportati l’identificativo dell’accesso, la data di accesso e quella di dimissione, l’istituto (ospedale) in cui è avvenuto l’accesso, il direttore, l’indirizzo e i recapiti della segreteria del Pronto Soccorso, l’Azienda sanitaria in cui è avvenuto l’accesso in Pronto Soccorso.

-   **effectiveTime** :  Elemento OBBLIGATORIO che identifica le date di accettazione e dimissione amministrativa. Altri timestamp (data e ora) relativi a fase di triage, trasferimento in OBI, visite, accertamenti ecc. sono documentati nelle relative section del body. Tali date DEVONO essere inserite, rispettivamente, all'interno dell'elemento ```<encompassingEncounter>```. ```<effectiveTime>/<low>``` e dell'elemento ```<effectiveTime>/<high>```.

 -   **healthCareFacility** :  È l’Elemento OBBLIGATORIO che specifica il Pronto Soccorso che ha preso in cura il paziente, ed ha come percorso ```componentOf/encompassingEncounter/location/healthCareFacility```.
  
### Body
Il body di un documento VPS è strutturato e può raggiungere differenti livelli di specializzazione.
ll VPS definito secondo lo standard HL7-CDA Rel. 2.0, prevede un body strutturato in più sezioni in cui sia possibile inserire tutte le informazioni di interesse in maniera semplice ed accurata. Il Verbale di Pronto Soccorso è organizzato secondo una sequenza di elementi ```<section>```. 

 | Sezioni        | Codici LOINC | Descrizioni LOINC ShortName                     |
  |----------------|--------------|-------------------------------------------------|
  | Modalità di trasporto | 11459-5      | Transport mode EMS system |
  | Motivo della visita | 46239-0      | Chief complaint+Reason for visit |
  | Triage | 54094-8      | ED Triage note |
  | Dimissione | 28574-2      | Discharge note |

 ***Modalità di Trasporto***: Elemento OBBLIGATORIO atto a descrivere le modalità di trasporto (modalità arrivo) del paziente al Pronto Soccorso ed il responsabile dell’invio al Pronto Soccorso. 
Questa sezione è costituita da un elemento  ```<text>``` di testo libero associato ad un elemento ```<entry>``` di tipo ```<act>``` che riporta i valori codificati relativi al Responsabile Invio e al Mezzo di Trasporto.

 | Item       | DT |  Card                    | Conf | Description
 |----------------|--------------|-------------------------------------------------|--|--|
 | @classCode | CS      | 0 .. 1 | O | DOCSET | 
 | @moodCode | CS      |  0 .. 1| O | EVN |
 | templateId | II | 1 .. 1 | M | @root 2.16.840.1.113883.2.9.10.1.6.20 |
 | code |  CE  | 1 .. 1  | M | @code "11459-5" @codeSystem "2.16.840.1.113883.6.1" @codeSystemName "LOINC" @displayName "Modalità di Trasporto" |
 | title | ST     | 1 .. 1 | R | “Modalità di trasporto” |
 | text | SD.TEXT      | 1 .. 1 | R | Blocco human readable: testo libero che riporta Modalità di trasporto e responsabile invio |
 | entry |       | Discharge note | R | VPS Act Trasporto |
 | @typeCode | CS      | Discharge note | R | |


*Entry Trasporto, act: Elemento OBBLIGATORIO atto a descrivere il mezzo di trasporto ed il responsabile dell’invio al Pronto Soccorso in forma codificata. Tali informazioni sono derivate dalle "SPECIFICHE FUNZIONALI DEI TRACCIATI 118 E PRONTO SOCCORSO"*.

| Item       | DT |  Card                    | Conf | Description
|----------------|---------------------|-------------------------------------------------|--|-------------|
| @classCode | CS      | 1 .. 1 | O | TRNS | 
| @moodCode | CS      |  1 .. 1| O | EVN |
| templateId | II | 1 .. 1 | M | @root 2.16.840.1.113883.2.9.10.1.6.40 |
| code |  CE  | 1 .. 1  | M | @code: valori da @codesystem “2.16.840.1.113883.2.9.6.1.54.6” (ModalitàTrasporto_VPS) |
| statusCode | CS     | 1 .. 1 | R | @code “completed”
| participant |       | 1 .. 1 | R | Responsabile Invio |
| @typeCode | CS     | 1 .. 1 | R | “REFB” |
| participantRole |       | 1 .. 1 | R | |
| code |       | 1 .. 1 | R | @code: valori da @codeSystem "2.16.840.1.113883.2.9.6.1.54.1" (ResponsabileInvio_VPS) |


***Motivo della Visita***: Elemento OBBLIGATORIO atto a descrivere il motivo per cui il paziente accede al Pronto Soccorso, ed il problema, il sintomo principale riscontrato o percepito dal paziente. 
Questa sezione è costituita da un elemento  ```<text>``` di testo libero associato a due elementi ```<entry>``` di tipo ```<Observation>``` che riportano i valori codificati relativi al Problema Principale e alla Causa di Accesso.

| Item       | DT |  Card                    | Conf | Description
  |----------------|--------------|-------------------------------------------------|--|--|
  | @classCode | CS      | 0 .. 1 | O | DOCSET | 
 | @moodCode | CS      |  0 .. 1| O | EVN |
 | templateId | II | 1 .. 1 | M | @root 2.16.840.1.113883.2.9.10.1.6.42 |
 | code |  CE  | 1 .. 1  | M | @code "46239-0" @codeSystem "2.16.840.1.113883.6.1" @codeSystemName "LOINC" @displayName "Motivo della visita" |
 | title | ST     | 1 .. 1 | R | “Motivo della Visita” |
 | text | SD.TEXT      | 1 .. 1 | R | Blocco human readable Testo libero che riporta Causa di Accesso e Problema Principale. |
 | entry |       | 1 .. 1 | R | VPS Observation Problema Principale |
 | entry |       | 0 .. 1 | O | VPS Observation Causa Accesso |

*Entry Problema Principale, Observation: Elemento OBBLIGATORIO atto a descrivere il problema / sintomo principale riscontrato / percepito al momento del triage, in forma codificata. Nel caso in cui il valore codificato non dovesse essere disponibile, è possibile utilizzare un NullFlavor. Tali informazioni sono derivate dalle "SPECIFICHE FUNZIONALI DEI TRACCIATI 118 E PRONTO SOCCORSO". (v7.4 2016).*

| Item       | DT |  Card                    | Conf | Description
  |----------------|--------------|-------------------------------------------------|--|--|
  | @classCode | CS      | 1 .. 1 | R | OBS | 
  | @moodCode | CS      |  1 .. 1| R | EVN |
  | templateId | II | 1 .. 1 | M | @root 2.16.840.1.113883.2.9.10.1.6.37 |
  | code |  CE  | 1 .. 1  | R | @code "56817-0" @codeSystem "2.16.840.1.113883.6.1" @codeSystemName "LOINC" @displayName "Problema all'accesso"|
  | statusCode | CS     | 1 .. 1 | R | @code “completed” |
  | value |       | 1 .. 1 | R | @code: valori da @codeSystem “2.16.840.1.113883.2.9.6.1.54.2” (ProblemaPrincipale_VPS) |

***Triage***: Elemento OBBLIGATORIO atto a descrivere la fase di triage dell’accesso in Pronto Soccorso. Può anche includere le informazioni relative a più atti di triage (nel caso di rivalutazioni). Andrà obbligatoriamente riportato il codice del livello di triage associato all’accesso. Questa sezione è costituita da un elemento ```<entry>``` di testo libero associato ad almeno un elemento ```<entry>``` di tipo ```<Observation>``` che riporta i valori codificati relativi al livello di triage.

| Item       | DT |  Card                    | Conf | Description
  |----------------|--------------|-------------------------------------------------|--|--|
  | @classCode | CS      | 0 .. 1 | O | DOCSET | 
  | @moodCode | CS      |  0 .. 1| O | EVN |
  | templateId | II | 1 .. 1 | M | @root 2.16.840.1.113883.2.9.10.1.6.21 |
  | code |  CE  | 1 .. 1  | R | @code "54094-8" @codeSystem "2.16.840.1.113883.6.1" @codeSystemName "LOINC" @displayName “Triage note" |
  | title | ST     | 1 .. 1 | R | “Triage” |
  | text | SD.TEXT      | 1 .. 1 | R | Blocco human readable: Triage |
  | entry |       | 1 .. 1 | R | VPS Observation Triage |
  | @typeCode | CS      | 1 .. 1 | R | |

*Entry Triage, Observation: Elemento OBBLIGATORIO atto a descrivere il valore del codice del livello di triage assegnato all'accettazione e nei successivi controlli precedenti la visita medica.* 

	| Item       | DT |  Card                    | Conf | Description
	  |----------------|--------------|-------------------------------------------------|--|--|
	  | @classCode | CS      | 1 .. 1 | O | OBS | 
	  | @moodCode | CS      |  1 .. 1| O | EVN |
	  | templateId | II | 1 .. 1 | M | @root 2.16.840.1.113883.2.9.10.1.6.39 |
	  | text | ED      | 0 .. 1 | R | L'elemento , se presente, punta al testo che descrive l'informazione che viene registrata; comprese date, commenti, ecc. Il contiene un attributo URI in valore. Questo URI indica la descrizione del testo libero del problema nel documento che viene descritto. |
	  | code |    CE   | 1 .. 1 | R | @code "11283-9" @codeSystem "2.16.840.1.113883.6.1" @codeSystemName "LOINC" @displayName "Valutazione Acutezza" |
	  | statusCode |    CS   | 1 .. 1 | R | @code “completed”  |
	  | effectiveTime |    IVL TS   | 0 .. 1 | R | Data ora Triage  |
	  | value |       | 1 .. 1 | R | @code: valori da @codeSystem “2.16.840.1.113883.2.9.6.1.54.4” (CodiceTriage_VPS)  |
	  | performer |       | 0 .. * |  | Operatore di triage  |
	  | @typeCode |    CS   | 0 .. 1 | O | PRF |
	  | assignedEntity |     | 1 .. 1 | R |  |
	  | id | II    | 1 .. * | R | Codice fiscale |
	  | assignedPerson |     | 1 .. 1 | R |  |
	  | name |  PN   | 1 .. 1 | R | Include nome e cognome |

***Dimissione***: Elemento OBBLIGATORIO atto a descrivere i dati relativi alla fase di dimissione, tra cui la diagnosi di dimissione, la prognosi, l’esito del trattamento. È inoltre possibile riportare le note relative alle consegne per un trasferimento del paziente, o per il suo ricovero. Questa sezione è costituita da un elemento ```<text>``` di testo libero associato ```<entry>``` ad un elemento di tipo ```<act>```, contenente le informazioni codificate sul medico che ha effettuato la dimissione, la diagnosi e l’esito del trattamento, e OPZIONALMENTE uno o più elementi ```<entry>``` di tipo ```<observation>``` contenenti le informazioni codificate relative a prognosi, livello di appropriatezza e dati sul decesso. 

| Item       | DT |  Card                    | Conf | Description
  |----------------|--------------|-------------------------------------------------|--|--|
  | @classCode | CS      | 0 .. 1 | O | DOCSET | 
  | @moodCode | CS      |  0 .. 1| O | EVN |
  | templateId | II | 1 .. 1 | M | @root 2.16.840.1.113883.2.9.10.1.6.24 |
  | code | CE      | 1 .. 1 | M | @code "28574-2" @codeSystem "2.16.840.1.113883.6.1" @codeSystemName "LOINC" @displayName " Note di Dimissione" |
  | title |    ST   | 1 .. 1 | R | "Dimissione" |
  | text |    SD.TEXT   | 1 .. 1 | R | Blocco human readable Note di dimissione, diagnosi di dimissione, esito del trattamento. Consegne trasferimento o ricovero.  |
  | entry |     | 1 .. 1 | R | VPS Act Dimissione |
  | entry |     | 0 .. * | R | VPS Observation Prognosi  |
  | entry |     | 0 .. 1 | O | VPS Observation Livello Appropriatezza |
  | entry |     | 1 .. 1 | R | VPS Observation Data decesso |
  | entry |     | 1 .. 1 | R | VPS Observation Richiesta autopsia |

*Entry Dimissione, act: Elemento OBBLIGATORIO atto a descrivere i dati strutturati della dimissione quali medico di dimissione, diagnosi di dimissione, esito del trattamento, dati relativi al trasferimento o al ricovero.*

| Item       | DT |  Card                    | Conf | Description
  |----------------|--------------|-------------------------------------------------|--|--|
  | @classCode | CS      | 0 .. 1 | O | DOCSET | 
  | @moodCode | CS      |  0 .. 1| O | EVN |
  | templateId | II | 1 .. 1 | M | @root 2.16.840.1.113883.2.9.10.1.6.66 |
  | code | CE      | 1 .. 1 | M | @code “dimissione” @codeSystem “2.16.840.1.113883.2.9.5.1.4” |
  | statusCode | CS      | 1 .. 1 | R | @code "completed"|
  | effectiveTime |    TS   | 1 .. 1 | R | Data e ora di dimissione |
  | performer |       | 1 .. 1 | R | Medico di dimissione  |
  | assignedEntity |     | 1 .. 1 | R | |
  | id |   II  | 1 .. * | R | Codice fiscale medico dimissione |
  | assignedPerson |     | 1 .. 1 | R | |
  | name |   PN  | 1 .. 1 | R | Include il nome e cognome del medico che ha effettuato la dimissione |
  | entryRelationship |     | 0 .. * | O | VPS Encounter Post Dimissione 
  | entryRelationship |     | 0 .. * | O | VPS Trasferimento Post Dimissione 
  | entryRelationship |     | 0 .. * | O | VPS Observation Diagnosi Dimissione 
  | entryRelationship |     | 0 .. * | O | VPS Observation Esito 
