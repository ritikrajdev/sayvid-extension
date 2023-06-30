export async function getFromStorage(key: string) {
  return localStorage.getItem(key);
}

export async function setInStorage(key: string, value: string) {
  return localStorage.setItem(key, value);
}

export async function removeFromStorage(key: string) {
  return localStorage.removeItem(key);
}

export async function clearStorage() {
  return localStorage.clear();
}

export async function getOrSetInStorage(key: string, value: string) {
  const val = localStorage.getItem(key);
  if (val) {
    return val;
  }
  else {
    localStorage.setItem(key, value);
    return value;
  }
}