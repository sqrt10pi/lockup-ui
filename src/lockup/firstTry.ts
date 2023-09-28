let firstTry = localStorage.getItem("has-completed-before") !== "true"

export function isFirstTry(): boolean {
  return firstTry;
}

export function clearFirstTry() {
  localStorage.setItem("has-completed-before", "true");
  firstTry = false;
}