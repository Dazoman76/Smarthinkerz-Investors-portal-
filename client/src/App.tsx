import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SupabaseAuthProvider } from "./contexts/SupabaseAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Investors from "./pages/Investors";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SystemicThinking from "./pages/concepts/SystemicThinking";
import CognitiveBiases from "./pages/concepts/CognitiveBiases";
import DecisionIntelligence from "./pages/concepts/DecisionIntelligence";
import MentalModels from "./pages/concepts/MentalModels";
import BookingPage from "./pages/BookingPage";
import BookingAdmin from "./pages/BookingAdmin";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/investors"} component={Investors} />
      <Route path={"/login"} component={Login} />
      <Route path={"/register"} component={Register} />
      <Route path={"/forgot-password"} component={ForgotPassword} />
      <Route path={"/dashboard"}>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path={"/admin"}>
        <AdminDashboard />
      </Route>
      <Route path={"/concepts/systemic-thinking"} component={SystemicThinking} />
      <Route path={"/concepts/cognitive-biases"} component={CognitiveBiases} />
      <Route path={"/concepts/decision-intelligence"} component={DecisionIntelligence} />
      <Route path={"/concepts/mental-models"} component={MentalModels} />
      <Route path={"/book"} component={BookingPage} />
      <Route path={"/booking-admin"} component={BookingAdmin} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <SupabaseAuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </SupabaseAuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
