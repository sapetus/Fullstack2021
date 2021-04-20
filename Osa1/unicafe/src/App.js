import React, {useState} from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  );
};

const StaticsLine = ({text, amount}) => {
  if (text === 'positive') {
    return (
      <tr>
        <td>{text}</td>
        <td>{amount * 100} %</td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{text}</td>
        <td>{amount}</td>
      </tr>
    );
  };
};

const Statistics = ({data}) => {
  if(data[3].value === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } else {
    const statisticsElements = [];
    data.map((feedback, i) => {
      statisticsElements.push(<StaticsLine key={i} text={feedback.name} amount={feedback.value}/>)
    })
    return (
      <table>
        <tbody>
          {statisticsElements}
        </tbody>
      </table>
    );
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const data = [
    {
      'name': 'good',
      'value': good
    },
    {
      'name': 'neutral',
      'value': neutral
    },
    {
      'name': 'bad',
      'value': bad
    },
    {
      'name': 'total',
      'value': total
    },
    {
      'name': 'average',
      'value': average
    },
    {
      'name': 'positive',
      'value': positive
    }
  ]

  const handleClick = (name) => {
    if (name === 'good') {
      setGood(good + 1);
      setAverage((good + 1 - bad) / (total + 1));
      setPositive((good + 1) / (total + 1));
    } else if (name === 'neutral') {
      setNeutral(neutral + 1);
      setPositive(good / (total + 1));
    } else if (name === 'bad') {
      setBad(bad + 1);
      setAverage((-bad - 1 + good) / (total + 1));
      setPositive(good / (total + 1));
    };
    setTotal(total + 1);
  };

  return (
    <div>
      <h1>Give us feedback</h1>
      <div id='buttons'>
        <Button handleClick={() => handleClick('good')} text='good'/>
        <Button handleClick={() => handleClick('neutral')} text='neutral'/>
        <Button handleClick={() => handleClick('bad')} text='bad'/>
      </div>
      <h1>Statistics</h1>
      <Statistics data={data}/>
    </div>
  );
}

export default App;