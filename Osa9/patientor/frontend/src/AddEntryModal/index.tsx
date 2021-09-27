import React from 'react';
import { Modal } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';
import { NewEntry } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit }: Props) => {
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose}/>
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;