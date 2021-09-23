import React from 'react';
import { Icon } from 'semantic-ui-react';

const HealthCheckIcon = ({ rating }: { rating: number }) => {
  switch (rating) {
    case 0:
      return (
        <div>
          <Icon name="heart" color="green" />
        </div>
      );
    case 1:
      return (
        <div>
          <Icon name="heart" color="yellow" />
        </div>
      );
    case 2:
      return (
        <div>
          <Icon name="heart" color="orange" />
        </div>
      );
    case 3:
      return (
        <div>
          <Icon name="heart" color="red" />
        </div>
      );
    default:
      return (
        <div>
          unknown risk
        </div>
      );
  }
};

export default HealthCheckIcon;