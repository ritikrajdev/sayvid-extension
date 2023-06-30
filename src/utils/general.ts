export function getIdOfCurrentPage() {
  return window.location.host + '_' + window.location.pathname;
}