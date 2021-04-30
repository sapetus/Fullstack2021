import React from 'react'

const Header = ({courseName}) => {
    return (
      <h2>
        {courseName}
      </h2>
    );
  };
  
  const Content = ({courseParts}) => {
    return (
      <div>
        {courseParts.map(
          part => <Part key={part.id} part={part}/>
        )}
      </div>
    );
  };
  
  const Part = ({part}) => {
    return (
      <p>
        {part.name}, exercises in part: {part.exercises}
      </p>
    );
  };
  
  const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => {
      return sum + part.exercises;
    }, 0);
  
    return (
      <p>
        <b>Total number of exercises: {total}</b>
      </p>
    );
  };
  
  const Course = ({course}) => {
    return (
      <div>
        <Header courseName={course.name}/>
        <Content courseParts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  };
  
  const Courses = ({courses}) => {
    return (
      <div>
        {courses.map(
          course => <Course key={course.id} course={course}/>
        )}
      </div>
    );
  };
  

export default Courses