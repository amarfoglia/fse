## Referto di Radiologia (RAD)
Il Referto di Radiologia è un documento che riassume i risultati di tutte le indagini afferenti alla specialità radiologica, attestando quanto effettuato per l’inquadramento diagnostico e terapeutico.

Il Referto di Radiologia può essere indirizzato sia allo Specialista sia al Medico di Medicina Generale. Può essere richiesto come accertamento diagnostico per un paziente non ricoverato, ma anche come consulenza interna tra specialisti.

### HEADER
*  ***ClinicalDocument***: Elemento root per la struttura XML che rappresenta il documento CDA. Ogni documento CDA DEVE iniziare con questo elemento, che comprende gli attributi speciali xsi:schemaLocation, xmlns e xmlsn:xsi.
*  ***realmCode***: indica il dominio di appartenenza del documento. Nel dominio ITALIANO ```<realmCode code="IT"/>```
*  ***typeId***: indica che il documento è strutturato secondo le specifiche HL7-CDA Rel 2.0. Nel dominio ITALIANO ```<typeId root="2.16.840.1.113883.1.3" extension="POCD_HD000040"/>```
* ***templateId***: indica il template di riferimento per il documento CDA, utile per individuare restrizioni/linee guida da applicare. Nel dominio ITALIANO ```<templateId root= “2.16.840.1.113883.2.9.10.1.7.1” extension=”1.0”/>```
* ***id***: identifica univocamente l'istanza di ogni documento CDA. 
  ```xml
  <id root="2.16.840.1.113883.2.9.2.30967"
      extension="HMS.RAD.20171018.123456"
      assigningAuthorityName="A.O. OSP.NIGUARDA CA'GRANDA - MILANO"/>
  ``` 
* ***code***: indica la tipologia di documento. Il valore DEVE fare riferimento al sistema di codifica LOINC. In particolare,  per identificare il RAD si dovrà utilizzare il codice ```LOINC "68604-8 – Referto Radiologico”```. Esempio nel contesto RAD
  ```xml
  <code code="68604-8”
    codeSystem="2.16.840.1.113883.6.1"
    codeSystemName="LOINC"
    codeSystemVersion="2.19"
    displayName="Referto Radiologico"/> 
  ```
* ***effectiveTime***: indica la data di creazione del documento CDA. L'elemento DEVE essere valorizzato tramite un tipo Time Stamp (TS). ```<effectiveTime value="20050729183023+0100"/>```
* ***confidentialityCode***: specifica il livello di riservatezza del documento. Nel caso del Referto di Radiologia, l'elemento DEVE essere valorizzato nel modo seguente. Si suggerisce che nel contesto italiano, il valore di default sia pari a “N”.
  | Attributo      | Tipo | Valore                   | Dettagli                |
  |----------------|------|--------------------------|-------------------------|
  | codeSystem     | OID  | "2.16.840.1.113883.5.25" | OID codifica.           |
  | code           | ST   | "N", "R", "V"            | Regole di riservatezza. |
  | codeSystemName | ST   | "Confidentiality"        | Nome della codifica.    |
  
  Esempio di utilizzo:
  ```xml
    <confidentialityCode code="N"
      codeSystem="2.16.840.1.113883.5.25"
      codeSystemName="Confidentiality"/>
  ```
  N.B: Il documento DEVE contenere uno ed un solo elemento ``confidentialityCode``
* ***languageCode***: indica la lingua in cui è redatto il documento. Nel caso del Referto di Radiologia, l'elemento DEVE essere così valorizzato: ```<languageCode code="it-IT"/>```. N.B: il documento DEVE contenere un solo elemento ``languageCode``.
* ***setId*** e ***versionNumber***: consentono di gestire le revisioni del documento, o di suoi eventuali addendum integrativi.  l'elemento ```<setId>``` ha un valore costante tra le diverse versioni del medesimo documento, mentre l'elemento ```<versionNumber>``` cambia al variare della revisione. Il nuovo documento sostitutivo DEVE comprendere un elemento <relatedDocument> che punta al documento sostituito.
* ***recordTarget***: identifica il soggetto della prestazione, ovvero il paziente a cui il Referto si riferisce. Per il Referto di Radiologia l'elemento deve pertanto essere strutturato come mostrato di seguito.
  ```xml
   <recordTarget>
     <patientRole>
       <patient>
         ...
        </patient>
    </patientRole>
  </recordTarget>
  ```
  
  L'elemento ***patientRole*** DEVE prevedere al suo interno almeno due elementi di tipo ```<id>```. Diverse sono le casistiche possibili:
  * Cittadino italiano o straniero residente (iscritto SSN);
  * Soggetti assicurati da istituzioni estere;
  * Europei Non Iscritti (ENI) al SSN;
  * Stranieri Temporaneamente Presenti (STP)
  
  Esempio di cittadino iscrito SSN:
  ```xml
  <patientRole>
    <id root="2.16.840.1.113883.2.9.2.4.3.2"
      extension="XYILNI99M22G999T"
      assigningAuthorityName="Ministero Economia e Finanze"/>
    <id root="[OID DELLO SPAZIO DI IDENTIFICAZIONE USATO NELL’AZIENZA CHE CUSTODISCE CUSTODE DEL PACS]"
      extension="[NUMERO IDENTIFICATIVO PERSONALE]"
      assigningAuthorityName="[NOME DELLO SPAZIO DI IDENTIFICAZIONE USATO
    NELL’AZIENZA CUSTODE DEL PACS]"/>
    <patient>...</patient>
  </patientRole>
  ```
  L'elemento ***patient*** contiene i dettagli anagrafici relativi al paziente.
  ```xml
  <patient>
    <name>
      <family>PAPERINO</family>
      <given>PAOLINO</given>
    </name>
    <administrativeGenderCode code="M" codeSystem="2.16.840.1.113883.5.1"
                codeSystemName="HL7 AdministrativeGender" 
                codeSystemVersion="1.0"
                displayName="Maschio"/>
    <birthTime value="19200609"/>
    <birthPlace>
      <place>
      <addr>
        <city>GENOVA</city>
        <country>ITA</country>
        <censusTract>010025</censusTract>
      </addr>
      </place>
    </birthPlace>
  </patient>
  ```
* ***author***: identifica il soggetto che ha creato il documento (<u>può essere una persona o un _device_</u>); nel caso del Referto di Radiologia almeno un autore è rappresentato dal Medico Refertante.
  * ``<time>``: indicazione dell'ora di produzione del documento;
  * ``<id>``: identifica l'autore;
    | Attributo | Tipo | Valore                        | Dettagli                                         |
    |-----------|------|-------------------------------|--------------------------------------------------|
    | root      | OID  | "2.16.840.1.113883.2.9.4.3.2" | OID del Ministero dell'Economia e delle Finanze. |
    | Referto   | ST   | [CODICE FISCALE]              | Codice fiscale dell'autore del documento.        |
  * ``<assignedPerson>``: campo OPZIONALE che include il nominativo dell'autore.
  
  Esempio di utilizzo:

  ```xml
  <author>
    <time value="20000407130000+0100"/>
    <assignedAuthor>
      <id root="2.16.840.1.113883.2.9.4.3.2"
      extension="PNCPLL99M22G999T"/>
      <assignedPerson>
        <name>
          <given>Dr. Pinco</given>
          <family>Palla</family>
        </name>
      </assignedPerson>
    </assignedAuthor>
  </author>
  ```
* ***custodian***: identifica l'organizzazione incaricata della custodia del documento originale, corrispondente al conservatore dei beni digitali.

    | Attributo | Tipo | Valore                                                 | Dettagli                                                                                                                 |
    |-----------|------|--------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
    | root      | OID  | [OID DOMINIO DI INDENTIFICAZIONE DELLE ORGANIZZAZIONI] | Identificativo del dominio di identificazione delle organizzazioni.                                                      |
    | Extension | ST   | [ID ORGANIZZAZIONE]                                    | Identificativo dell' organizzazione (ASL, Regione) da parte del dominio di identificazione definito nell'attributo root. |

  ```xml
  <custodian>
    <assignedCustodian>
    <representedCustodianOrganization>
        <id root="2.16.840.1.113883.2.9.4.1.2" extension="130106"/>
        <name>ASL Teramo</name>
      </representedCustodianOrganization>
    </assignedCustodian>
  </custodian>
  ```
* ***legalAuthenticator***: riporta il firmatario del documento. L'elemento ``<legalAuthenticator>``DEVE contenere un elemento ``<time>`` con l'indicazione dell'ora in cui il documento è stato firmato, un elemento ``<signatureCode>`` per indicare che il documento è firmato, ed un elemento ``<assignedEntity>``, destinato ad accogliere l'elemento ``<id>`` del medico responsabile del documento. La sezione può OPZIONALMENTE contenere un elemento ``<assignedPerson>/<name>``.

  Esempio di utilizzo:
  ```xml
  <legalAuthenticator>
    <time value="20140329173712+0100"/>
    <signatureCode code="S"/>
    <assignedEntity>
      <id root="2.16.840.1.113883.2.9.4.3.2"
      extension="PNCPLL99M22G999T"/>
      <assignedPerson>
      <name>
        <prefix>Professore</prefix>
        <given>Pinco</given>
        <family>Palla</family>
      </name>
      </assignedPerson>
    </assignedEntity>
  </legalAuthenticator>
  ```
* _participant_: rappresenta tutti coloro che partecipano all’atto descritto dal documento. 
* ***inFulfillmentOf***: identifica la richiesta che ha determinato la produzione del documento di Referto di Radiologia ed ogni altro tipo di ordine ad esso relativo. Esempi di ordini che possono essere descritti sono:
  - **l’accession number** (OBBLIGATORIO);
  - identificativo della prescrizione (CONSIGLIATO);
  - identificativo CUP;
  - Identificativo dell’ordine interno;

  #### Esempio di implementazione: Accession Number**
  L’elemento ``<inFulfillmentOf>`` DEVE essere utilizzato per documentare l’identificativo assegnato dal RIS per l’ordine per questo studio
    ```xml
    <inFulfillmentOf>
      <order>
        <id extension="[Accession_Number]" root="[OID_Accession_Number]"/>
      </order>
    </inFulfillmentOf> 
    ```
  #### Esempio di implementazione: Identificativo della prescrizione
    ```xml
    <inFulfillmentOf>
      <order classCode="ACT" moodCode="RQO">
        <id root="2.16.840.1.113883.2.9.4.3.8"
            extension="[NRE]"
            assigningAuthorityName="Ministero delle Finanze"/>
      </order>
    </inFulfillmentOf>
    ```
* ***componentOf***: descrive l’incontro tra assistito e la struttura sanitaria durante il quale l’atto documentato è avvenuto. Tra i campi da definire l'unico obbligatorio è ```healthCareFacility``` che specifica il luogo. L’identificativo dell’Azienda Sanitaria in cui è avvenuto l’incontro DEVE essere riportato in: ```<healthCareFacility>/<serviceProviderOrganization>/<asOrganizationPartOf>/<id>```.
  ```xml
  <componentOf>
    <ecompassingEncounter>
      ...
      <location>
        <healthCareFacility>
          <id root="2.16.840.1.113883.2.9.4.1.6" extension="[CODICE UNITA’ OPERATIVA]"/>
          <location>
            <name>Cardiologia Terapia Intensiva</name>
          </location>
          ...
        </healthCareFacility> 
      </location>
      <serviceProviderOrganization>
        <id root="2.16.840.1.113883.2.9.4.1.2"
            extension="CODICE_MINISTERIALE_HSP11-OSPEDALE"
            assigningAuthorityName="Ministero della Salute"/>
      </serviceProviderOrganization>
    </ecompassingEncounter>
  </componentOf>
  ```
## Body
Lo standard CDA prevede che il corpo di un documento possa essere formato in modo strutturato (```<structuredBody>```) o in modo destrutturato (```<nonXMLBody>```).
Un referto di radiologia è organizzato in una serie di sezioni autoconsistenti, definiti dall’elemento ```<section>```.
Le sezioni OBBLIGATORIE nel caso del CDA:
  | Sezioni        | Codici LOINC | Descrizioni LOINC ShortName                     |
  |----------------|--------------|-------------------------------------------------|
  | Esame eseguito | 55111-9      | Current imaging procedure descriptions Document |
  | Referto        | 18782-3      | Radiology Study observation                     |
  * ***Esame eseguito***: descrive l’esame radiologico oggetto del referto. È caratterizzato dalla data di esecuzione, dalla modalità di esecuzione e dalla dose assorbita (qualora l’esame preveda l’esposizione del paziente a radiazioni ionizzanti);
    * ```<code>```: definisce la tipologia di ```<section>``` in base alla codifica LOINC; il valore del campo ``code`` è ``"55111-9"``.
    * ```<title>```: rappresenta il titolo della sezione (``<title>Esame eseguito</title>``);
    * ```<entry>```: consente di rappresentare in modo strutturato le informazioni di dettaglio riferite nel blocco narrativo.
      ```xml
      <entry typeCode="DRIV">
        <act moodCode="EVN" classCode="ACT">
          <code codeSystem="[OID CODIFICA REGIONALE]" 
            codeSystemName="[CODIFICA REGIONALE]"
            code="[CODICE REGIONALE]" displayName="Rx Torace">
            <originalText>
              <reference value="#EsameDesc1"/>
            </originalText>
            <translation code="87.3" displayName="Soft tissue x-ray of thorax"
            codeSystem="2.16.840.1.113883.6.103" codeSystemName="ICD-9-CM"/>
          </code>
          <text>
          <reference value="#Esame1"/>
          </text>
          <effectiveTime value="20180203092205+0200"/>
        </act>
      </entry>
      ```
      > CONF-RAD-125: la sezione Esame Eseguito DEVE contenere un elemento ``<entry>/<act>`` il quale DEVE a sua volta contenere un elemento ``<code>`` riportante il codice dell’esame eseguito e DEVE contenere un elemento ``<effectiveTime>`` che indica la data di esecuzione dell’esame.
    * ```<text>```: un esempio di utilizzo:
      ```xml
      <text>
        <table>
          <thead>
            <tr>
              <th>Descrizione Esame Eseguito</th>  
              <th>Data Esame Eseguito</th> 
              <th>Modalità Esame Eseguito</th>
              <th>Dose Assorbita</th>
            </tr>
          </thead>
          <tbody>
            <tr ID="Esame1"> 
              <td ID="EsameDesc1">Radiografia del torace</td>
              <td>(03 Feb 2014 09:22)</td>
              <td>Procedura radiografica del torace</td>
              <td>0,001mSv</td>
            </tr>
          </tbody>
        </table>
      </text>
      ```
  * ***Referto***:  rappresenta l’elemento centrale e riportata al proprio interno una descrizione delle valutazioni del medico.
    * ```<code>```: il valore del campo ``code`` è ``"18782-3"``;
    * ```<title>```: (``<title>Referto</title>``);
    * ```<text>```: blocco narrativo contente tutte le informazioni __"human-readable"__.
    Esempio di utilizzo:
    ```xml
    <text>
      <paragraph>
        Al controllo odierno non sono evidenti significative curvature scoliotiche
        Non si riscontrano lesioni ossee. Nel tratto dorsale e lombare non sono
        evidenti discopatie. Lieve sopraelevazione della cresta iliaca destra.  
      </paragraph>
    </text>
    ```
  

