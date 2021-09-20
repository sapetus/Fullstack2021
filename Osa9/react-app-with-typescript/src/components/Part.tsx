import React from 'react';
import { CoursePart } from '../types';

const asserNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <div>
          <b>{part.name}, {part.exerciseCount}</b> <br />
          <em>{part.description}</em> <br />
          &nbsp;
        </div>
      );
    case 'groupProject':
      return (
        <div>
          <b>{part.name}, {part.exerciseCount}</b> <br />
          group projects: {part.groupProjectCount} <br />
          &nbsp;
        </div>
      );
    case 'submission':
      return (
        <div>
          <b>{part.name}, {part.exerciseCount}</b> <br />
          <em>{part.description}</em> <br />
          submission link: {part.exerciseSubmissionLink} <br />
          &nbsp;
        </div>
      );
    case 'special':
      return (
        <div>
          <b>{part.name}, {part.exerciseCount}</b> <br />
          <em>{part.description}</em> <br />
          required skills: {JSON.stringify(part.requirements)} <br />
          &nbsp;
        </div>
      );
    default:
      return asserNever(part);
  }
};

export default Part;