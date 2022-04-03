import Header from "./Header";

const Part = ({ part }) => {
  const { name, exercises } = part;
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part part={part} key={part.id} />
    ))}
  </>
);

const Total = ({ total }) => <b>total of {total} exercises</b>;

const Course = ({ course }) => {
  const { name, parts } = course;
  const total = parts.reduce((acc, { exercises }) => acc + exercises, 0);

  return (
    <>
      <Header title={name} isSubTitle />
      <Content parts={parts} />
      <Total total={total} />
    </>
  );
};

export default Course;
