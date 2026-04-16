import Button from "./Button";
import { CONTACT } from "../content/contact";

export default function Contact() {
  const { email, linkedin, github } = CONTACT;

  return (
    <section id="contact" className="section">
      <h2>Contact</h2>
      <p>Reach me by email or connect on LinkedIn and GitHub.</p>
      <div className="contact-actions">
        <Button href={`mailto:${email}`}>Email</Button>
        <Button href={linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </Button>
        <Button href={github} target="_blank" rel="noopener noreferrer">
          GitHub
        </Button>
      </div>
      <p className="small">Edgewood, MD</p>
    </section>
  );
}
