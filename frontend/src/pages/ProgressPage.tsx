import { Heading, Stat } from "../components/UI";
import { scoreHistory } from "../data/demo";
export function ProgressPage() {
  return (
    <>
      <Heading
        title="My progress"
        detail="Java Fundamentals · Two sample attempts"
      />
      <section className="panel">
        <h2>Score by attempt</h2>
        {scoreHistory.map(({ attempt, score }) => (
          <div className="chart-row" key={attempt}>
            <span>Attempt {attempt}</span>
            <div className="bar" aria-hidden="true">
              <span style={{ width: `${score}%` }} />
            </div>
            <strong>{score}/100</strong>
          </div>
        ))}
        <p className="notice">
          Sample score uses 60% tests, 20% coverage, and 20% code quality.
        </p>
      </section>
      <div className="stats">
        <Stat
          label="Line coverage"
          value="80%"
          note="Up from 60% on attempt 1"
        />
        <Stat
          label="Security findings"
          value="1"
          note="Down from 3 on attempt 1"
        />
        <Stat
          label="Tests passing"
          value="9"
          suffix="/ 10"
          note="One edge case to revisit"
        />
      </div>
    </>
  );
}
