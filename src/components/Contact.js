import Button from "./Button";
import HighlightMatches from "./HighlightMatches";
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
  const { ref } = useSectionSearch(CONTACT_SEARCH_TEXT);

  return (
    <section
      id="contact"
      ref={ref}
      tabIndex={-1}
      className="section search-scroll-root"
    >
      <h2>
        <HighlightMatches text="Contact" />
      </h2>
      <p>
        <HighlightMatches text="Reach me by email or connect on LinkedIn and GitHub." />
      </p>
      <div className="contact-actions">
        <Button href={`mailto:${email}`}>Email</Button>
        <Button href={linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </Button>
        <Button href={github} target="_blank" rel="noopener noreferrer">
          GitHub
        </Button>
      </div>
      <p className="small">
        <HighlightMatches text="Edgewood, MD" />
      </p>
    </section>
  );
}
