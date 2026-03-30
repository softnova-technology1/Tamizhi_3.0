export function nameCheck(data) {
  let value = data.trim();
  return value.length > 0 && value.length <= 25;
}
export function emailCheck(data) {
  let value = data.trim();
  let pattern = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/g;
  return value.length > 0 && pattern.test(value);
}
export function numberCheck(data) {
  let value = data.trim();
  return value.length === 10;
}
export function passwordCheck(data) {
  let value = data.trim();
  return value.length >= 8;
}
export function confirmPasswordCheck(oldPasswordata, newpasswordata) {
  let oldPassword = oldPasswordata.trim();
  let newPassword = newpasswordata.trim();
  return oldPassword === newPassword;
}
