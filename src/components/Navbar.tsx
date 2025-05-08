
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  return (
    <nav className="bg-primary py-3 px-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-white font-bold text-2xl">LeilãoAuto</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-accent">
            Home
          </Link>
          <Link to="/auctions" className="text-white hover:text-accent">
            Leilões
          </Link>
          <Link to="/how-it-works" className="text-white hover:text-accent">
            Como Funciona
          </Link>
          <Link to="/contact" className="text-white hover:text-accent">
            Contato
          </Link>
        </div>

        {/* Search and Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Buscar veículos..."
              className="pl-8 w-64 bg-white/10 border-0 text-white placeholder:text-gray-300 focus:ring-accent"
            />
          </div>
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/20">
                <User size={18} className="mr-2" /> Minha Conta
              </Button>
            </Link>
          ) : (
            <div className="flex space-x-2">
              <Link to="/login">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/20">
                  Entrar
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-accent hover:bg-accent/90 text-white">Cadastre-se</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary-dark py-4 px-4 absolute top-16 left-0 right-0 z-50 shadow-lg">
          <div className="flex flex-col space-y-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Buscar veículos..."
                className="pl-10 w-full bg-white/10 border-0 text-white placeholder:text-gray-300"
              />
            </div>
            <Link 
              to="/" 
              className="px-2 py-2 text-white hover:bg-white/10 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/auctions" 
              className="px-2 py-2 text-white hover:bg-white/10 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Leilões
            </Link>
            <Link 
              to="/how-it-works" 
              className="px-2 py-2 text-white hover:bg-white/10 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Como Funciona
            </Link>
            <Link 
              to="/contact" 
              className="px-2 py-2 text-white hover:bg-white/10 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="w-full bg-accent hover:bg-accent/90">
                  <User size={18} className="mr-2" /> Minha Conta
                </Button>
              </Link>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full bg-transparent border-white text-white hover:bg-white/20">
                    Entrar
                  </Button>
                </Link>
                <Link
                  to="/register"
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full bg-accent hover:bg-accent/90">Cadastre-se</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
