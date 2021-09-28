import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Button } from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { Patient, Entry, NewEntry } from '../types';
import { useStateValue, setViewedPatient } from '../state';
import GenderIcon from './GenderIcon';
import EntryItem from './EntryItem';
import AddEntryModal from '../AddEntryModal';

const PatientInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [{ viewedPatient }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      const updatedEntries = viewedPatient?.entries.concat(newEntry);
      const updatedPatient = {...viewedPatient, entries: updatedEntries} as Patient;
      dispatch(setViewedPatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown Error');
    }
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error={error}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientInfo;