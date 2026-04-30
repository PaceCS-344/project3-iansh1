import Button from "./Button";
import { CONTACT } from "../content/contact";
import { useSectionSearch } from "../hooks/useSectionSearch";

const CONTACT_SEARCH_TEXT = [
  "Contact",
  "Email",
  "LinkedIn",
  "GitHub",
  CONTACT.email,
  "Edgewood",
  "Maryland",
].join(" ");

export default function Contact() {
  const { email, linkedin, github } = CONTACT;
  const { ref, isMatch } = useSectionSearch(CONTACT_SEARCH_TEXT);

  return (
    <section
      id="contact"
      ref={ref}
      tabIndex={-1}
      className={`section${isMatch ? " search-match" : ""}`}
    >
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
