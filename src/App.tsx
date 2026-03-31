import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Directions from "./pages/Directions";
import DirectionDetail from "./pages/DirectionDetail";
import Ecosystem from "./pages/Ecosystem";
import Projects from "./pages/Projects";
import Partners from "./pages/Partners";
import Media from "./pages/Media";
import Documents from "./pages/Documents";
import Contacts from "./pages/Contacts";
import Roadmap from "./pages/Roadmap";
import Glossary from "./pages/Glossary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const DIRECTION_SLUGS = [
  "cryptometry", "ai-lab", "ai-production", "invest-models",
  "property-mgmt", "lss", "land-data", "fee-dev",
  "licensing", "media",
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/directions" element={<Directions />} />
          {DIRECTION_SLUGS.map(slug => (
            <Route key={slug} path={`/directions/${slug}`} element={<DirectionDetail slug={slug} />} />
          ))}
          <Route path="/ecosystem" element={<Ecosystem />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/media" element={<Media />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/glossary" element={<Glossary />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;