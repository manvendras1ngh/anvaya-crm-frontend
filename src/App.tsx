import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { Agents } from "./components/Agents";
import { Reports } from "./components/Reports";
import { Settings } from "./components/Settings";
import { LeadManagement } from "./components/LeadManagement";
import { AgentManagement } from "./components/AgentManagement";
import { DataContextProvider } from "./contexts/DataContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <DataContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="lead/:id" element={<LeadManagement />} />
          <Route path="agent/:id" element={<AgentManagement />} />
          <Route path="agents" element={<Agents />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </DataContextProvider>
  );
}

export default App;
