import { LoginContextProvider } from "./context/loginContext";
import { Home } from "./pages/Home";

const App: React.FC = () => {
  return (
    <LoginContextProvider>
      <Home />
    </LoginContextProvider>
  );
};

export default App;
