import React from 'react';
import { Gender } from '../types';
import { Icon } from 'semantic-ui-react';

const GenderIcon = ({ gender }: { gender: Gender | undefined }) => {
  switch (gender) {
    case "male":
      return (
        <Icon name="mars" />
      );
    case "female":
      return (
        <Icon name="venus" />
      );
    case "other":
      return (
        <Icon name="other gender horizontal"/>
      );
    default:
      return (
        <Icon name="question" />
      );
  }
};

export default GenderIcon;