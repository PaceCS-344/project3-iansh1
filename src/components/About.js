export default function About() {
  return (
    <section id="about" className="section">
      <h2>About me</h2>
      <p>
        I am pursuing a B.S. in Computer Science with a minor in Mathematics at
        Pace University (Seidenberg School of CSIS), graduating May 2027. I
        care about building tools that make technical work easier for users.
      </p>

      <h3 className="subheading">Highlights I am proud of</h3>
      <ul>
        <li>
          <strong>Sensor data pipeline:</strong> multi-station time-series
          processing with validation, TimescaleDB hypertables, and adapters for
          multiple database backends.
        </li>
        <li>
          <strong>UN Millennium Fellowship:</strong> participated in the
          Right-to-Know H₂O &apos;24 project (Fall 2024).
        </li>
      </ul>
    </section>
  );
}
