
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Car,
  Users,
  FileCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Veículos",
      href: "/admin/vehicles",
      icon: Car,
    },
    {
      name: "Usuários",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Verificação de Documentos",
      href: "/admin/documents",
      icon: FileCheck,
    },
    {
      name: "Configurações",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header/Logo */}
      <div className="flex items-center h-16 px-4 border-b border-gray-200">
        {!collapsed && (
          <Link to="/admin" className="flex items-center">
            <span className="font-bold text-xl text-primary">LeilãoAuto</span>
          </Link>
        )}
        {collapsed && (
          <div className="mx-auto">
            <Link to="/admin">
              <span className="font-bold text-xl text-primary">LA</span>
            </Link>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center px-2 py-2 rounded-md transition-colors",
              isActive(item.href)
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <item.icon
              size={20}
              className={cn(
                "flex-shrink-0",
                collapsed ? "mx-auto" : "mr-3"
              )}
            />
            {!collapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="mb-5 mx-auto text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        onClick={toggleSidebar}
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </Button>
    </aside>
  );
};

export default AdminSidebar;
