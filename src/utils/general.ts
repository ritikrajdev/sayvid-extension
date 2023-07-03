export function getIdOfCurrentPage() {
  return new Promise((resolve) => {
    const chrome = (window as any).chrome;
    if (chrome?.tabs?.query) {
      chrome.tabs.query(
        { active: true, currentWindow: true }, (tabs: any[]) => {
          resolve(tabs[0].url);
        });
    } else resolve(window.location.host + '_' + window.location.pathname);
  });
}

export function getUrlOfCurrentPage(): Promise<string> {
  return new Promise((resolve) => {
    const chrome = (window as any).chrome;
    if (chrome?.tabs?.query) {
      chrome.tabs.query(
        { active: true, currentWindow: true }, (tabs: any[]) => {
          resolve(tabs[0].url);
        });
    } else resolve(window.location.host + window.location.pathname);
  });
}