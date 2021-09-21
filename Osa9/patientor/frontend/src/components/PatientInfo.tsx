import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Icon } from "semantic-ui-react";

import { apiBaseUrl } from '../constants';
import { Patient } from '../types';

const PatientInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient>();

  /* TODO
      ---------------------check if user with given id is in state-----------------------
                  true                         |                  false
      --- check if user has ssn-property ----- | ------------ fetch user ----------------      
            true      |      false             |     found         |       not found                       
      -- view user -- | -- fetch user -------  | --store and view--|
                      |-update state and view--|
   */
  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(patient);
      } catch (error) {
        console.log(error);
      }
    };
    void fetchPatient();
  }, [id]);

  return (
    <div>
      <h2>{patient?.name} {patient?.gender === 'male' ? <Icon name='mars' /> : <Icon name='venus' />}</h2>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
    </div>
  );
};

export default PatientInfo;