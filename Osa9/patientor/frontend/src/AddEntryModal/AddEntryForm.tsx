import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Grid, Button } from 'semantic-ui-react';

import { TextField, DiagnosisSelection, NumberField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { NewEntry } from '../types';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

//currently only supports type of "HealthCheck"
const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Type"
              placeholder="Type"
              name="type"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Healthcheck Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button
                  type="button"
                  onClick={onCancel}
                  color="red"
                >
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  ype="submit"
                  floated="right"
                  color="green"
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;