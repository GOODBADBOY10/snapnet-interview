import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <header className="bg-blue-600 text-white p-4">
          <Link to="/" className="text-2xl font-bold">EventHub</Link>
        </header>

        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<EventsPage />} />
            <Route path="/event/:id" element={<EventDetailPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  );
}