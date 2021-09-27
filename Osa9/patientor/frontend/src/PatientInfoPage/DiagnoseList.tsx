import React from 'react';
import { Diagnose} from '../types';

type PropTypes = {
  diagnosisCodes: Array<string> | undefined;
  diagnoses: { [id: string]: Diagnose }
};

const DiagnoseList = (props: PropTypes) => {
  return (
    <ul>
      {props.diagnosisCodes?.map(code =>
        <li key={code}>
          <p>{code} | <em>{props.diagnoses[`${code}`]?.name}</em></p>
        </li>
      )}
    </ul>
  );
};

export default DiagnoseList;