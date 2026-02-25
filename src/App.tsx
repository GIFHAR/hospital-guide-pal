import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import MyStay from "./pages/MyStay";
import InfoGuidance from "./pages/InfoGuidance";
import Facilities from "./pages/Facilities";
import NotFound from "./pages/NotFound";
import Restroom from '@/pages/Restroom';

// ...

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/mystay" element={<MyStay />} />
            <Route path="/mystay/info-guidance" element={<InfoGuidance />} />
            <Route path="/mystay/info-guidance/facilities" element={<Facilities />} />
            <Route path="/facilities/restroom" element={<Restroom />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
