const Header = ({ title }) => <h1>{title}</h1>;
const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);
const Content = ({ parts }) => {
  return (
    <>
      {parts.map(({ name, exercises }, index) => (
        <Part name={name} exercises={exercises} key={index} />
      ))}
    </>
  );
};
const Total = ({ total }) => <p>Number of exercises {total}</p>;

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };
  const total = course.parts.reduce((acc, curr) => acc + curr.exercises, 0);

  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  );
};

export default App;
