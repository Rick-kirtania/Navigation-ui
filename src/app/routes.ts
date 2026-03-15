import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { MapPage } from "./pages/MapPage";
import { BuildingsPage } from "./pages/BuildingsPage";
import { EventModePage } from "./pages/EventModePage";
import { EmergencyPage } from "./pages/EmergencyPage";
import { AboutPage } from "./pages/AboutPage";
import { NotFound } from "./pages/NotFound";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { ManageBuildings } from "./pages/admin/ManageBuildings";
import { ManageEvents } from "./pages/admin/ManageEvents";
import { EmergencyLocations } from "./pages/admin/EmergencyLocations";
import { MapMarkerControl } from "./pages/admin/MapMarkerControl";
import { UserManagement } from "./pages/admin/UserManagement";
import { Settings } from "./pages/admin/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
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
    Component: AdminLayout,
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