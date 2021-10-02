import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h2>{props.course}</h2>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part) => <Part key={part.id} part={part}/>)}
    </div>
  )
}

const Total = ({parts}) => {
  const sum = parts.reduce((previous, current) => previous + current.exercises, 0)
  return (
    <div>
      <h3>toal of {sum} exercises</h3>
    </div>
  )
}

const Part = ({part}) => {
  return (
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course