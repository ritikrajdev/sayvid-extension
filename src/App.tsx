import './App.css';
import { ErrorProvider } from './contexts/errorContext';
import Main from './pages/Main';

function App() {
  return (
    <ErrorProvider>
      <div className='app'>
        <Main />
      </div>
    </ErrorProvider>
  );
}

export default App;
