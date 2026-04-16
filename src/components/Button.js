export default function Button({ href, children, className = "", ...rest }) {
  const combined = ["btn", className].filter(Boolean).join(" ");
  if (href) {
    return (
      <a className={combined} href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={combined} {...rest}>
      {children}
    </button>
  );
}
