import {
  FluentProvider,
} from '@fluentui/react-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { DataTable } from './pages/DataTable';
import { ChatAgent } from './pages/ChatAgent';
import { Examples } from './pages/Examples';
import { fabricLightTheme } from './theme';

function App() {
  return (
    <FluentProvider
      theme={fabricLightTheme}
      style={{ minHeight: '100vh' }}
    >
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/data" element={<DataTable />} />
            <Route path="/chat" element={<ChatAgent />} />
            <Route path="/examples" element={<Examples />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </FluentProvider>
  );
}

export default App;
