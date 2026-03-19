import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Lazy load all page components
const Layout = lazy(() => import("./components/Layout").then(m => ({ default: m.Layout })));
const Dashboard = lazy(() => import("./pages/Dashboard").then(m => ({ default: m.Dashboard })));
const MapPage = lazy(() => import("./pages/MapPage").then(m => ({ default: m.MapPage })));
const BuildingsPage = lazy(() => import("./pages/BuildingsPage").then(m => ({ default: m.BuildingsPage })));
const EventModePage = lazy(() => import("./pages/EventModePage").then(m => ({ default: m.EventModePage })));
const EmergencyPage = lazy(() => import("./pages/EmergencyPage").then(m => ({ default: m.EmergencyPage })));
const AboutPage = lazy(() => import("./pages/AboutPage").then(m => ({ default: m.AboutPage })));
const LoginPage = lazy(() => import("./pages/LoginPage").then(m => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import("./pages/SignupPage").then(m => ({ default: m.SignupPage })));
const RedirectToLogin = lazy(() => import("./pages/RedirectToLogin").then(m => ({ default: m.RedirectToLogin })));
const NotFound = lazy(() => import("./pages/NotFound").then(m => ({ default: m.NotFound })));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout").then(m => ({ default: m.AdminLayout })));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard").then(m => ({ default: m.AdminDashboard })));
const ManageBuildings = lazy(() => import("./pages/admin/ManageBuildings").then(m => ({ default: m.ManageBuildings })));
const ManageEvents = lazy(() => import("./pages/admin/ManageEvents").then(m => ({ default: m.ManageEvents })));
const EmergencyLocations = lazy(() => import("./pages/admin/EmergencyLocations").then(m => ({ default: m.EmergencyLocations })));
const MapMarkerControl = lazy(() => import("./pages/admin/MapMarkerControl").then(m => ({ default: m.MapMarkerControl })));
const UserManagement = lazy(() => import("./pages/admin/UserManagement").then(m => ({ default: m.UserManagement })));
const Settings = lazy(() => import("./pages/admin/Settings").then(m => ({ default: m.Settings })));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RedirectToLogin,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute allowedRole="student">
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Dashboard },
      { path: "map", Component: MapPage },
      { path: "buildings", Component: BuildingsPage },
      { path: "event-mode", Component: EventModePage },
      { path: "emergency", Component: EmergencyPage },
      { path: "about", Component: AboutPage },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRole="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: AdminDashboard },
      { path: "buildings", Component: ManageBuildings },
      { path: "events", Component: ManageEvents },
      { path: "emergency", Component: EmergencyLocations },
      { path: "markers", Component: MapMarkerControl },
      { path: "users", Component: UserManagement },
      { path: "settings", Component: Settings },
    ],
  },
  { path: "*", Component: NotFound },
]);