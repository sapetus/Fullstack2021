import React from 'react';
import { Entry } from '../types';
import { useStateValue } from '../state';
import { Icon } from 'semantic-ui-react';
import HealthCheckIcon from './HealthCheckIcon';
import DiagnoseList from './DiagnoseList';

const EntryItem = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses },] = useStateValue();

  const textStyle = {
    color: 'grey',
    fontStyle: 'italic'
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <div className="ui segment raised">
          <h3>
            <strong>{entry.date}</strong>
            <Icon name="hospital" size="large" />
          </h3>
          <p style={textStyle}>{entry.description}</p>
          <DiagnoseList diagnosisCodes={entry.diagnosisCodes} diagnoses={diagnoses} />
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div className="ui segment raised">
          <h3>
            <strong>{entry.date}</strong>
            <Icon name="doctor" size="large" />
            <strong>{entry.employerName}</strong>
          </h3>
          <p style={textStyle}>{entry.description}</p>
          <DiagnoseList diagnosisCodes={entry.diagnosisCodes} diagnoses={diagnoses} />
        </div>
      );
    case "HealthCheck":
      return (
        <div className="ui segment raised">
          <h3>
            <strong>{entry.date}</strong>
            <Icon name="stethoscope" size="large" />
          </h3>
          <p style={textStyle}>{entry.description}</p>
          <DiagnoseList diagnosisCodes={entry.diagnosisCodes} diagnoses={diagnoses} />
          <HealthCheckIcon rating={entry.healthCheckRating} />
        </div>
      );
    default:
      return (
        <p>unknown type</p>
      );
  }
};

export default EntryItem;