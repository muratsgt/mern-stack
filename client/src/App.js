import './App.css';
import AppRouter from "./Router/Router";
import AuthContextProvider from './context/AuthContext';
import BasketContextProvider from './context/BasketContext';

function App() {
  return (
    <AuthContextProvider>
      <BasketContextProvider>
        <AppRouter />
      </BasketContextProvider>
    </AuthContextProvider>
  );
}

export default App;
