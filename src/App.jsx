import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import UserLayout from "./layouts/UserLayout";

function App() {
  return (
      <Routes>
          { routes.map((route) => {
            const Page = route.component;
            return (
              <Route key={route.path} path={route.path} element={<UserLayout><Page /></UserLayout>} />
            );
          })}
      </Routes>
    );
  }
  export default App;