const Header = ({ course }) => <h1>{course}</h1>;
const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);
const Content = ({ data }) => {
  return (
    <>
      {data.map(({ part, exercises }) => (
        <Part name={part} exercises={exercises} />
      ))}
    </>
  );
};
const Total = ({ total }) => <p>Number of exercises {total}</p>;

const App = () => {
  const course = "Half Stack application development";
  const data = [
    { part: "Fundamentals of React", exercises: 10 },
    { part: "Using props to pass data", exercises: 7 },
    { part: "State of a component", exercises: 14 },
  ];
  const total = data.reduce((acc, curr) => acc + curr.exercises, 0);

  return (
    <div>
      <Header course={course} />
      <Content data={data} />
      <Total total={total} />
    </div>
  );
};

export default App;
