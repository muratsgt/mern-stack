import "./App.css";
import AppRouter from "./Router/Router";
import { Layout } from "antd";

function App() {
  return (
    <Layout className="layout">
      <AppRouter />
    </Layout>
  );
}

export default App;
