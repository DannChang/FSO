import React from 'react'


const Course = ({ course }) => {
  const totalExercises = course.parts.map(part => part.exercises)

  return (
    <div key={course.id}>
    <h2>
        {course.name}
    </h2>
        {course.parts.map(part =>          
        <p key={part.id}>
            {part.name} {part.exercises}
        </p>
        )}
    <b>
        total of {totalExercises.reduce((sum, current) => sum + current)} exercises
    </b>
    </div>
  )
}

export default Course;