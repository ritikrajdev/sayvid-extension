import { createContext, useState } from 'react';

export const ErrorContext =
  createContext<{ setError: (message: string) => void; }>({
    setError: console.error,
  });


export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string | null>(null);

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }

  return (
    <ErrorContext.Provider value={{
      setError
    }}>
      {children}
      {error && <div className='error'>{error}</div>}
    </ErrorContext.Provider>
  );
}