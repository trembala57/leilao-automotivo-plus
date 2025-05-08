
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Download, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const isMobile = useIsMobile();

  const menuLinks = [
    { name: "Quem Somos", path: "/quem-somos" },
    { name: "Agenda", path: "/agenda" },
    { name: "Como Comprar", path: "/como-comprar" },
    { name: "Serviços", path: "/servicos" },
    { name: "Quero Vender", path: "/quero-vender" },
    { name: "Blog", path: "/blog" },
    { name: "Fale Conosco", path: "/fale-conosco" },
    { name: "Trabalhe Conosco", path: "/trabalhe-conosco" },
  ];

  return (
    <header className="w-full">
      {/* Top navigation bar - visible on all screens */}
      <nav className="bg-white py-2 px-4 border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-bold text-2xl text-primary">
              Leilão<span className="text-accent">Auto</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              {menuLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link to="/login">
              <Button className="bg-primary text-white hover:bg-primary-light">
                <User size={16} className="mr-1" /> Entrar | Cadastrar
              </Button>
            </Link>
            <Link to="/app">
              <Button className="bg-accent text-white hover:bg-accent-light">
                <Download size={16} className="mr-1" /> Baixe o Aplicativo
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white py-4 px-4 absolute top-16 left-0 right-0 z-50 shadow-lg">
          <div className="flex flex-col space-y-4">
            {menuLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-2 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-gray-200 flex flex-col space-y-2">
              <Link
                to="/login"
                className="w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="w-full bg-primary text-white hover:bg-primary-light">
                  <User size={16} className="mr-1" /> Entrar | Cadastrar
                </Button>
              </Link>
              <Link
                to="/app"
                className="w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="w-full bg-accent text-white hover:bg-accent-light">
                  <Download size={16} className="mr-1" /> Baixe o Aplicativo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
