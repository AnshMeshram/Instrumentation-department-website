import MainLayout from "./layout/MainLayout";
import AppRoutes from "./routes/AppRoutes";

/*
App component now only loads layout + routes
(no UI here)
*/

function App() {
  return (
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  );
}

export default App;
