
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Senhas não conferem",
        description: "Por favor, verifique se as senhas digitadas são iguais.",
        variant: "destructive",
      });
      return;
    }
    
    if (!acceptTerms) {
      toast({
        title: "Termos não aceitos",
        description: "Você precisa aceitar os termos de uso para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      await register(name, email, password);
      
      toast({
        title: "Cadastro realizado com sucesso",
        description: "Agora você precisa enviar seus documentos para verificação.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        title: "Erro ao realizar cadastro",
        description: "Verifique os dados informados e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white shadow rounded-sm p-8 text-center">
          <h1 className="text-2xl font-bold text-vip-blue mb-2">Criar conta</h1>
          <p className="text-gray-600 text-sm mb-6">
            Cadastre-se para participar dos leilões de veículos
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left">
              <Input
                id="name"
                type="text"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="vip-input"
              />
            </div>
            
            <div className="text-left">
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
            
            <div className="text-left">
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
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
            
            <div className="text-left">
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmar senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="vip-input pr-10"
                />
                <button
                  type="button"
                  onClick={toggleShowConfirmPassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-start text-left">
              <div className="flex items-center h-5">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(!!checked)}
                  className="h-4 w-4 border-gray-300"
                />
              </div>
              <Label htmlFor="terms" className="ml-2 text-xs text-gray-600">
                Eu concordo com os{" "}
                <Link to="/terms" className="text-vip-blue hover:underline">
                  Termos de Uso
                </Link>{" "}
                e{" "}
                <Link to="/privacy" className="text-vip-blue hover:underline">
                  Política de Privacidade
                </Link>
              </Label>
            </div>
            
            <button
              type="submit"
              className="w-full bg-vip-blue text-white py-3 font-bold text-sm uppercase rounded-sm hover:bg-vip-blue/90"
              disabled={isLoading}
            >
              {isLoading ? "Cadastrando..." : "Criar conta"}
            </button>
          </form>
          
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-vip-blue hover:underline font-medium">
                Faça login
              </Link>
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              Importante: Após o cadastro, você precisará enviar documentos (RG, CNH e comprovante de residência) 
              para verificação antes de poder dar lances nos leilões.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
