## Vaccinazioni (VAC)
Nell’ambito dei documenti prodotti dai sistemi informativi regionali in tema di vaccinazioni, si ritiene opportuno che siano conferiti al FSE i seguenti documenti:
- __Scheda della singola Vaccinazione__: è il documento che attesta l’avvenuta somministrazione della/le vaccinazione/i somministrate all’assistito in una certa data.
- __Certificato Vaccinale__.

Possono essere consultati da:
- assistito
- MMG/PLS
- medici della continuità assistenziale
- specialisti ospedalieri e universitari
- specialisti ambulatoriali territoriali
- specialisti ambulatoriali convenzionati
- infermieri e professionisti sanitari autorizzati da decreto.
#### Codifiche LOINC ed OID
La tipologia di sezione DEVE essere espressa attraverso un’opportuna codifica LOINC. Tutte le codifiche OID presenti nel documento DEVONO essere comprese all’interno del catalogo HL7 OID.
### Header
- ***templateId***:
  - Scheda della singola Vaccinazione: ``<templateId root= “2.16.840.1.113883.2.9.10.1.11.1.1” extension=”1.0”/>``
  - Certificato Vaccinale: ``<templateId root= “2.16.840.1.113883.2.9.10.1.11.1.2” extension=”1.0”/>``
- ***code***: 
  - Scheda della singola Vaccinazione: codice LOINC ``"87273-9"``.
    ```xml
    <code code="87273-9"
          codeSystem="2.16.840.1.113883.6.1"
          codeSystemName="LOINC"
          codeSystemVersion="2.19"
          displayName="Scheda della singola Vaccinazione"/> 
    ```
  - Certificato Vaccinale:  codice LOINC ``"82593-5"``.
    ```xml
    <code code="82593-5"
          codeSystem="2.16.840.1.113883.6.1"
          codeSystemName="LOINC"
          codeSystemVersion="2.19"
          displayName="Certificato Vaccinale"/>
    ```
- ***effectiveTime***: indica la data di creazione del documento CDA.
- __Campi comuni__ ...
### Body
#### **Scheda della singola vaccinazione**
Un documento HL7 CDA R2.0 Scheda della singola vaccinazione deve contenere una sezione con code ``"11369-6"``, ``"Storia di immunizzazioni"`` conforme al template di sezione ``2.16.840.1.113883.2.9.10.1.11.3.1``, la cui struttura è definita nella tabella seguente.
 | Sezioni        | Codici LOINC | Descrizioni LOINC ShortName                     |
  |----------------|--------------|-------------------------------------------------|
  | Scheda della singola Vaccinazione | 11369-6      | Storia di immunizzazioni |

```xml
<section>
  <templateId root='2.16.840.1.113883.2.9.10.1.11.3.1'/>
  <id root='$ID_SEZ'/>
  <code code='11369-6' displayName='History of Immunization Narrative'
  codeSystem='2.16.840.1.113883.6.1' codeSystemName='LOINC'/>
  <title>Vaccinazioni</title>
  <text>$NARRATIVE_BLOCK</text>
  <entry>
    <!-- ... -->
    <!-- Dati Vaccinazione-->
    <templateId root="2.16.840.1.113883.2.9.10.1.11.4.1"/>
    <!-- ... -->
  </entry>
</section>
```
Gli elementi obbligatori della sezione:
- ***dati vaccinazione*** (substanceAdministration): atto a descrivere la Somministrazione del vaccino somministrato: mono-componente o combinazione (bambini o adulti) somministrata, ad es. 830 HBV; DTaP-HBV-IPV-HIB.
  - ***entry***: ce ne deve essere una per ogni somministrazione.
  - ***effectiveTime***: esprime la data e ora della vaccinazione.

  | Attributo                | DT  | Descrizione                      |
  |--------------------------|-----|----------------------------------|
  | classCode                | CS  | SBADM                            |
  | moodCode                 | CS  | ENV  Vaccino somministrato       |
  | templateId               |     |                                  |
  |    root                  | uid |                                  |
  | statusCode               | CS  |                                  |
  |   code                   |     | completed Vaccinazione avvenuta  |
  | effectiveTime            | TS  | Dati di somministrazione Vaccino |
  | consumable               |     | Vaccino somministrato            |
  |   typeCode               | CS  | CSM                              |
  |   manufacturedProduct    |     |                                  |
  |     manufacturedMaterial |     |                                  |
  |       code               | CE  | codice AIC                       |

#### **Certificato Vaccinale**
Un documento HL7 CDA R2.0 Certificato Vaccinale deve contenere una sezione con code ```"11369-6"```, ```"Storia di immunizzazioni"``` conforme al template di sezione ``2.16.840.1.113883.2.9.10.1.11.3.2``.
 | Sezioni        | Codici LOINC | Descrizioni LOINC ShortName                     |
  |----------------|--------------|-------------------------------------------------|
  | Scheda della singola Vaccinazione | 11369-6      | Storia di immunizzazioni |

```xml
<section>
 <templateId root='2.16.840.1.113883.2.9.10.1.11.3.2'/>
 <id root='$ID_SEZ'/>
  <code code='11369-6' 
        displayName='History of Immunization Narrative'
        codeSystem='2.16.840.1.113883.6.1' 
        codeSystemName='LOINC'/>
  <title>Vaccinazioni</title>
  <text>$NARRATIVE_BLOCK</text>
  <entry>
    <!-- ... -->
    <!-- Dati Vaccinazione-->
    <templateId root="2.16.840.1.113883.2.9.10.1.11.4.1"/>
    <!-- ... -->
  </entry>
  <entry>
    <!-- ... -->
    <!-- Dati Vaccinazione-->
    <templateId root="2.16.840.1.113883.2.9.10.1.11.4.1"/>
    <!-- ... -->
    </entry>
  </section>
  ```