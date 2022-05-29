## Prescrizione
L’obiettivo del presente documento è definire una guida all’implementazione per il documento di prescrizione valido nel contesto italiano, l’attuale ricetta cartacea del S.S.N., il documento di riferimento per il processo che gestisce la fase di prescrizione e la fase d’erogazione di farmaci/prestazioni sanitarie 30 finanziate dal S.S.N.

Per quanto riguarda i possibili utilizzi della ricetta rossa questi sono i principali: 
- prescrizione di farmaci del Prontuario; 
- prescrizione di sostanze ricavate attraverso preparazioni galeniche; 
- prescrizione farmaceutica integrativa; 
- prescrizione di servizi diagnostici (ad esempio strumentale, per immagini e di laboratorio); 
- prescrizione per la richiesta di ricovero; 
- prescrizione per visite specialistiche/ambulatoriali; 
- prescrizione per la riabilitazione periodica; 
- prescrizione per l’acquisizione di dispositivi/ausili/presidi medici; 
- prescrizione per richiesta di trasporto; 
- prescrizione per cure termali.

Si sono trattati quattro diversi filoni di riferimento, ossia: 
- la prescrizione farmaceutica. In questo filone sono gestite anche le prescrizioni per preparazioni galeniche; 
- la prescrizione specialistica che include anche la prescrizione di servizi diagnostici. In questo filone sono gestite anche le prescrizioni per le riabilitative periodiche; 
- la prescrizione di ricovero. In questo filone sono gestite anche le prescrizioni per la richiesta di trasporto; 
- la prescrizione presidi e ausili.

### Header
- ***ClinicalDocument***: elemento root per la struttura xml che rappresenta il documento di Prescrizione CDA R2. 
Il namespace per un documento CDA R2 è urn:hl7-org:v3. Deve essere usato un namespace appropriato nell’instanza XML del Clinical Document. 
Negli esempi di questa specifica tutti gli elementi sono mostrati senza prefisso, assumendo che il namespace di default sia dichiarato essere urn:hl7-org:v3.

	Esempio di utilizzo:
	```xml
	<ClinicalDocument xmlns="urn:hl7-org:v3" 		xmlns:mif="urn:hl7-org:v3/mif"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
	…
	</ClinicalDocument>
	```

- ***recordTarget***: elemento OBBLIGATORIO che identifica il soggetto per cui è stata compilata la prescrizione ossia l’assistito. Il documento di Prescrizione DEVE contenere uno ed un solo elemento recordTarget.

	Esempio di utilizzo:
	```xml
	<recordTarget>
		<patientRole classCode="PAT">
			<id ……../>
			<addr use="HP">
				<houseNumber>1</houseNumber>
				<streetName>Vicolo Corto</streetName>
				<city>Pisa</city>
	 			<postalCode>56124</postalCode>
	 		</addr>
		</patientRole>
	</recordTarget>
	```

-   **author** :  elemento OBBLIGATORIO che identifica il soggetto che ha creato il documento. 
L’elemento author/time DEVE essere presente. L’elemento author/time rappresenta la data e ora in cui l’autore ha creato il documento. Si osserva che fintantoché il processo di prescrizione-erogazione non sarà completamente informatizzato, tale data rappresenta la data di compilazione della prescrizione riportata sulla ricetta rossa.
L’elemento author è composto da un ruolo assignedAuthor che DEVE essere rappresentato da una persona (assignedPerson) che nel nostro caso è il medico prescrittore.
L’istanza OBBLIGATORIA di assignedAuthor/id DEVE essere rappresentata dal Codice Fiscale del medico prescrittore.

-   ***custodian*** :  elemento OBBLIGATORIO che rappresenta l’organizzazione incaricata della custodia del documento originale (nel caso della prescrizione è solitamente la struttura di cui fa parte colui che ha creato il documento come ad esempio il medico di famiglia). 
Le informazioni sull’organizzazione custode del documento vengono gestite in custodian/assignedCustodian/representedCustodianOrganization. L’identificativo univoco della struttura responsabile della conservazione del documento è custodian/assignedCustodian/representedCustodianOrganization/id.
Nel caso di una ASL custode del documento, la root da utilizzare è quella sotto il ramo del Ministero della Sanità ossia 2.16.840.1.113883.2.9.4.1.1. 
Nel CDA della prescrizione è POSSIBILE specificare anche il nome, l’indirizzo ed un recapito telefonico dell’organizzazione custode del documento. 
Queste informazioni vengono veicolate rispettivamente negli elementi: 
	- custodian/assignedCustodian/representedCustodianOrganization/name;
	- custodian/assignedCustodian/representedCustodianOrganization/addr;
	- custodian/assignedCustodian/representedCustodianOrganization/telecom
	
	Esempio di utilizzo:
	```xml
	<custodian>
		<assignedCustodian>
			<representedCustodianOrganization>
				<id root="2.16.840.1.113883.2.9.4.1.1"
				    extension="130106"
				    assigningAuthorityName="Ministero della Salute"/>
				<name>ASL Teramo</name>
				<telecom value="tel:085 80201"/>
				<addr>Circonvallazione Ragusa, 1 - 64100 Teramo</addr>
			</representedCustodianOrganization>
		</assignedCustodian>
	</custodian>
	```

-   **legalAuthenticator** :  legalAuthenticator è un elemento OBBLIGATORIO che identifica il soggetto che ha legalmente autenticato il documento di prescrizione. Si osserva che il CDA R2 non gestisce direttamente la firma elettronica del soggetto che ha legalmente autenticato il documento (es. la firma del medico prescrittore) ma gestisce, attraverso l’indicazione di uno specifico attributo, che il documento è stato firmato (vedi di seguito elemento signatureCode). La firma elettronica può poi essere apposta secondo la normativa vigente.
Il ruolo di firmatario (legalAuthenticator) DEVE essere “giocato” dalla stessa persona che riveste il ruolo di autore (author).

	Esempio di utilizzo:
	```xml
	<legalAuthenticator>
		<time value="20080116145934+0100"/>
		<signatureCode code="S"/>
		<assignedEntity>
			<id root="2.16.840.1.113883.2.9.4.3.2"
			    extension="MSTMCL24P28D667W"
			    assigningAuthorityName="Ministero Economia e Finanze"/>
		</assignedEntity>
	</legalAuthenticator>
	```
-  ***Relazione con documento sostituito***: La gestione delle versioni dei documenti CDA è da intendersi come gestione in sostituzione (“replacement”) del documento corrente rispetto alle precedenti versioni;
relatedDocument con attributo relatedDocument/@typeCode popolato con RPLC (replace) viene utilizzato nelle versioni successive alla prima versione del documento di prescrizione.
Alla generazione della prima versione del documento relatedDocument/[@typeCode=”RPLC”] è un elemento OPZIONALE, mentre diventa un elemento OBBLIGATORIO nell’emissione di versioni successive alla prima.
Il documento ”padre” del documento corrente è gestito in relatedDocument/[@typeCode=”RPLC”]/parentDocument dove: 
	- l’elemento parentDocument/id è OBBLIGATORIO e riporta l’identificativo univoco del documento padre; 
	- l’elemento parentDocument/setId è OBBLIGATORIO e DEVE coincidere con l’elemento ClinicalDocument/setId (si rimanda al paragrafo 5.3.1.10 per ulteriori dettagli) 
	- l’elemento parentDocument/versionNumber, che rappresenta la versione del documento padre rispetto al documento corrente, è OPZIONALE e, se presente, DEVE essere valorizzato con la versione del documento padre (si rimanda al paragrafo 5.3.1.10 per ulteriori dettagli).

	Esempio di utilizzo:
	```xml
	<legalAuthenticator>
		<time value="20080116145934+0100"/>
		<signatureCode code="S"/>
		<assignedEntity>
			<id root="2.16.840.1.113883.2.9.4.3.2"
			    extension="MSTMCL24P28D667W"
			    assigningAuthorityName="Ministero Economia e Finanze"/>
		</assignedEntity>
	</legalAuthenticator>
	```

 -  ***Identificativo ricetta cartacea***: Nel caso in cui la gestione del ciclo prescrittivo-erogativo avvenga anche attraverso l’attuale ricettario del poligrafico (gestione non puramente elettronica), per cui l’identificativo del documento CDA di prescrizione venga generato dinamicamente, allora è necessario gestire l’identificativo della ricetta cartacea.
In questo scenario, il documento CDA di prescrizione di fatto può essere considerato una trasformazione del documento “sorgente” che è la ricetta rossa stampata dal Poligrafico dello Stato. 
Nello standard CDA tale tipo di relazione viene interpretata come un processo di trasformazione del documento in oggetto (il CDA di prescrizione) da un documento sorgente (la ricetta rossa). 
La gestione di questa relazione avviene attraverso l’elemento relatedDocument valorizzando l’attributo relatedDocument/@typeCode popolato con XFRM (trasform). Pertanto l’identificativo della ricetta SSN/SASN emesso dal poligrafico dello Stato DEVE essere gestito in questo elemento.

	Esempio di utilizzo: 
	```xml
	<relatedDocument typeCode="XFRM">
		<parentDocument classCode="DOCCLIN"
						moodCode="EVN">
		  <id root="2.16.840.1.113883.2.9.4.3.4"
		      extension="042060013654844"
		      assigningAuthorityName="Ministero Economia e Finanze"/>
		</parentDocument>
	</relatedDocument>
	```
 
### Body
Un documento di prescrizione DEVE avere un body di tipo structuredBody in cui vengono gestite le informazioni relative alle esenzioni e all’oggetto della prescrizione vera e propria (ad esempio farmaci prescritti, visite specialistiche prescritte, etc.) con relative informazioni associate (ad esempio priorità di quanto prescritto).
In particolare il CDA Body del documento di prescrizione DEVE contenere due structuredBody/component/section relative rispettivamente alle informazioni di esenzione ed alle informazioni oggetto della prescrizione vera e propria e PUÒ contenere una structuredBody/component/section relativa ad annotazioni in cui sono gestite le informazioni contenute nell’elemento 30 della ricetta cartacea e nelle note di carattere generale sulla prescrizione stessa. Si osserva che le tre tipologie di structuredBody/component/section sono comuni a tutte e quattro le categorie di prescrizione (farmaceutica, specialistica, ricovero, presidi/ausili) che sono state individuate.

> L'elemento structuredBody
  > - DEVE contenere: 
	 - uno ed un solo elemento component/section relativo alle Esenzioni
	 - uno ed un solo elemento component/section relativo alle Prescrizioni

- ***Esenzioni***:  Per quanto riguarda il mapping delle informazioni connesse all’esenzione si è tenuto conto della modalità ad oggi adottata dai prescrittori relativamente alle prescrizioni in esenzione, ossia nella medesima ricetta di prescrizione: 
	- non possono essere effettuate delle prescrizioni per le quali non siano applicate le medesime esenzioni, intendendo anche il fatto che non è possibile trovare al contempo delle prescrizioni in esenzione e prescrizioni che non prevedono alcuna esenzione; 
	- è al più indicata una sola esenzione (quella più “favorevole” per l’assistito). 
	
	Per questo motivo nella ricetta di prescrizione l’informazione di esenzione non è connessa alle prescrizioni, ma si applica a tutto il documento di prescrizione, ed inoltre è possibile al più indicare solo una esenzione.
	L’elemento structuredBody/component/section relativo alle Esenzioni è un elemento OBBLIGATORIO che contiene informazioni relative alla situazione in cui si colloca il paziente nei confronti delle esenzioni, ad esempio nel caso in cui al paziente sia riconosciuta una esenzione per patologia, verrà riportata l’informazione relativa al tipo di esenzione riconosciuta, nel caso in cui al paziente non sia riconosciuto alcun tipo di esenzione, verrà riportata questa informazione

- ***Prescrizioni***:  elemento OBBLIGATORIO che contiene informazioni relative a quanto oggetto della prescrizione vera e propria, ad esempio:
	- nel caso di prescrizione farmaceutica, conterrà informazioni relative ai farmaci prescritti, al numero di pezzi/confezioni del farmaco prescritto;
	- nel caso della prescrizione specialistica e riabilitativa, conterrà informazioni relative alle prestazioni specialistiche o riabilitative prescritte, alla priorità richiesta dal prescrittore, al quesito diagnostico/diagnosi indicato dal prescrittore, alla quantità della prestazione specialistica o della riabilitativa prescritta, ad eventuali note e commenti;
	- nel caso della prescrizione di ricovero e richiesta trasporto, conterrà informazioni relative al ricovero prescritto o alla richiesta di trasporto, alla priorità richiesta dal prescrittore, al quesito diagnostico/diagnosi indicato dal prescrittore, ad eventuali note e commenti;
	- nel caso della prescrizione di presidi ed ausili, conterrà informazioni relative ai presidi ed ausili prescritti, alla quantità della presidio ed ausilio prescritto, al quesito diagnostico/diagnosi indicato dal prescrittore, ad eventuali note e commenti.
	
	Il documento di prescrizione DEVE contenere uno ed un solo elemento structuredBody/component/section relativo alle Prescrizioni che è identificato da un elemento section/code specifico che indica che la section in oggetto è relativa alle Prescrizioni. Inoltre l’elemento structuredBody/component/section potrà contenere un elemento section/title in cui è gestito il titolo della section relativo alle prescrizioni e dovrà contenere un elemento section/text in cui è presente il blocco narrativo e quindi le informazioni human-readable relative alle prescrizioni. Si osserva infine che in funzione della tipologia di prescrizione ossia Farmaceutica, Specialistica/Riabilitativa, Ricovero/Richiesta Trasporto o Presidi e Ausili, l’elemento conterrà un numero variabile di elementi di tipo entry a cui sono associati ClinicalStatement diversi in cui sono gestite, a livello machine-readable, le informazioni relative alle prestazioni prescritte.

	Esempio di utilizzo: 
	```xml
	<component>
	    <section>
	 	   <code code="57828-6"
			 codeSystem="2.16.840.1.113883.6.1"
	                 codeSystemName="LOINC"
	                 displayName="Prescriptions"/>
	           <title>Prescrizioni</title>
			   <text>
		         <list ID="RQO">
	                   <caption>Prestazioni richieste</caption>
		               <item>
	                       <content ID="p1">
		                       RX TORACE
		                   </content>
	                       <content ID="d1">
		                       SospettaBroncopolmonite
	                       </content>
					       <content ID="c1">
							   ... Note e commenti alla prestazione ...
				           </content>
			           </item>
	             </list>
		       </text>
	           <entry>
			         <observation moodCode="RQO"
	 			                  classCode="OBS">
	                    <code code="Codice per RX Torace"
				              codeSystem="2.16.840.1.113883.2.9.6.1.11"
				              codeSystemName="Codice della prestazione
						                      specialistica ">
				            <originalText>
							    <reference value="#p1"/>
					        </originalText>
			            <translation code="Codice regionale per RX Torace"
				        codeSystem="2.16.840.1.113883.2.9.2.160.6.11"
					    codeSystemName="Dizionario regionale delle
							             prestazioni sanitarie"/>
			            </code>
						<entryRelationship typeCode="SUBJ"
									       inversionInd="true" >
				                  <act moodCode="EVN"
						                classCode="ACT">
							         <code code="48767-8"
								           codeSystem="2.16.840.1.113883.6.1"
									       codeSystemName="LOINC"
									       codeSystemVersion="2.19"
									       displayName="Annotation Comment"/>
									 <text>
								         <reference value="#c1"/>
							         </text>
				                  </act>
			            </entryRelationship>
			            <entryRelationship typeCode="RSON">
				            <observation moodCode="EVN" classCode="OBS">
					            <code code="Codice ICD-9CM per
					                     Broncopolmonite"
							          codeSystem="2.16.840.1.113883.6.103"
					                  codeSystemName="ICD-9CM">
							          <originalText>
							              <reference value="#d1"/>
					                  </originalText>
					            </code>
				            </observation>
			            </entryRelationship>
		             </observation>
		       </entry>
	       </section>
	</component>
	```
	Tipologie di prescrizione:

	- *Prescrizione farmaceutica*: documento normato che riporta una previsione clinica e un ordine amministrativo, indirizzato alla struttura erogante (ex: FARMACIA), di fornire al paziente un insieme di presidi medicinali. 
La prescrizione farmaceutica prevede la possibilità per il prescrittore di prescrivere nella medesima ricetta di prescrizione un numero variabile di medicinali e per ogni medicinale un numero variabile di confezioni. Il numero massimo di medicinali ed il numero massimo di confezioni per medicinale è definito in relazione alle normative vigenti nazionali e all’attuazione di precise disposizioni regionali. Ad esempio la normativa nazionale prevede che possano essere prescritti nella medesima ricetta di prescrizione al più due farmaci differenti e che per una tipologia di farmaco possono essere prescritte al più sei confezioni, tenuto conto comunque che il numero totale di confezioni prescritte nella medesima ricetta non può superare le sei confezioni. A livello regionale poi possono essere definite disposizioni specifiche ed interpretazioni, ad esempio in alcuni casi è possibile superare il numero massimo di sei confezioni per medicinale considerando i casi monodose o fleboclisi 'virtualmente' come una confezione. Tenuto conto della variabilità delle regole di prescrizione, per consentire un’interoperabilità tra regioni differenti, è stato scelto di non vincolare la struttura del documento CDA di prescrizione relativamente al numero massimo di farmaci prescrivibili, al numero massimo di confezioni prescrivibili per farmaco e al numero massimo di confezioni totali prescrivibili nella medesima ricetta di prescrizione.
Le prestazioni farmaceutiche e le informazioni relative a queste sono gestite nell’elemento section/entry che è utilizzato per codificare in formato machine-readable il contenuto della prescrizione farmaceutica della section. 
In particolare, per la codifica in formato machine-readable delle prescrizioni farmaceutiche, viene utilizzato l’elemento entry/substanceAdministration con attributo substanceAdministration/@moodCoode valorizzato con RQO (request) tenuto conto che la prescrizione rappresenta un’ordine da parte del prescrittore (si veda a questo proposito in HL7 Version 3 Standard: Pharmacy; Medication Order, Release 1, Last Ballot: May 2007 l’R-MIM Medication Order/Prescription Detail (PORX_RM010120UV)). 
Tenuto conto che una richiesta di prescrizione farmaceutica DEVE avere almeno un medicinale prescritto, nel caso della prescrizione farmaceutica l’elemento section, relativo alla prescrizione, DEVE contenere almeno un elemento entry, ogni elemento entry DEVE contenere un elemento substanceAdministration.

	- *Prescrizione specialistica e Riabilitativa*: La prescrizione prevede la possibilità per il prescrittore di prescrivere nella medesima ricetta di prescrizione un numero variabile di prestazioni specialistiche/riabilitative e per ogni prestazione un numero variabile di sedute. Il numero massimo di prestazioni specialistiche/riabilitative e, nel caso delle prestazioni riabilitative, il numero massimo di sedute è definito in relazione alle normative vigenti nazionali e all’attuazione di precise disposizioni regionali. Ad esempio la normativa nazionale prevede che possano essere prescritti nella medesima ricetta di prescrizione al più otto prestazioni specialistiche/riabilitative differenti e che per ogni prestazione riabilitativa possono essere prescritte al più 12 sedute. A livello regionale poi possono essere definite disposizioni specifiche ed interpretazioni. Tenuto conto della variabilità delle regole di prescrizione, per consentire un’interoperabilità tra regioni differenti, è stato scelto di non vincolare la struttura del documento CDA di prescrizione relativamente al numero massimo di prestazioni prescrivibili e al numero massimo di sedute prescrivibili per prestazioni riabilitative. 
Le prestazioni specialistiche e riabilitative prescritte e le informazioni relative a queste sono gestite nell’elemento section/entry che è utilizzato per codificare in formato machine-readable il contenuto della prescrizione specialistica/riabilitativa della section. In particolare, per la codifica in formato machine-readable delle prestazioni specialistiche e riabilitative, richieste dal prescrittore, viene utilizzato l’elemento entry/observation. Tenuto conto che una richiesta di prescrizione specialistica/riabilitativa DEVE avere almeno una prescrizione specialistica o una prescrizione riabilitativa, nel caso della prescrizione specialistica/riabilitativa l’elemento section, relativo alla prescrizione, DEVE contenere almeno un elemento entry, ogni elemento entry DEVE contenere un elemento observation.

	- *Prescrizione Ricovero e Richiesta Trasporto*: Il ricovero o la richiesta di trasporto prescritto con le informazioni relative, sono gestite nell’elemento section/entry che è utilizzato per codificare in formato machine-readable il contenuto della prescrizione di ricovero o la richiesta di trasporto della section. In particolare, per la codifica in formato machine-readable del ricovero o della richiesta di trasporto richiesto dal prescrittore, viene utilizzato l’elemento entry/act. 
Tenuto conto che, una richiesta di ricovero/trasporto, DEVE riportare uno ed un solo ricovero o richiesta di trasporto prescritto, nel caso della prescrizione di ricovero/trasporto l’elemento section, relativo alla prescrizione, DEVE contenere uno ed un solo elemento entry che DEVE contenere un elemento act.

	- *Prescrizione Presidi/Ausili*: La prescrizione prevede la possibilità per il prescrittore di prescrivere nella medesima ricetta di prescrizione un numero variabile di presidi/ausili e per ogni presidio/ausilio un numero variabile di questi. Il numero massimo di presidi/ausili differenti e il numero massimo presidi/ausili della stessa tipologia è definito in relazione alle normative vigenti nazionali e all’attuazione di precise disposizioni regionali. Tenuto conto della variabilità delle regole di prescrizione, per consentire un’interoperabilità tra regioni differenti, è stato scelto di non vincolare la struttura del documento CDA di prescrizione relativamente al numero massimo di presidi/ausili prescrivibili e al numero massimo di presidi/ausili della stessa tipologia. 
I presidi ed ausili prescritti e le informazioni relative a questi sono gestite nell’elemento section/entry che è utilizzato per codificare in formato machine-readable il contenuto della prescrizione di presidi ed ausili della section. 
In particolare, per la codifica in formato machine-readable dei presidi ed ausili, richiesti dal prescrittore, viene utilizzato l’elemento entry/supply. 
Tenuto conto che una richiesta per presidi ed ausili DEVE avere almeno una prescrizione per presidio o ausilio, nel caso della prescrizione di presidi ed ausili l’elemento section, relativo alla prescrizione, DEVE contenere almeno un elemento entry, ogni elemento entry DEVE contenere un elemento supply.
