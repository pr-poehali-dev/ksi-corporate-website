import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { EarlyAccessModalProvider } from "@/contexts/EarlyAccessModalContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Directions from "./pages/Directions";
import DirectionDetail from "./pages/DirectionDetail";
import Ecosystem from "./pages/Ecosystem";
import Projects from "./pages/ProjectsList";
import ProjectDetail from "./pages/ProjectDetail";
import Partners from "./pages/Partners";
import Media from "./pages/Media";
import Documents from "./pages/Documents";
import Contacts from "./pages/Contacts";
import Roadmap from "./pages/Roadmap";
import Glossary from "./pages/Glossary";
import Cryptometry from "./pages/Cryptometry";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Requisites from "./pages/Requisites";
import EarlyAccess from "./pages/EarlyAccess";
import Legal from "./pages/Legal";
import Coauthor from "./pages/Coauthor";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import CabinetLayout from "./components/cabinet/CabinetLayout";
import AdminLayout from "./components/admin/AdminLayout";
import AoksiAiWidget from "./components/ksi/AoksiAiWidget";

/* Cabinet pages */
import CabinetDashboard from "./pages/cabinet/Dashboard";
import CabinetModules from "./pages/cabinet/Modules";
import CabinetTasks from "./pages/cabinet/Tasks";
import CabinetTaskDetail from "./pages/cabinet/TaskDetail";
import CabinetTaskCreate from "./pages/cabinet/TaskCreate";
import CabinetAssets from "./pages/cabinet/Assets";
import CabinetBalance from "./pages/cabinet/Balance";
import CabinetChat from "./pages/cabinet/Chat";
import CabinetDocuments from "./pages/cabinet/Documents";
import CabinetTeam from "./pages/cabinet/Team";
import CabinetSettings from "./pages/cabinet/Settings";
import CabinetNotifications from "./pages/cabinet/Notifications";

/* Admin pages */
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCompanies from "./pages/admin/Companies";
import AdminCompanyDetail from "./pages/admin/CompanyDetail";
import AdminUsers from "./pages/admin/Users";
import AdminModules from "./pages/admin/Modules";
import AdminTasks from "./pages/admin/Tasks";
import AdminTaskDetail from "./pages/admin/TaskDetailAdmin";
import AdminFinance from "./pages/admin/Finance";
import AdminApprovals from "./pages/admin/Approvals";
import AdminAuditLog from "./pages/admin/AuditLog";
import AdminSettings from "./pages/admin/SystemSettings";
import AdminSiteSettings from "./pages/admin/SiteSettingsPage";
import AdminPresentations from "./pages/admin/Presentations";
import AdminChat from "./pages/admin/Chat";
import AdminScriptedDialogs from "./pages/admin/ScriptedDialogs";

const queryClient = new QueryClient();

const DIRECTION_SLUGS = [
  "ai-lab", "ai-production", "lss", "fee-dev",
];

/* Route guard for authenticated routes */
function RequireAuth({ allowedType, children }: { allowedType: "client" | "internal"; children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0f]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user.user_type !== allowedType) {
    const redirect = user.user_type === "internal" ? "/admin" : "/cabinet";
    return <Navigate to={redirect} replace />;
  }

  return <>{children}</>;
}

/* Redirect logged-in users away from login page */
function GuestOnly({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0f]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  if (user) {
    const redirect = user.user_type === "internal" ? "/admin" : "/cabinet";
    return <Navigate to={redirect} replace />;
  }

  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <EarlyAccessModalProvider>
        <BrowserRouter>
          <AoksiAiWidget />
          <Routes>
            {/* Public site pages */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/directions" element={<Directions />} />
            {DIRECTION_SLUGS.map(slug => (
              <Route key={slug} path={`/directions/${slug}`} element={<DirectionDetail slug={slug} />} />
            ))}
            <Route path="/ecosystem" element={<Ecosystem />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/early-access" element={<EarlyAccess />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/coauthor" element={<Coauthor />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/media" element={<Media />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/cryptometry" element={<Cryptometry />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/requisites" element={<Requisites />} />

            {/* Auth */}
            <Route path="/auth/login" element={<GuestOnly><Login /></GuestOnly>} />

            {/* Cabinet (client) */}
            <Route path="/cabinet" element={<RequireAuth allowedType="client"><CabinetLayout /></RequireAuth>}>
              <Route index element={<CabinetDashboard />} />
              <Route path="assets" element={<CabinetAssets />} />
              <Route path="modules" element={<CabinetModules />} />
              <Route path="tasks" element={<CabinetTasks />} />
              <Route path="tasks/new" element={<CabinetTaskCreate />} />
              <Route path="tasks/:id" element={<CabinetTaskDetail />} />
              <Route path="balance" element={<CabinetBalance />} />
              <Route path="chat" element={<CabinetChat />} />
              <Route path="documents" element={<CabinetDocuments />} />
              <Route path="team" element={<CabinetTeam />} />
              <Route path="settings" element={<CabinetSettings />} />
              <Route path="notifications" element={<CabinetNotifications />} />
            </Route>

            {/* Admin (internal) */}
            <Route path="/admin" element={<RequireAuth allowedType="internal"><AdminLayout /></RequireAuth>}>
              <Route index element={<AdminDashboard />} />
              <Route path="companies" element={<AdminCompanies />} />
              <Route path="companies/:id" element={<AdminCompanyDetail />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="modules" element={<AdminModules />} />
              <Route path="tasks" element={<AdminTasks />} />
              <Route path="tasks/:id" element={<AdminTaskDetail />} />
              <Route path="finance" element={<AdminFinance />} />
              <Route path="approvals" element={<AdminApprovals />} />
              <Route path="audit" element={<AdminAuditLog />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="site-settings" element={<AdminSiteSettings />} />
              <Route path="presentations" element={<AdminPresentations />} />
              <Route path="chat" element={<AdminChat />} />
              <Route path="scripted-dialogs" element={<AdminScriptedDialogs />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </EarlyAccessModalProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;