# CDA FHIR Comperison
While FHIR can be used to create [documents](https://build.fhir.org/documents.html) using the [Composition Resource](https://build.fhir.org/composition.html), FHIR can also be used to exchange traditional CDA R2 documents making use of the [DocumentReference](https://build.fhir.org/documentreference.html) resource, and handling the CDA document itself as a binary attachment (as XDS does). 

As its name implies, Clinical Document Architecture is limited to "clinical" use cases.

Using CDA, common clinical concepts can be (and frequently are) modeled differently in different circumstances. With FHIR, all clinical (and non-clinical) content is handled by _resources_ ensuring that there's only one way for core content to be represented.
Every CDA instance includes templateId attribute values scattered throughout the instance to define meaning. With FHIR, meaning is defined by the resource.

While the CDA header can reasonably be mapped to the HL7 [Composition](https://build.fhir.org/composition.html) resource and related resources, mappings between FHIR and CDA should be done at the template level rather than the CDA specification itself. 

## [Resource Composition](https://build.fhir.org/composition.html#2.8)
A Composition is a set of healthcare-related information that is assembled together into a single logical package that provides a single coherent statement of meaning, establishes; however, it alone does not constitute a document.

The Composition resource organizes clinical and administrative content into sections, each of which contains a narrative, and references other resources for supporting data.

There are three important structural differences between CDA and the Composition resource: 
- A composition is a logical construct - its `identifier` matches to the CDA `ClinicalDocument.setId`. Composition resources are wrapped into [Document](https://build.fhir.org/documents.html) structures.
- The composition section defines a section (or sub-section) of the document, but unlike CDA, the section entries are actually references to other resources that hold the supporting data content for the section. This design means that the data can be reused in many other ways. 
- Unlike CDA, the context defined in the Composition apply to the composition and do not specifically apply to the resources referenced from the `section.entry`.

It is acceptable for a Composition to contain only narrative (Composition.section.text) and no entries (Composition.section.entry)

## [FHIR Documents](https://build.fhir.org/documents.html#3.4)
A document is a frozen set of resources with a fixed presentation that is authored and/or attested by humans, organizations and devices.

A document instance contains specific frozen versions of other resources. 

### Document Content
All documents have the same structure: a `Bundle` of resources of type "document" that has a `Composition` resource as the first resource in the bundle, followed by a series of other resources, referenced from the `Composition` resource.

There are two key identifiers in the document:

- The document identifier (mandatory). This is found in `Bundle.identifier` and is globally unique for this instance of the document, and is never re-used, including for other documents derived from the same composition 
- The Composition identifier (optional). This is found in `Composition.identifier`, and is the same for all documents that are derived from this composition

The document has two mandatory dates in it:
- The document date. This is found in `Bundle.timestamp` and identifies when the document bundle was assembled from the underlying resources
- The Composition date. This is found in `Composition.date`, which is when the author wrote the document logically
