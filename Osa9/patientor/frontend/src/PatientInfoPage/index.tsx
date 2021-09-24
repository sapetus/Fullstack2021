import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

import { apiBaseUrl } from '../constants';
import { Patient, Entry } from '../types';
import { useStateValue, setViewedPatient } from '../state';
import GenderIcon from './GenderIcon';
import EntryItem from './EntryItem';

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
      <div className="ui segment">
        <h2>{viewedPatient?.name} <GenderIcon gender={viewedPatient?.gender} /></h2>
        <p>ssn: {viewedPatient?.ssn}</p>
        <p>occupation: {viewedPatient?.occupation}</p>
      </div>
      <div className="ui segment">
        <h3>Entries</h3>
        {viewedPatient?.entries.map((entry: Entry) =>
          <EntryItem key={entry.id} entry={entry} />
        )}
      </div>
    </div>
  );
};

export default PatientInfo;