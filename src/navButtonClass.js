export function navButtonClass({ isActive }) {
  return ["btn", isActive ? "btn-active" : ""].filter(Boolean).join(" ");
}
