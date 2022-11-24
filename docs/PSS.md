# Profilo Sanitario Sintetico (PSS)
Il `Profilo Sanitario Sintetico (PPS)` è il documento socio-sanitario informatico redatto e aggiornato dal MMG/PLS, che riassume la storia clinica dell’assistito e la sua situazione corrente conosciuta.
In particolare, lo scopo del documento è quello di favorire la continuità di cura, permettendo un rapido inquadramento del paziente al momento di un contatto con il Servizio Sanitario Nazionale.

Il `PPS` è quindi un documento: 
- __sintetico__: riporta solo le informazioni essenziali; 
- __con un unico autore__: è creato, aggiornato e mantenuto solo dal MMG/PLS titolare, non può essere creato automaticamente; 
- __non clinicamente specializzato__: il contenuto del PSS deve essere tale da contribuire alla continuità di cura a prescindere dallo scenario d’uso; 
- __senza destinatario predefinito__;
- __unico__: all’interno di un dominio di condivisione documentale (FSE, Carta Sanitaria) deve esistere un solo PSS "valido" per paziente.

## CDA Header

### 3.1.1 Dominio: `<realmCode>`
Il tag `<ClinicalDocument>/<realmCode>` individua il
dominio di appartenenza del documento ed indica che il documento deve seguire eventuali restrizioni definite per il realm italiano.

| Attributo | Tipo | Valore | Dettagli | Obbligatorio |
|---|:---:|:---:|---|:---:|
|code|CE|"IT"|Definisce l'id di contesto per l'italia|X|

### 3.1.2 Identificativo CDA2: `<typeId>`
Il tag `<ClinicalDocument>/<typeId>` identifica la versione di riferimento del CDA. 
| Attributo | Tipo | Valore | Dettagli | Obbligatorio |
|---|:---:|:---:|---|:---:|
|root|OID|"2.16.840.1.113883.1.3"||X|

### 3.1.3 Identificativo del template HL7: `<templateId>`
Indica il template di riferimento per il documento corrente.
| Attributo | Tipo | Valore | Dettagli | Obbligatorio |
|---|:---:|:---:|---|:---:|
| root | OID | "2.16.840.1.113883.2.9.10.1.9.1" |  | X |
| extension | ST | `[VERSIONE_TEMPLATE]` | Identificativo del template | X |

### 3.1.4 Identificativo del documento: `<id>`
Il tag `<ClinicalDocument>/<id>` rappresenta l’identificativo univoco del documento CDA.
| Attributo | Tipo | Valore | Dettagli | Obbligatorio |
|---|:---:|:---:|---|:---:|
| root | OID | `[OID_STRUTTURA_COMPETENZA]` | Identificativo univoco del dominio di identificazione dei documenti (ad es. può indicare l'ASL di competenza del documento) | X |
| extension | ST | `[EXTENSION_ID]` | Generato dall'autore per evitare collisioni all'interno del medesimo dominio di competenza | X |

### 3.1.5 Codice del documento: `<code>`
Il tag `<ClinicalDocument>/<code>` rappresenta la tipologia di documento clinico.
| Attributo | Tipo | Valore | Dettagli | Obbligatorio |
|---|:---:|:---:|---|:---:|
| code | CS | "60591-5" | Codice relativo alla tipologia di documento (PSS) | X |
| codeSystem | OID | "2.16.840.1.113883.6.1" | OID del sistema di codifica dei codici di documento LOINC | X |
| codeSystemName | ST | "LOINC" | Nome del vocabolario |  |
| displayName | ST | "Profilo Sanitario Sintetico" | Titolo visualizzato dal sistema all'utente |  |

### 3.1.7 Data di creazione del documento: `<effectiveTime>`
Elemento che indica la data di creazione del documento.
| Attributo | Tipo | Valore | Dettagli | Obbligatorio |
|---|:---:|:---:|---|:---:|
| value | TS | `[YYYYMMDDHHMMSS+|-ZZZZ]` | Codice relativo alla tipologia di documento (PSS) | X |

### 3.1.8 Riservatezza del documento: `<confidentialityCode>`
Il tag `<ClinicalDocument>/<confidentialityCode>` specifica il livello di riservatezza del documento CDA assegnato al momento della sua creazione.
| Attributo | Tipo | Valore | Dettagli | Obbligatorio |
|---|:---:|:---:|---|:---:|
| code | ST | `N` oppure `V` | Regole di riservatezza | X |
| codeSystem | OID | "2.16.840.1.113883.5.25" | OID codifica | X |
| codeSystemName | ST | HL7 Confidentiality | Nome della specifica |  |

#### Regole di riservatezza
| Codice | Display | Definizione |
|:---:|:---:|---|
| N | Normal | Documenti che contengono dati sanitari di varia natura. |
| V | Very Restricted | Documenti che contengono dati sanitari fortemente confidenziali. |

### 3.1.9 Lingua e dominio: `<languageCode>`
Il tag `<ClinicalDocument>/<languageCode>` specifica la lingua utilizzata nella redazione del documento CDA.
| Attributo | Tipo | Valore | Dettagli | Obbligatorio |
|---|:---:|:---:|---|:---:|
| code | ST | "it-IT" | Identificativo del nome della lingua | X |

### 3.1.10 Versione del documento: `<setId>`
`<ClinicalDocument>/<setId>` rappresenta l’identificativo comune a tutte le revisioni del documento. 
| Attributo | Tipo | Valore | Dettagli | Obbligatorio |
|---|:---:|:---:|---|:---:|
| root | OID | `[OID_STRUTTURA_COMPETENZA]` | Identificativo univoco del dominio di identificazione dei documenti  | X |
| extension | ST | `[EXTENSION_ID]` | Identificativo univoco documento, generato dall'autore  | X |
| assigningAuthorityName | ST | `[NOME_STRUTTURA_COMPETENZA]` | Nome del dominio di identificazione dei documenti  |  |


	Il nuovo documento sostitutivo DEVE comprendere un elemento `<relatedDocument>` che punta al documento sostituito.

### 3.1.10 Versione del documento: `<versionNumber>`
`<ClinicalDocument>/<versionNumber>` rappresenta la
versione del documento stesso (cambia al variare della versione).
| Attributo | Tipo | Valore | Dettagli | Obbligatorio |
|---|:---:|:---:|---|:---:|
| value | INT | `[VERSIONE_DOCUMENTO]` | Valore incrementato di un'unità ad ogni successiva versione  | X |

### 3.1.11 Paziente del documento: `<recordTarget>`
Il tag `<ClinicalDocument>/<recordTarget>.` identifica la partecipazione relativa al soggetto a cui il documento di PSS si riferisce.
```xml
<recordTarget>
	<patientRole>
		<patient>
			...
		</patient>
	</patientRole>
</recordTarget>
```
#### 3.1.11.1 Paziente soggetto del Documento: `<patientRole>`
Il tag `<recordTarget>/<patienRole>` è un elemento che identifica il ruolo svolto dalla persona a cui il PSS si riferisce. 
| Attributo | Tipo | Valore | Dettagli | Obbligatorio |
|---|:---:|:---:|---|:---:|
| :id | | | | X |
| ---- root | OID | "2.16.840.1.113883.2.9.4.3.2" | OID del Ministero dell'Economia e delle Finanze  | X |
| ---- extension | ST | `[CODICE_FISCALE]` | Codice fiscale del paziente | X |
| ---- assigningAuthorityName | ST | "Ministero Economia e Finanze" | | |
| : addr | | | Indirizzo del paziente | X |
| ---- use | | `HP` oppure `H`[^1] |  | X |
| :::: country | ST | `[COD_STATO_RECAPITO_PAZIENTE]` |  Codice identificativo dello stato Rif:(https://www.istat.it/it/archivio/6747)  | X |
| :::: state | ST | `[COD_REGIONE_RECAPITO_PAZIENTE]` | Codice identificativo della regione |  |
| :::: county | ST | `[COD_PROVINCIA_RECAPITO_PAZIENTE` |  Sigla automobilistica della provincia (Rif https://www.istat.it/it/archivio/6789) |  |
| :::: city | ST | `[DESC_COMUNE_RECAPITO_PAZIENTE]` | Descrizione del comune (Rif https://www.istat.it/it/archivio/6789) | X |
| :::: censusTract | ST | `[COD_COMUNE_RECAPITO_PAZIENTE]` | Codice ISTAT del comune (Rif https://www.istat.it/it/archivio/6789) | X |
| :::: postalCode | ST | `[COD_CAP_RECAPITO_PAZIENTE]` | CAP dell'indirizzo | X |
| :::: streetAddressLine | ST | `[DESC_INDIRIZZO_RECAPITO_PAZIENTE]` | Descrizione indirizzo | X |
| : patient | | | Contiene i dati anagrafici del soggetto della prestazione | X |
| :::: name.family | | | Cognome del paziente | X |
| :::: name.given | | | Nome del paziente | X |
| :::: birthtime | | | Data di nascita del paziente | X |
| :::: administrativeGenderCode | | | Sesso | X |
| -------- code | | | Sesso dichiarato dal paziente | X |
| -------- codeSystemName | | "HL7 AdministrativeGender" | | |


[^1]: "HP" (primary home), "H" (home).


### 3.1.12 Autore del documento: `<author>`
Identifica il soggetto che ha creato il documento. 
| Attributo | Tipo | Valore | Dettagli | Obbligatorio |
|---|:---:|:---:|---|:---:|
| : time | TS | `[YYYYMMddhhmmss+-ZZZZ]` | Ora di produzione del documento | X |
| : assignedAuthor |  | |  | X |
| :::: id |  | | Identifica l'autore del documento | X |
| -------- root | OID |  "2.16.840.1.113883.2.9.4.3.2" |  | X |
| -------- extension | ST | | Codice fiscale dell'autore del documento | X |
| -------- assigningAuthorityName | ST | "MEF" | Codice fiscale del medico autore |  |
| :::: assignedPerson |  | | Nominativo del medico autore | X |
| :::::::: name.family | | | Cognome dell'autore | X |
| :::::::: name.given | | | Nome dell'autore | X |
| :::: telecom |  | | Riferimenti del medico autore | X |

L’elemento `<author>/<assignedAuthor>` DEVE contenere almeno tre
elementi `<telecom>` che riporta i riferimenti e-mail, PEC, telefono, necessari per contattare il medico autore.

```xml
<telecom use="HP" value="mailto://user@domain.com"></telecom>
<telecom use="HP" value="tel:023456789012"></telecom>
<telecom use="HP" value="mailto://user@pec.com"></telecom>
```

#### Esempio completo

```xml
<author>
	<time value="[TS_CREAZIONE]"/>
	<assignedAuthor classCode="ASSIGNED"
		<id root="2.16.840.1.113883.2.9.4.3.2"
		extension="[CF_AUTORE]"
		assigningAuthorityName="MEF"/>
		<addr>
		...
		</addr>
		<telecom value="mailto:[MAIL_AUTORE]"/>
		<telecom value="mailto:[PEC_AUTORE]"/>
		<telecom value="tel:[NUM_TEL_AUTORE]"/>
		<assignedPerson>
			<name>
				<family>[COGNOME_AUTORE]</family>
				<given>[NOME_AUTORE]</given>
			</name>
		</assignedPerson>
		<representedOrganization>
			<id root="2.16.840.1.113883.2.9.4.1.1"
			extension="[COD_PRESIDIO]"
			assigningAuthorityName="Ministero della Salute"/>
		</representedOrganization>
	</assignedAuthor>
</author>
```

### 3.1.15 Conservazione del documento: `<custodian>`
Elemento che identifica l'organizzazione incaricata della custodia del
documento originale, corrispondente al conservatore dei beni digitali.
| Attributo | Tipo | Valore | Dettagli | Obbligatorio |
|---|:---:|:---:|---|:---:|
| : assignedCustodian |  |  | Ruolo | X |
| :::: representedCustodianOrganization |  | | Entità che svolge il ruolo | X |
| :::: id | | |  | X |
| -------- root[^2] | OID | | Identificativo del dominio di identificazione delle organizzazioni. | X |
| -------- extesion | ST | | Identificativo dell’organizzazione (ASL, Regione) da parte del dominio di identificazione definito nell'attributo `@root` | X |
| -------- assigningAuthorityName | ST | | Nome mnemonico dell’Autorità responsabile dell’assegnazione dell’identificativo all’organizzazione custode del documento | X |

[^2]: Se si vuole identificare le Aziende Sanitarie, l'attributo `@root` deve essere valorizzato con l’OID `"2.16.840.1.113883.2.9.4.1.1"`.

### 3.1.17 Firmatario del documento: `<legalAuthenticator>`
Il tag `<legalAuthenticator>` è un elemento OPZIONALE che identifica il soggetto che ha legalmente autenticato il documento PSS.

### 3.1.18 Validatore del documento: `<authenticator>`
Il tag `<authenticator>` è un elemento che identifica il soggetto che effettua la validazione clinica del documento e deve essere svolto dalla stessa persona che interpreta il ruolo di autore (`<author>`).
| Attributo | Tipo | Valore | Dettagli | Obbligatorio |
|---|:---:|:---:|---|:---:|
| : assignedEntity.id |  |  | | X |
| ---- root | OID | `"2.16.840.1.113883.2.9.4.3.2"`| OID Ministero economia e finanze - CF | X |
| ---- extension | ST | `[CF_VALIDATORE]`| Da valorizzare con il codice fiscale del validatore | X |
| ---- assigningAuthorityName | ST | `MEF` | Ministero dell’Economia e delle Finanze | X |
| : time | TS | `YYYYMMddhhmmss+-ZZzz` | | X |
| : signatureCode | | | Indica che il documento è stato firmato digitalmente | X |
| ---- code | ST | `S`[^3] | Codice che indica che il documento è firmato digitalmente | X |

[^3]: "S" (Signed).


### 3.1.21 Identificativi del documento: `<documentationOf>`
Tale elemento indica che questo documento è stato creato al fine di documentare un evento (`<documentationOf>/<serviceEvent>`) di Cura del Paziente.
| Attributo | Tipo | Valore | Dettagli | Obbligatorio |
|---|:---:|:---:|---|:---:|
| : serviceEvent | | | | X |
| :::: effectiveTime | | | Data dell’ultimo aggiornamento | X |
| -------- value | TS | `YYYYMMDDhhmmss+-ZZZZ` | | X |

### 3.1.22 Relazione con documenti preesistenti: `<relatedDocument>`
Il tag `<relatedDocument>` viene utilizzato nella gestione delle trasformazioni successive alla prima versione del documento. `<relatedDocument>` è un elemento OPZIONALE alla prima generazione di un documento CDA ed è OBBLIGATORIO per le trasformazioni successive.

| Attributo | Tipo | Valore | Dettagli | Obbligatorio |
|---|:---:|:---:|---|:---:|
| - typeCode | ST |  `RPLC` o `APND` o `XFRM` | | X |
| : parentDocument[^4] | | | | X |

[^4]: In caso di integrativo o sostitutivo DEVE contenere un elemento `<id>` con valore degli attributi `@root` e `@extension` pari ai codici del documento di cui si fa il _replace_ o l’_append_.

#### Dettagli valorizzazione attributo `typeCode`
| Valore | Dettagli |
|---|---|
| `RPLC` | Replace: deve essere usato in caso di documenti CDA ottenuti sostituendo il documento "sorgente" |
| `APND` | Append: deve essere usato in caso di documenti CDA ottenuti aggiungendo al documento "sorgente" |
| `XFRM` | Transform: deve essere usato in caso di documenti CDA ottenuti tramite una trasformazione del documento "sorgente"|

### 3.1.23 Incontro di riferimento: `<componentOf>`
`<componentOf>` è un elemento usato nel CDA per documentare l'incontro tra l'assistito e la struttura sanitaria (_encounter_) durante cui il CDA è stato prodotto: poiché questo PSS non viene prodotto come atto documentativo di uno specifico _encounter_, non si ritiene necessario l’elemento `<componentOf>` che pertanto NON DEVE essere presente.

## CDA Structured Body

| Sezione PSS | Descrizione | LOINC |Obbligatorio |
|---|---|:---:|:---:|
|[Allergie e Intolleranze](#43-allergie-e-intolleranze)|Raccoglie ogni informazione relativa ad allergie, reazioni avverse, ed allarmi passati o presenti inerenti il paziente, se ritenute rilevanti|`48765-2`|X|
|[Terapie Farmacologiche](#44-terapie-farmacologiche-medications)|Registra tutte le informazioni inerenti le terapie farmacologiche (prescrizioni, somministrazioni,etc.): terapie in atto, storia delle prescrizioni/terapie farmacologiche|`10160-0`|X|
|[Lista dei Problemi](#46-lista-dei-problemi-problems)|Documenta tutti i problemi clinici rilevanti noti al momento in cui è stato generato il documento (problemi clinici, condizioni, sospetti diagnostici e diagnosi certe, sintomi attuali passati)|`11450-4`|X|
|[Protesi, Impianti e Ausili](#411-protesi-impianti-e-ausili-medical-equipment)|Sezione in cui sono descritte tutte le informazioni inerenti dispositivi medici, ausili, protesi,etc.("devices") siano essi impiantati che esterni, da cui dipende, o è dipeso, lo stato di salute del paziente|`46264-8`|X|
|[Trattamenti e Procedure Terapeutiche, Chirurgiche e Diagnostiche](#413-trattamenti-e-procedure-terapeutiche-chirurgiche-e-diagnostiche-procedures)|Documenta le procedure (interventistiche, diagnostiche, chirurgiche, terapeutiche,etc.) pertinenti il paziente oggetto del documento|`47519-4`|X|
|[Stato funzionale del paziente](#415-stato-funzionale-del-paziente-functional-status)|Riporta almeno la valutazione della capacità motoria dell’assistito (autonomo, assistito, allettato)|`47420-5`|X|
|[Stile di vita](#48-stile-di-vita-social-history)|i dati che definiscono lo stile di vita del paziente, la condizione sociale, fattori di rischio ambientali|`29762-2`||
|[Parametri Vitali](#410-parametri-vitali-vital-signs)| Riporta le informazioni relative ai parametri vitali, attuali e passati, rilevanti ai fini del quadro clinico del paziente, in particolare almeno altezza, peso, indice di massa corporea, pressione arteriosa|`8716-3`||

### 4.3 Allergie e Intolleranze
Tale sezione deve riportare almeno le seguenti informazioni, se riferite dall’assistito:
- Reazioni avverse ai farmaci e/o alimenti note dell'assistito e eventuale descrizione delle caratteristiche della reazione osservata;
- Allergie documentate cutanee, respiratorie o sistemiche dell'assistito e eventuale descrizione delle caratteristiche della reazione osservata;
- Allergie a veleno di imenotteri.

```xml
<component>
	<section>
		<templateId root="2.16.840.1.113883.2.9.10.1.4.2.1"/>
		<id root="[ID_SEZ]"/> <!-- Può essere un UUID -->
		<code 
			code="48765-2"
			codeSystem="2.16.840.1.113883.6.1" 
			codeSystemName="LOINC"
			displayName="Allergie, Reazioni Avverse"/>
		<title>Allergie e Intolleranze</title>
		<text>
			[NARRATIVE_BLOCK]
		</text>
		<!-- Molteplicità 1 ...N - Allergia o Intolleranza -->
		<entry>
			[ALLERGY] <!-- 4.3.2 Allergie o Intolleranza -->
		</entry>
	</section>
</component>
```

#### 4.3.2 Allergia o Intolleranza: `<act>`
All'interno del blocco `<entry>` ci possono essere tanti `<act>` quante le allergie e/o tinolleranze evidenziate dal paziente.
```xml
<act classCode="ACT" moodCode="EVN">
	<templateId root="2.16.840.1.113883.2.9.10.1.4.3.1.1"/>
	<id root="[ID_SEZ]"/>
	<code nullFlavor="NA"/>
	<statusCode code="[STATUS_CODE]"/>
	<effectiveTime>
		<low ( value="[LOW_TS]" | nullFlavor="UNK" )/> <!-- RICHIESTO -->
		<high value="[HIGH_TS]"/> <!-- OPZIONALE -->
	</effectiveTime>
	<!-- UNA SOLA entryRelationship -->
	<entryRelationship type="SUBJ">
		[OINT_CONCERN] | [NO_ALLERGIES]
	</entryRelationship>
</act>
```
| Attributo | Tipo | Valore | Dettagli | Obbligatorio |
|---|:---:|:---:|---|:---:|
|: effectiveTime[^5] |||Intervallo di tempo in cui il problema è attivo|X|
|:::: low |TS||Data di inizio tracciamento del problema||
|:::: high |TS||Data di fine tracciamento del problema. Non presente se stato diverso da `"aborted"` o `"completed"`||
|: entryRelationship||`[OINT_CONCERN]` o `[NO_ALLERGIES]`|Fornisce dettagli riguardo all'allergia/intolleranza oppure indica esplicitamente l'assenza di queste[^6]|X|
|:statusCode|||Si veda il paragrafo 6.2.1.2 del documento HL7 PSS v2.0 per i possibili valori|X|

[^5]: se non si conosce il valore, deve essere impostato a `nullFlavor="UNK"`.

[^6]: nel primo caso il codice del template è `"2.16.840.1.113883.2.9.10.1.4.3.1.3"`, nel secondo è `"2.16.840.1.113883.2.9.10.1.4.3.1.4"`.

#### 4.3.2 Osservazione Allergia o Intolleranza: `<observation>`
Le informazioni di dettaglio relative ad un’allergia od intolleranza, o relative all’assenza di allergie sono passate attraverso un elemento di tipo `<observation>`.

##### 4.3.3.1 Assenza Allergie Note: : `<observation>`
| Attributo | Tipo | Valore | Dettagli | Obbligatorio |
|---|:---:|:---:|---|:---:|
|: templateId.root | | `"2.16.840.1.113883.2.9.10.1.4.3.1.4"`||X|
|: code.code ||`OINT`[^7]||X|
|: effectiveTime ||||X|
|:::: low|TS||Data inizio stato di assenza di allergie|X|

```xml
<observation classCode="OBS" moodCode="EVN">
	<templateId root="2.16.840.1.113883.2.9.10.1.4.3.1.4"/>
	<!-- Alert observation template -->
	<id root="[ID_SEZ]"/> <!-- in generale un UUID -->
	<code code="OINT" 
		codeSystem="2.16.840.1.113883.5.4"
		codeSystemName="ObservationIntoleranceType"
		displayName="Intolerance"/>
	<statusCode code="completed"/>
	<effectiveTime>
		<low ( value="[LOW_TS]" | nullFlavor="UNK" )/>
	</effectiveTime>
	<value xsi:type="CD" 
		code="no-allergy-info"
		codeSystem="2.16.840.1.113883.5.1150.1"
		codeSystemName="UnknownAllergies"
		displayName="Informazioni non note su allergie"/>
</observation>
```

[^7]: derivato da ActCode STATIC ("2.16.840.1.113883.5.4").

##### 4.3.2.2 Presenza Allergia o Intolleranza

| Attributo | Tipo | Valore | Dettagli | Obbligatorio |
|---|:---:|:---:|---|:---:|
|: templateId.root | | `"2.16.840.1.113883.2.9.10.1.4.3.1.3"`||X|
|: id |||Identificatore univoco, in genere un UUID|X|
|: effectiveTime | | |Descrive l’intervallo di tempo in cui ciò che viene osservato è attivo|X|
| : value | | |Descrittore dell’allarme, dell’allergia o della reazione avversa||
| : participant | | |Rappresenta l’agente che ha causato l’allergia (intolleranza) e/o la reazione avversa|X|

```xml
<observation classCode="OBS" moodCode="EVN">
	<templateId root="2.16.840.1.113883.2.9.10.1.4.3.1.3"/>
	<id root="[ID_SEZ]"/>
	<code code="52473-6" 
		codeSystem="2.16.840.1.113883.6.1"
		codeSystemName="LOINC" 
		displayName="Allergia o causa della reazione"/>
	<statusCode code="completed"/>
	<effectiveTime>
		<low ( value="[LOW_TS]" | nullFlavor="UNK" ) />
		<high value="[HIGH_TS]" /> <!-- OPZIONALE -->
	</effectiveTime>
	<value 
		xsi:type="CD" 
		code="[OBS_CODE]" 
		codeSystem="2.16.840.1.113883.5.4"
		codeSystemName="ObservationIntoleranceType" 
		displayName="[OBS_DESC]"/>
	<participant>
		[CODED_AGENT]
	</participant>
	<entryRelationship>
		[CODED_REACTION]
	</entryRelationship>
	<entryRelationship>
		[STATO_ALLERGIA]
	<entryRelationship>
		[NOTE]
	</entryRelationship>
</observation>
```
| Valore | Dettagli | Paragrafo Doc HL7 |
|---|---|:---:|
|[CODED_AGENT](#43221-descrizione-agente-codificato)|Descrizione agente|4.3.3.2.1.1|
|CODED_REACTION|Descrizione reazione|4.3.3.2.2.1|
|STATO_ALLERGIA|Indicazione dello stato clinico del problema rilevato|4.3.3.2.4|
|NOTE|Eventuali note|4.3.3.2.5|


###### 4.3.2.2.1 Descrizione Agente (Codificato)
Il valore dell'attributo `code` deve essere selezionato dai sistemi di codifica:
- WHO ATC (2.16.840.1.113883.6.73) o AIC (2.16.840.1.113883.2.9.6.1.5) per somministrazioni farmaceutiche;
- IPSNoAllergiesInfo  (2.16.840.1.113883.11.22.9) DYNAMIC per allergie non a farmaci.

```xml
<participant typeCode="CSM">
	<participantRole classCode="MANU">
		<playingEntity classCode="MMAT">
			<code code="[COD_AGENTE]" 
			codeSystem="[COD_SYS_AGENT]"
			codeSystemName="[DESC_COD_SYS_AGENT]"
			displayName="[DESC_AGENTE]">
			</code>
		</playingEntity>
	</participantRole>
</participant>
```

### 4.4 Terapie Farmacologiche (Medications)
```xml
<component>
	<section>
		<templateId root="2.16.840.1.113883.2.9.10.1.4.2.2"/>
		<id root="[ID_SEZ]"/> <!-- In generale un UUID -->
		<code code='10160-0'
			codeSystem='2.16.840.1.113883.6.1' 
			codeSystemName='LOINC'
			displayName='HISTORY OF MEDICATION USE'/>
		<title>Terapie Farmacologiche</title>
		<text>
			[NARRATIVE_BLOCK]
		</text>
		<!-- molteplicità 1 ...N – Descrizione Terapia Farmacologica -->
		<entry>
			[MEDICATION] | [NO_MEDICATION]
		</entry>
	</section>
</component>
```

> - L’assenza di terapie conosciute deve essere esplicitamente indicata all’interno del Narrative Block.
> - La sezione deve contenere almeno una `<entry>/<substanceAdministration>` conforme ad uno dei seguenti template: ["Terapia"](#442-terapia) "2.16.840.1.113883.2.9.10.1.4.3.2.1", o "Assenza di terapie note" "2.16.840.1.113883.2.9.10.1.4.3.2.3".

#### 4.4.2 Terapia: `<substanceAdministration>`
Le informazioni relative all’attività di somministrazione dei farmaci sono fornite attraverso una `<substanceAdministration>` ("2.16.840.1.113883.2.9.10.1.4.3.2.1").

```xml
<substanceAdministration>
	<templateId root="2.16.840.1.113883.2.9.10.1.4.3.2.1" />
	<id root="[ID_SEZ]"/>
	<statusCode code="COMPLETED|ABORTED"/>
	<effectiveTime>
		<low value="[DT_INIZIO_TERAPIA]" | nullFlavor="UNK"/>
		<high value="[DT_FINE_TERAPIA]" | nullFlavor="UNK"/>
	</effectiveTime>
	<!-- Via di somministrazione (OPZIONALE) -->
	<routeCode code="[COD_VIA_SOMMINISTRAZIONE]" 
		codeSystem="2.16.840.1.113883.5.112" 
		codeSystemName=" HL7 RouteOfAdministration" 
		displayName="[DESC_VIA_SOMMINISTRAZIONE]"/>
	<!-- Dose (OPZIONALE)-->
	<doseQuantity>
		<low value="[DOSE_MIN]" unit="[UNITÀ_DOSE]"/>
		<high value="[DOSE_MAX]" unit="[UNITÀ_DOSE]"/>
	</doseQuantity>
	<!-- ATC / AIC / GE-->
	<consumable>
		<manufacturedProduct classCode="MANU">
		<!-- Dettagli del Farmaco -->
		</manufacturedProduct>
	</consumable>
</substanceAdministration>
```

#### 4.4.3 Dettagli Farmaco: `<consumable>`
| Attributo | Tipo | Valore | Dettagli | Obbligatorio |
|---|:---:|:---:|---|:---:|
| - code | ST |  | Deve assumere uno dei valori previsti nel catalogo nazionale di codifica ATC, AIC o GE | X |
| - codeSystem | UID | `[CODE_SYS]` | Rappresenta l’OID del sistema di codifica ATC, AIC o GE | X |

> `[CODE_SYS]` deve essere uno dei valori costanti:
>	- "2.16.840.1.113883.6.73"
>	- "2.16.840.1.113883.2.9.6.1.5"
>	- "2.16.840.1.113883.2.9.6.1.51"

```xml
<consumable>
	<manufacturedProduct>
		<templateId root="2.16.840.1.113883.2.9.10.1.4.3.2.2"/>
		<manufacturedMaterial>
			<code code = "[COD_AIC]"
				codeSystem = "2.16.840.1.113883.2.9.6.1.5"
				codeSystemName = "AIC"
				displayName = "[DESC_AIC]"/>
		</manufacturedMaterial>
	</manufacturedProduct>
</consumable>
```

### 4.6 Lista dei Problemi (Problems)
In questa sezione andranno rappresentati almeno i seguenti elementi:
 - Patologie croniche e/o rilevanti
 - Organi mancanti
 - Diagnosi di trapianti effettuati
 - Rilevanti malformazioni.

 ```xml
<component>
	<section>
		<templateId root="2.16.840.1.113883.2.9.10.1.4.2.4"/>
		<id root="[ID_SEZ]"/>
		<code code="11450-4"
			codeSystem="2.16.840.1.113883.6.1" 
			codeSystemName="LOINC"
			displayName="Lista dei Problemi"/>
		<title>Lista dei Problemi</title>
		<entry>
			[PROBLEM_ACT]
		</entry>
		<!-- OPZIONALE -->
		[NOTE]
	</section>
</component>
 ```

 > - L’assenza di Problemi noti deve essere esplicitamente indicata.
 > - [PROBLEM_ACT](#462-problema): Problem, inteso nella sua accezione più generale.

#### 4.6.2 Problema
| Valori | Dettagli |
|---|---|
|ID_SEZ|Identificativo unico della sezione, in genere un UUID|
|STATUS_CODE|Stato dell’atto, valori ammessi sono: `active`, `suspended`, `aborted`, `completed`|
|HIGH_TS|Data di chiusura del Problema. Non presente se stato diverso da `aborted` o `completed`|
|[PROBLEM_OBS](#463-dettagli-problema)|Dettagli del Problema|
 ```xml
<act classCode="ACT" moodCode="EVN">
	<templateId root="2.16.840.1.113883.2.9.10.1.4.3.4.1" />
	<id root="[ID_SEZ]"/>
	<code nullFlavor="NA"/>
	<statusCode code="[STATUS_CODE]" /> <!-- OPZIONALE -->
	<effectiveTime>
		<low ( value="[LOW_TS]" | nullFlavor="UNK" )/>
		<high nullFlavor="[HIGH_TS]"/> <!-- OPZIONALE -->
	</effectiveTime>
	<!-- UNA SOLA entry, indica il problema principale -->
	<entryRelationship type="SUBJ" inversionInd="false">
		[PROBLEM_OBS]
	</entryRelationship>
</act>
 ```
#### 4.6.3 Dettagli problema
| Valore | Dettagli | Paragrafo Doc HL7 |
|---|---|:---:|
|OBS_CODE|Codice dell’osservazione||
|OBS_DESC|Descrizione dell’osservazione||
|LOW_TS|Data di insorgenza del problema||
|HIGH_TS|Data di risoluzione del problema||
|COD_PROB|Codice del problema (e.g diagnosi) secondo la codifica ICD9CM||
|DESC_PROB|Descrizione del problema (e.g diagnosi) secondo la codifica ICD9-CM||
|SEVERITY|Indicazione del livello gravità del problema||
|STATO_CLINICO_PROBLEMA|Indicazione dello stato del problema rilevato|4.6.3.1|
|CRONICITA_PROBLEMA|Indicazione dello stato di cronicità del problema rilevato|4.6.3.3|
|NOTE|Permette di refenziare eventuali note e commenti inseriti alla parte narrativa|4.3.3.2.5|

```xml
<observation classCode="OBS" moodCode="EVN" >
	<templateId root="2.16.840.1.113883.2.9.10.1.4.3.4.2"/>
	<id root="[ID_SEZ]"/>
	<code code="[OBS_CODE]"
		codeSystem="2.16.840.1.113883.6.1" 
		codeSystemName="LOINC"
		displayName="[OBS_DESC]"/>
	<statusCode code="completed"/>
	<effectiveTime>
		<low ( value="[LOW_TS]" | nullFlavor="UNK" )/>
		<high low ( value="[HIGH_TS]" | nullFlavor="UNK" ) /> <!-- OPZIONALE -->
	</effectiveTime>
	<value xsi:type="CD" 
		( 
			code="[COD_PROB]"
			codeSystem="2.16.840.1.113883.6.103"
			codeSystemName="ICD-9CM (diagnosis codes)" 
		)
		displayName="[DESC_PROB]"| nullFlavor="OTH">
	</value>
	<entryRelationship>
		[SEVERITY] <!-- OPZIONALE -->
	</entryRelationship>
	<entryRelationship>
		[STATO_CLINICO_PROBLEMA] <!-- OPZIONALE -->
	</entryRelationship>
	<entryRelationship>
		[CRONICITA_PROBLEMA] <!-- OPZIONALE -->
	</entryRelationship>
	<entryRelationship>
		[NOTE] <!-- OPZIONALE -->
	</entryRelationship>
</observation>
```

### 4.8 Stile di Vita (Social History)
Questa sezione contiene i dati che definiscono lo stile di vita del paziente, la condizione sociale, fattori di rischio ambientali; così come informazioni amministrative come stato civile, livello di istruzione, razza, etnia, affiliazioni religiose.

```xml
<component>
	<section>
		<templateId root=" 2.16.840.1.113883.2.9.10.1.4.2.6 "/>
		<id root="[ID_SEZ]"/>
		<code code="29762-2"
			codeSystem="2.16.840.1.113883.6.1" 
			codeSystemName="LOINC"
			displayName="Stile di vita">
		<title>Stili di Vita (Social History)</title>
		<text>
			[NARRATIVE_BLOCK]
		</text>
		<entry>
			[SOCIALHIS_OBS]
		</entry>
	</section>
</component>
```

> - [SOCIALHIS_OBS](#482-osservazione-sullo-stile-di-vita): Informazione codificata relativa ai dati su Stile di Vita.

#### 4.8.2 Osservazione sullo Stile di Vita
Le informazioni codificate sullo stile di vita sono fornite attraverso una `<observation>`.

| Valori | Dettagli |
|---|---|
|ID_SEZ|Identificativo unico della sezione, in genere un UUID|
|CODE_OBS|Codice dell’osservazione registrata|
|DESC_OBS|Descrizione dell’osservazione registrata|
|TS|Data di rilevazione dell’informazione|
|VALUE_OBS|Coppia di attributi `code` `displayName` nel caso di valore codificato; `value`, `unit` nel caso di quantità fisica|

```xml
<observation typeCode="OBS" moodCode="EVN">
	<templateId root="2.16.840.1.113883.2.9.10.1.4.3.6.1"/>
	<id root="[ID_SEZ]"/>
	<code code="[COD_OBS]"
		displayName="[DESC_OBS]"
		codeSystem="2.16.840.1.113883.6.1" 
		codeSystemName="LOINC"/>
	<text>
		<reference value="#[REF_SOCIALOBS] "/>
	</text>
	<statusCode code="completed"/>
	<effectiveTime value="[TS]"/>
	<value xsi:type="CD" | "PQ" [VALUE_OBS]/>
</observation>
```

### 4.10 Parametri Vitali (Vital Signs)
I possibili parametri da gestire all’interno di questa sezione sono: pressione arteriosa, frequenza cardiaca, frequenza respiratoria, peso, altezza, indici di massa corporea, ossigenazione del sangue.

| Valori | Dettagli |
|---|---|
|ID_SEZ|Identificativo unico della sezione, in genere un UUID|
|NARRATIVE_BLOCK|Descrizione testuale del contenuto di sezione|
|[VS_ORGANIZER](#4102-organizer-parametri-vitali)|Organizer che contiene le informazioni sulle misure dei parametri vitali|
|[VS_OBS](#4103-osservazione-parametri-vitali)|Dettaglio informazioni sulle misure dei parametri vitali|

```xml
<component>
	<section>
		<tempalteId root=" 2.16.840.1.113883.2.9.10.1.4.2.8"/>
		<id root="[ID_SEZ]"/>
		<code code="8716-3"
			codeSystem="2.16.840.1.113883.6.1" 
			codeSystemName="LOINC"
			displayName="Parametri vitali"/>
		<title>Parametri Vitali</title>
		<text>
			[NARRATIVE_BLOCK]
		</text>
		<entry>
			[VS_ORGANIZER]|[V_OBS]
		</entry>
	</section>
</component>
```

#### 4.10.2 Organizer Parametri Vitali
```xml
<organizer classCode="CLUSTER" moodCode="EVN">
	<tempalteId root="2.16.840.1.113883.2.9.10.1.4.3.8.1"/>
		<id root="[ID_SEZ]"/>
		<code code="8716-3"
		codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC"
		display-
		Name="Parametri vitali"/>
	<statusCode code="completed"/>
	<effectiveTime value="[TS]"/>
	<component typeCode="COMP">
		[VS_OBS]
	</component>
</organizer>
```

#### 4.10.3 Osservazione Parametri Vitali

| Valori | Dettagli |
|---|---|
|ID_SEZ|Identificativo unico della sezione, in genere un UUID|
|OBS_CODE|Descrizione relativa alla misura effettuata.|
|OBS_DESC|Descrizione relativa alla misura effettuata.|
|DT_OBS|Data a cui l’osservazione si riferisce|
|REP_NUM|Valore numerico per indicare il numero di osservazioni|
|OBS_VALUE|Valore numerico della misura|
|OBS_UNIT|Unità di misura usata|
|INT_CODE|Codice di interpretazione dei risultati. Valore derivato dal codeSystem HL7 ObservationInterpretation |
|INT_DESC|Descrizione dell’interpretazione dei risultati. Valore derivato dal codeSystem HL7 ObservationInterpretation|
|COD_METHOD|Codice relativo alla tecnica di misurazione applicata per ottenere il risultato|
|CODSYS_METHOD|OID del sistema di codifica utilizzato|

```xml
<observation classCode="OBS" moodCode='EVN'>
	<tempalteId root="2.16.840.1.113883.2.9.10.1.4.3.8.2"/>
	<id root="[ID_SEZ]"/>
	<code code="[OBS_COD]" 
		codeSystem="2.16.840.1.113883.6.1" 
		codeSystemName="LOINC" 
		displayName="[OBS_DESC]"/>
	<statusCode code="completed"/>
	<effectiveTime ( value="[DT_OBS]" | nullFlavor="UNK" ) />
	<!-- OPZIONALE -->
	<repeatNumber value="[REP_NUM]"/>
	<value xsi:type="PQ" value="[OBS_VALUE]" unit="[OBS_UNIT]"/>
	<!-- OPZIONALE -->
	<interpretationCode code="[INT_CODE]" 
		codeSystem="2.16.840.1.113883.5.83" 
		codeSystemName="HL7 ObservationInterpretation" 
		displayName="[INT_DESC]"/>
	<!-- OPZIONALE -->
	<methodCode code="[COD_METHOD]" 
		codeSystem="[CODSYS_METHOD]"
		codeSystemName="[DESC_CODESYSTEM]" 
		displayName="[DESC_METHOD]"/>
	<!-- OPZIONALE -->
	<targetSiteCode code="[TRG_CODE]" 
		codeSystem="[OID_CODESYSTEM]"
		codeSystemName="[DESC_CODESYSTEM]" 
		displayName="[DESC_TARGET]"/>
</observation>
```

### 4.11 Protesi, impianti e ausili (Medical equipment)
Tale sezione deve riportare tutte le protesi ed impianti permanenti, nonché tutti gli ausili, impiantati o esterni, di supporto per il paziente.

| Valori | Dettagli |
|---|---|
|ID_SEZ|Identificativo unico della sezione, in genere un UUID|
|NARRATIVE_BLOCK|Descrizione testuale del contenuto di sezione|
|[Supply](#4102-organizer-parametri-vitali)|Dettaglio Protesi Impianti Ausili|

```xml
<component>
	<section>
		<templateId root="2.16.840.1.113883.2.9.10.1.4.2.9"/>
		<id root="[ID_SEZ]"/>
		<code code="46264-8" 
			displayName="Storia di uso di dispositivi medici"
			codeSystem="2.16.840.1.113883.6.1"
			codeSystemName="LOINC"/>
		<title>Protesi, Impianti ed Ausilii</title>
		<text>
			[NARRATIVE_BLOCK]
		</text>
		<!-- 1 ...N – Dettaglio Protesi Impianti Ausili -->
		<entry>
			[SUPPLY]
		</entry>
	</section>
</component>
```

Esempio di Narrative Block:
```xml
<text>
	<table border="1" width="100%">
	<thead>
		<tr><th> Informazioni Protesi</th></tr>
	</thead>
	<tbody>
		<tr><td>PORTATORE PACE MAKER (ICD9-CM V4501) (Maggio 2008</td></tr>
		<tr><td>PROTESI DI ARTO INFERIORE</td></tr>
	</tbody>
	</table>
</text>
```

#### 4.11.2 Dettaglio Protesi Impianti Ausili: `<supply>`
| Attributo | Tipo | Valore | Dettagli | Obbligatorio |
|---|:---:|:---:|---|:---:|
|: code |||Derivato dal [value set della CND](https://www.salute.gov.it/portale/temi/p2_6.jsp?area=dispositivi-medici&id=328&lingua=italiano&menu=classificazione) dei medici|X|
|: effectiveTime |||Rappresenta la data e ora in cui l’impianto o l’ausilio sono stati forniti al paziente|X|

> L’assenza di protesi, impianti o ausili noti DEVE essere esplicitamente indicata valorizzando il `<supply>/<code>` secondo il Value Set AssenzaProtesiImpiantiAusili_PSSIT.

### 4.13 Trattamenti e procedure terapeutiche, chirurgiche e diagnostiche (Procedures)
La sezione mappa le informazioni relative alle procedure diagnostiche invasive, interventistiche, chirurgiche, terapeutiche non farmacologiche inerenti la storia clinica del paziente.

> - Devono essere riportate obbligatoriamente le indicazioni su interventi chirurgici legati a trapianti.
> - Nel contesto del PSS la `<section>` Trattamenti conterrà solamente procedure già avvenuti; procedure pianificate andranno inserite nella `<section>` "Piano di Cura".

| Valori | Dettagli |
|---|---|
|ID_SEZ|Identificativo unico della sezione, in genere un UUID|
|NARRATIVE_BLOCK|Descrizione testuale del contenuto di sezione|
|[PROCEDURA](#4132-procedura)|Dettagli procedura|

```xml
<component>
	<section>
		<tempalteId root="2.16.840.1.113883.2.9.10.1.4.2.11"/>
		<id root="[ID_SEZ]"/>
		<code code="47519-4" 
			codeSystem="2.16.840.1.113883.6.1"
			displayName="Storia di Procedure"/>
		<title> Trattamenti e procedure terapeutiche, chirurgiche e diagnostiche </title>
		<text>
			[NARRATIVE_BLOCK]
		</text>
		<entry>
			[PROCEDURA] <!-- OPZIONALE 0...N Procedure codificate -->
		</entry>
	</section>
</component>
```

#### 4.13.2 Procedura
```xml
<procedure classCode="PROC" moodCode="EVN" >
	<templateId root= "2.16.840.1.113883.2.9.10.1.4.3.11.1"/>
	<id root="[ID_SEZ]"/>
	<code code="[PROC_CODE]"
		codeSystem="[PROC_COD_SYS]" 
		codeSystemName="[PROC_COD_SYS_NAME]" />
	<statusCode code="completed|active|aborted|cancelled"/>
	<effectiveTime>
		<low value="[LOW_TS]"/>
		<high value="[HIGH_TS]"/>
	</effectiveTime >
	<!-- OPZIONALE Riferimento ad Encounter -->
	<entryRelationship typeCode="REFR">
		[RIF_ENCOUNTER]
	</entryRelationship>
	<!-- OPZIONALE Ragione della procedura -->
	<entryRelationship typeCode="RSON">
		[RAGIONE]
	</entryRelationship>
</procedure>
```

### 4.15 Stato funzionale del Paziente (Functional status)
Questa sezione contiene le informazioni che descrivono eventuali comportamenti e/o condizioni del paziente che si discostano dalla norma.

Tale sezione deve riportare almeno la valutazione della capacità motoria dell’assistito (autonomo, assistito, allettato).

Esempi di informazioni incluse in questa sezione:
- Capacità motoria: allettato
- Stato mentale
- Capacità di comunicazione
- Percezione
- In regime di ADI

| Valori | Dettagli |
|---|---|
|ID_SEZ|Identificativo unico della sezione, in genere un UUID|
|NARRATIVE_BLOCK|Descrizione testuale del contenuto di sezione|
|[ORGANIZER](#4151-organizer-risultati)|Dettagli dei risultati inseriti|

```xml
<component>
	<section>
		<templateId root="2.16.840.1.113883.2.9.10.1.4.2.13"/>
		<id root= "[ID_SEZ]"/>
		<code code="47420-5"
			codeSystem="2.16.840.1.113883.6.1" 
			codeSystemName="LOINC" 
			displayName="Nota di valutazione dello stato funzionale" />
		<title>Stato funzionale del Paziente</title>
		<text>
			[NARRATIVE_BLOCK]
		</text>
		<!-- Molteplicità 1...N -->
		<entry>
			[ORGANIZER]
		</entry>
	</section>
</component>
```

#### 4.15.1 Organizer risultati
Per la gestione dei contenuti strutturati/codificati viene utilizzato l’elemento `<organizer>` che costituisce il raccoglitore per uno o più risultati.

```xml
<entry typeCode="DRIV">
	<organizer classCode="BATTERY" moodCode="EVN">
		<!-- Result organizer template -->
		<templateId root="2.16.840.1.113883.2.9.10.1.4.3.14.1"/>
		<statusCode code="completed"/>
		<component>
			<observation classCode="OBS" moodCode="EVN">
			<!-- Capacità motoria -->
			<templateId root="2.16.840.1.113883.2.9.10.1.4.3.14.2"/>
			<code code="75246-9" 
				codeSystem="2.16.840.1.113883.6.1" 
				displayName="Activity"/>
			<statusCode code="completed"/>
			<effectiveTime>
				<low value="2013"/>
			</effectiveTime>
			<value xsi:type="CD" code="LA4270-0"
				codeSystem="2.16.840.1.113883.6.1"
				codeSystemName="LOINC"
				displayName="Allettato"/>
			</value>
			</observation>
		</component>
	</organizer>
</entry>
```