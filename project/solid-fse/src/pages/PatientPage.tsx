import { Component } from "solid-js"
import { useParams } from "solid-app-router"
import usePatientStore from "../hooks/usePatientStore"
import PatientInfo from "../components/PatientInfo"
import PatientDocs from "../components/PatientDocs"

const PatientPage: Component = () => {
  const params = useParams()
  const { patient, documents } = usePatientStore(params.fiscalCode)

  return (
    <div class="patient flex gap-12">
      <div class="w-1/4"><PatientInfo patient={patient}/></div>
      <div class="w-3/4"><PatientDocs documents={documents}/></div>
    </div>
  )
}

export default PatientPage