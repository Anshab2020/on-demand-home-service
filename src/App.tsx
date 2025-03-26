import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ProviderLogin from "@/pages/ProviderLogin";
import ProviderSignUp from "@/pages/ProviderSignUp";
import ProviderDashboard from "@/pages/ProviderDashboard";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import ServiceProviderList from "@/pages/ServiceProviderList";

const queryClient = new QueryClient();

// Protected Route component for customers
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/sign-in" />;
};

// Protected Route component for providers
const ProtectedProviderRoute = ({ children }: { children: React.ReactNode }) => {
  const providerEmail = localStorage.getItem('providerEmail');
  return providerEmail ? <>{children}</> : <Navigate to="/provider-login" />;
};

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const adminEmail = localStorage.getItem('adminEmail');
  return adminEmail ? <>{children}</> : <Navigate to="/admin-login" />;
};

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/service-provider/:id" element={<ServiceDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/provider-login" element={<ProviderLogin />} />
              <Route path="/provider-signup" element={<ProviderSignUp />} />
              <Route
                path="/provider-dashboard"
                element={
                  <ProtectedProviderRoute>
                    <ProviderDashboard />
                  </ProtectedProviderRoute>
                }
              />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                }
              />
              <Route path="/services/:id" element={<ServiceProviderList />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
