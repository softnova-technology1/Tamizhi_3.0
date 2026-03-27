export function getRandomInt() {
  return Math.floor(Math.random() * 1000);
}
export function deviceWidth() {
  let screen_width = document.documentElement.clientWidth;
  if (screen_width <= 572) {
    return true;
  }
  return false;
}
