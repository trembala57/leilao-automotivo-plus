
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo de volta!",
      });
      
      // Redirect based on the email
      if (email.includes('admin')) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white shadow rounded-sm p-8 text-center">
          <h1 className="text-2xl font-bold text-vip-blue mb-2">Já tenho cadastro</h1>
          <p className="text-gray-600 text-sm mb-6">
            Você também pode usar seu e-mail e senha do site www.leilaovip.com.br
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left">
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="vip-input"
                />
              </div>
            </div>
            
            <div className="text-left">
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="vip-input pr-10"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                  className="mr-2 h-4 w-4 border-gray-300"
                />
                <Label htmlFor="remember" className="text-xs text-gray-600">
                  Mantenha-me conectado
                </Label>
              </div>
              
              <Link to="/forgot-password" className="text-vip-blue text-xs hover:underline">
                Esqueceu seu e-mail ou senha?
              </Link>
            </div>
            
            <button
              type="submit"
              className="w-full bg-vip-dark text-white py-3 font-bold text-sm uppercase rounded-sm hover:bg-vip-dark/90"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>
          
          <div className="mt-6">
            <button
              onClick={() => navigate('/register')}
              className="w-full bg-vip-blue text-white py-3 font-bold text-sm uppercase rounded-sm hover:bg-vip-blue/90"
            >
              Não é cadastrado? Cadastre-se
            </button>
            <p className="text-xs text-gray-500 mt-2">
              (você será direcionado ao site de cadastro do Grupo Vip Leilões)
            </p>
          </div>
          
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>
              Para fins de demonstração:<br />
              - Use qualquer email com "admin" para acessar o painel admin<br />
              - Qualquer outro email para acessar como usuário normal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
