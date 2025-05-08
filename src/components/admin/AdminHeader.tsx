
import { Bell, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 py-3 px-6">
      <div className="flex items-center justify-between">
        <div className="flex-1"></div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full"
          >
            <Bell size={18} />
            <span className="sr-only">Notificações</span>
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full"
          >
            <Settings size={18} />
            <span className="sr-only">Configurações</span>
          </Button>
          <div className="border-l pl-4 border-gray-200">
            <div className="flex items-center">
              <div className="bg-gray-200 h-8 w-8 rounded-full flex items-center justify-center">
                <span className="font-medium text-sm">{user?.name.charAt(0)}</span>
              </div>
              <div className="ml-2 hidden md:block">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                className="ml-2"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span className="sr-only">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
