const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  return (
    <div>
       {props.parts.map((part, index) => 
        <Part key={index} name={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}


const Total = ({parts}) => {
  const totalNumb = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p>Number of exercises {totalNumb}</p>
  )
}


const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course ={course.name} />
      <Content parts ={course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}
export default Course