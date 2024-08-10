export function userHeader() {
  return `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`;
}
