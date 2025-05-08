
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Index";
import AuctionsPage from "./pages/Auctions";
import AuctionDetailPage from "./pages/AuctionDetail";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import UserDashboardPage from "./pages/UserDashboard";
import AdminDashboardPage from "./pages/admin/Dashboard";
import AdminVehiclesPage from "./pages/admin/Vehicles";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import AdminLayout from "./components/admin/AdminLayout";
import AuthGuard from "./components/auth/AuthGuard";
import AdminGuard from "./components/auth/AdminGuard";

// New VIP Style Pages
import VIPAuctionsList from "./pages/VIPAuctionsList";
import VIPAuctionDetail from "./pages/VIPAuctionDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/auctions" element={<VIPAuctionsList />} />
            <Route path="/auction/:id" element={<VIPAuctionDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<AuthGuard><UserDashboardPage /></AuthGuard>} />
            
            {/* Original pages kept for reference */}
            <Route path="/original-auctions" element={<AuctionsPage />} />
            <Route path="/original-auction/:id" element={<AuctionDetailPage />} />
          </Route>
          <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="vehicles" element={<AdminVehiclesPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
