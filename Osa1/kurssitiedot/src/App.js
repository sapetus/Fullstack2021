import React from 'react'

const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]}></Part>
      <Part part={props.parts[1]}></Part>
      <Part part={props.parts[2]}></Part>
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      Part {props.part.name}, exercises in part: {props.part.exercises}
    </p>
  );
};

const Total = (props) => {
  let sum = 0;

  props.data.forEach(part => {
    sum += part.exercises
  });

  return (
    <p>
      Total number of exercises: {sum}
    </p>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of component',
      exercises: 14
    }
  ];

  return (
    <div>
      <Header course={course}></Header>
      <Content parts={parts}></Content>
      <Total data={parts}></Total>
    </div>
  );
};

export default App