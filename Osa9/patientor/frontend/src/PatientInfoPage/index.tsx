import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Icon } from "semantic-ui-react";

import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import { useStateValue, setViewedPatient } from '../state';

const PatientInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [{ viewedPatient }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(setViewedPatient(patient));
      } catch (error) {
        console.error(error.response?.data || 'Unknown Error');
      }
    };
    if (viewedPatient?.id !== id || viewedPatient === null) {
      void fetchPatient();
    }
  }, [dispatch]);

  return (
    <div>
      <h2>{viewedPatient?.name} {viewedPatient?.gender === 'male' ? <Icon name='mars' /> : <Icon name='venus' />}</h2>
      <p>ssn: {viewedPatient?.ssn}</p>
      <p>occupation: {viewedPatient?.occupation}</p>
    </div>
  );
};

export default PatientInfo;