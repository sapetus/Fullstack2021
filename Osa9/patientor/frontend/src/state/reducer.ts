import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_VIEWED_PATIENT";
    payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_VIEWED_PATIENT":
      return {
        ...state,
        viewedPatient: action.payload
      };
    default:
      return state;
  }
};

export const setPatientList = (content: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: content
  };
};

export const addPatient = (content: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: content
  };
};

export const setViewedPatient = (content: Patient): Action => {
  return {
    type: "SET_VIEWED_PATIENT",
    payload: content
  };
};