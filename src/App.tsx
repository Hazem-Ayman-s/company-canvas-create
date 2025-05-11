
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context Provider
import { ContentProvider } from "@/context/ContentContext";

// Landing page
import Index from "./pages/Index";

// Dashboard pages
import Dashboard from "./pages/Dashboard";
import HeroEdit from "./pages/dashboard/HeroEdit";
import AboutEdit from "./pages/dashboard/AboutEdit";
import ProjectsEdit from "./pages/dashboard/ProjectsEdit";
import ContactEdit from "./pages/dashboard/ContactEdit";
import PagesManagement from "./pages/dashboard/PagesManagement";
import MessagesManagement from "./pages/dashboard/MessagesManagement";

// 404 Page
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ContentProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/content/hero" element={<HeroEdit />} />
            <Route path="/dashboard/content/about" element={<AboutEdit />} />
            <Route path="/dashboard/content/projects" element={<ProjectsEdit />} />
            <Route path="/dashboard/content/contact" element={<ContactEdit />} />
            <Route path="/dashboard/pages" element={<PagesManagement />} />
            <Route path="/dashboard/messages" element={<MessagesManagement />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ContentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
