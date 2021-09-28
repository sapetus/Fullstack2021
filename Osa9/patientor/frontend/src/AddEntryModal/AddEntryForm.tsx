import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Grid, Button } from 'semantic-ui-react';

import { TextField, DiagnosisSelection, NumberField, TypeSelection } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { NewEntry } from '../types';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const HealthCheckForm = () => {
  return (
    <Field
      label="Healthcheck Rating"
      name="healthCheckRating"
      component={NumberField}
      min={0}
      max={3}
    />
  );
};

const OccupationalHealthcareForm = () => {
  return (
    <div>
      <Field
        label="Employer Name"
        placeholder="Employer Name"
        name="employerName"
        component={TextField}
      />
      <Field
        label="Sick Leave Start Date"
        placeholder="YYYY-MM-DD"
        name="sickLeave.startDate"
        component={TextField}
      />
      <Field
        label="Sick Leave End Date"
        placeholder="YYYY-MM-DD"
        name="sickLeave.endDate"
        component={TextField}
      />
    </div>
  );
};

const HospitalForm = () => {
  return (
    <div>
      <Field
        label="Discharge Date (Required)"
        placeholder="YYYY-MM-DD"
        name="discharge.date"
        component={TextField}
      />
      <Field
        label="Discharge Criteria (Required)"
        placeholder="Criteria"
        name="discharge.criteria"
        component={TextField}
      />
    </div>
  );
};

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
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.name = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === 'HealthCheck') {
          if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
          }
        } else if (values.type === 'OccupationalHealthcare') {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
        } else if (values.type === 'Hospital') {
          //could not get errors working for discharge criteria and date
        }
        return errors;
      }}
    >
      {({ setFieldValue, setFieldTouched, isValid, dirty }) => {
        const [selectedType, setSelectedType] = React.useState<string | undefined>();

        const changeSelectedType = (type: string): void => {
          setSelectedType(type);
        };

        return (
          <Form className="form ui">
            <TypeSelection
              types={["HealthCheck", "OccupationalHealthcare", "Hospital"]}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              setSelectedType={changeSelectedType}
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
            {selectedType === "HealthCheck" &&
              <HealthCheckForm />
            }
            {selectedType === "OccupationalHealthcare" &&
              <OccupationalHealthcareForm />
            }
            {selectedType === "Hospital" &&
              <HospitalForm />
            }
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
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
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