import { useEffect, useState } from "react";

const Header = ({ title }) => <h1>{title}</h1>;
const Button = ({ onClick, text }) => (
  <button type="button" onClick={onClick}>
    {text}
  </button>
);

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {text === "positive" && value > 0 ? "%" : ""}
      </td>
    </tr>
  );
};

const Statistics = ({ feedbacks }) => {
  const feedbackScore = { good: 1, neutral: 0, bad: -1 };
  const totalFeedback = Object.values(feedbacks).reduce(
    (acc, cur) => acc + cur,
    0
  );
  const totalScore = Object.keys(feedbacks).reduce(
    (acc, feedback) => acc + feedbackScore[feedback] * feedbacks[feedback],
    0
  );
  const averageScore = (totalScore / totalFeedback || 0).toFixed(1);
  const positivePercentage = (
    (100 * feedbacks.good) / totalFeedback || 0
  ).toFixed(1);
  const [statistics, setStatistics] = useState({
    ...feedbacks,
    all: totalFeedback,
    average: averageScore,
    positive: positivePercentage,
  });

  useEffect(
    () =>
      setStatistics({
        ...feedbacks,
        all: totalFeedback,
        average: averageScore,
        positive: positivePercentage,
      }),
    [feedbacks, averageScore, totalFeedback, positivePercentage]
  );

  return (
    <>
      <Header title="statistics" />
      {totalFeedback <= 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            {Object.keys(statistics).map((statistic, index) => (
              <StatisticLine
                text={statistic}
                value={statistics[statistic]}
                key={index}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

const App = () => {
  const [feedbacks, setFeedbacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onFeedbackClickHandler = (feedback) => () => {
    setFeedbacks({
      ...feedbacks,
      [feedback]: feedbacks[feedback] + 1,
    });
  };

  return (
    <div>
      <Header title="give feedback" />
      {Object.keys(feedbacks).map((feedback, index) => (
        <Button
          onClick={onFeedbackClickHandler(feedback)}
          text={feedback}
          key={index}
        />
      ))}
      <Statistics feedbacks={feedbacks} />
    </div>
  );
};

export default App;
