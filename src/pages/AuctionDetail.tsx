
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VehicleAuction } from "@/components/auction/AuctionCard";
import { getAuctionById, submitBid, getAuctionBids, acceptBid, rejectBid, sendPixKeyToWinner, Bid } from "@/services/auctionService";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { Car, Clock, FileText, AlertTriangle, Check, X, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";
import AuctionTimer from "@/components/auction/AuctionTimer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";

const AuctionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [auction, setAuction] = useState<VehicleAuction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bids, setBids] = useState<Bid[]>([]);
  const [bidAmount, setBidAmount] = useState<string>("");
  const [isSubmittingBid, setIsSubmittingBid] = useState(false);
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  const [pixKey, setPixKey] = useState<string>("");
  const [isPixDialogOpen, setIsPixDialogOpen] = useState(false);
  const [isProcessingAction, setIsProcessingAction] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const fetchAuction = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const data = await getAuctionById(id);
        if (data) {
          setAuction(data);
          // Set initial bid amount to current bid + increment
          setBidAmount(String(data.currentBid + data.minBidIncrement));
          
          // Fetch bids for this auction
          const auctionBids = await getAuctionBids(id);
          setBids(auctionBids);
        }
      } catch (error) {
        console.error("Error fetching auction:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os detalhes do leilão.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuction();
  }, [id, toast]);

  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Não autenticado",
        description: "Você precisa estar logado para dar lances.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    if (!user?.isVerified) {
      toast({
        title: "Documentos não verificados",
        description: "Sua documentação precisa ser verificada antes de dar lances.",
        variant: "destructive",
      });
      navigate("/dashboard");
      return;
    }

    if (!auction || !bidAmount) return;

    try {
      setIsSubmittingBid(true);
      const bidValue = parseFloat(bidAmount);
      const result = await submitBid(auction.id, bidValue);
      
      if (result.success) {
        toast({
          title: "Lance registrado",
          description: result.message,
        });
        
        // Update auction data with new bid
        setAuction(prev => {
          if (!prev) return null;
          return {
            ...prev,
            currentBid: bidValue,
            bidsCount: prev.bidsCount + 1,
          };
        });
        
        // Refresh bids
        const updatedBids = await getAuctionBids(auction.id);
        setBids(updatedBids);
        
        // Set new bid amount
        setBidAmount(String(bidValue + auction.minBidIncrement));
      } else {
        toast({
          title: "Erro ao registrar lance",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting bid:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar seu lance. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingBid(false);
    }
  };

  const handleAcceptBid = async (bidId: string) => {
    if (!id) return;
    
    try {
      setIsProcessingAction(true);
      const result = await acceptBid(id, bidId);
      
      if (result.success) {
        sonnerToast.success(result.message);
        
        // Refresh bids and auction data
        const updatedBids = await getAuctionBids(id);
        setBids(updatedBids);
        
        const updatedAuction = await getAuctionById(id);
        setAuction(updatedAuction || null);
        
        // Find the accepted bid to show the PIX dialog
        const acceptedBid = updatedBids.find(bid => bid.id === bidId);
        if (acceptedBid) {
          setSelectedBid(acceptedBid);
          setIsPixDialogOpen(true);
        }
      } else {
        sonnerToast.error(result.message);
      }
    } catch (error) {
      console.error("Error accepting bid:", error);
      sonnerToast.error("Ocorreu um erro ao aceitar o lance. Tente novamente.");
    } finally {
      setIsProcessingAction(false);
    }
  };

  const handleRejectBid = async (bidId: string) => {
    if (!id) return;
    
    try {
      setIsProcessingAction(true);
      const result = await rejectBid(id, bidId);
      
      if (result.success) {
        sonnerToast.success(result.message);
        
        // Refresh bids
        const updatedBids = await getAuctionBids(id);
        setBids(updatedBids);
      } else {
        sonnerToast.error(result.message);
      }
    } catch (error) {
      console.error("Error rejecting bid:", error);
      sonnerToast.error("Ocorreu um erro ao rejeitar o lance. Tente novamente.");
    } finally {
      setIsProcessingAction(false);
    }
  };

  const handleSendPixKey = async () => {
    if (!id || !selectedBid || !pixKey.trim()) return;
    
    try {
      setIsProcessingAction(true);
      const result = await sendPixKeyToWinner(id, selectedBid.id, pixKey);
      
      if (result.success) {
        sonnerToast.success(result.message);
        setIsPixDialogOpen(false);
        setPixKey("");
      } else {
        sonnerToast.error(result.message);
      }
    } catch (error) {
      console.error("Error sending PIX key:", error);
      sonnerToast.error("Ocorreu um erro ao enviar a chave PIX. Tente novamente.");
    } finally {
      setIsProcessingAction(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Leilão não encontrado</h2>
          <p className="text-gray-500 mb-4">O leilão que você está procurando não existe ou foi removido.</p>
          <Button onClick={() => navigate("/auctions")}>Ver todos os leilões</Button>
        </div>
      </div>
    );
  }

  const isAuctionActive = auction.status === "active";
  const minBidValue = auction.currentBid + auction.minBidIncrement;
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Images and Details */}
          <div className="flex-1">
            {/* Image */}
            <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
              <img
                src={auction.imageUrl}
                alt={auction.title}
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-2">{auction.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  auction.status === "active" ? "bg-green-100 text-green-800" :
                  auction.status === "scheduled" ? "bg-blue-100 text-blue-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {auction.status === "active" ? "Ativo" :
                   auction.status === "scheduled" ? "Agendado" :
                   "Encerrado"}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Detalhes do Veículo</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Car className="h-5 w-5 mr-2 text-gray-500" />
                      <div>
                        <span className="text-sm text-gray-500">Marca/Modelo</span>
                        <p className="font-medium">{auction.make} {auction.model}</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 mr-2 text-gray-500" />
                      <div>
                        <span className="text-sm text-gray-500">Ano</span>
                        <p className="font-medium">{auction.year}</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Informações do Leilão</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 mr-2 text-gray-500" />
                      <div>
                        <span className="text-sm text-gray-500">Encerramento</span>
                        <p className="font-medium">{formatDateTime(auction.endTime)}</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 mr-2 text-gray-500" />
                      <div>
                        <span className="text-sm text-gray-500">Lances</span>
                        <p className="font-medium">{auction.bidsCount} lances</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="info">Descrição</TabsTrigger>
                  <TabsTrigger value="terms">Condições</TabsTrigger>
                  {isAdmin && <TabsTrigger value="bids">Gerenciar Lances</TabsTrigger>}
                </TabsList>
                
                <TabsContent value="info">
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Descrição</h3>
                    <p className="text-gray-700">
                      Este {auction.make} {auction.model} {auction.year} está em excelente estado de conservação.
                      Veículo completo, com baixa quilometragem e revisões em dia.
                      Documentação em perfeita ordem, pronto para transferência.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="terms">
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Condições do Leilão</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>O comprador deve realizar a transferência em até 30 dias após o arremate.</li>
                      <li>Pagamento via PIX, Transferência bancária ou financiamento.</li>
                      <li>O veículo será entregue após a confirmação do pagamento.</li>
                      <li>Para mais detalhes, consulte o edital completo do leilão.</li>
                    </ul>
                  </div>
                </TabsContent>
                
                {isAdmin && (
                  <TabsContent value="bids">
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4">Gerenciamento de Lances</h3>
                      
                      {bids.length === 0 ? (
                        <p className="text-gray-500 italic">Nenhum lance registrado para este leilão.</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Usuário</th>
                                <th className="px-4 py-2 text-right">Valor</th>
                                <th className="px-4 py-2 text-left">Data/Hora</th>
                                <th className="px-4 py-2 text-center">Status</th>
                                <th className="px-4 py-2 text-center">Ações</th>
                              </tr>
                            </thead>
                            <tbody>
                              {bids.map((bid) => (
                                <tr key={bid.id} className="border-b hover:bg-gray-50">
                                  <td className="px-4 py-3">
                                    <div>
                                      <p className="font-medium">{bid.userInfo?.name}</p>
                                      <p className="text-xs text-gray-500">{bid.userInfo?.email}</p>
                                      {bid.userInfo?.phone && <p className="text-xs text-gray-500">{bid.userInfo.phone}</p>}
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-right font-medium">{formatCurrency(bid.amount)}</td>
                                  <td className="px-4 py-3 text-sm">{new Date(bid.timestamp).toLocaleString('pt-BR')}</td>
                                  <td className="px-4 py-3">
                                    <div className="flex justify-center">
                                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                        bid.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                        bid.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                      }`}>
                                        {bid.status === 'accepted' ? 'Aceito' :
                                          bid.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="flex justify-center space-x-2">
                                      {bid.status === 'pending' && (
                                        <>
                                          <Button 
                                            size="sm"
                                            variant="outline" 
                                            className="text-green-600 border-green-600 hover:bg-green-50"
                                            onClick={() => handleAcceptBid(bid.id)}
                                            disabled={isProcessingAction}
                                          >
                                            <Check className="h-4 w-4 mr-1" />
                                            Aceitar
                                          </Button>
                                          <Button 
                                            size="sm"
                                            variant="outline" 
                                            className="text-red-600 border-red-600 hover:bg-red-50"
                                            onClick={() => handleRejectBid(bid.id)}
                                            disabled={isProcessingAction}
                                          >
                                            <X className="h-4 w-4 mr-1" />
                                            Rejeitar
                                          </Button>
                                        </>
                                      )}
                                      
                                      {bid.status === 'accepted' && (
                                        <Button 
                                          size="sm"
                                          variant="outline" 
                                          className="text-blue-600 border-blue-600 hover:bg-blue-50"
                                          onClick={() => {
                                            setSelectedBid(bid);
                                            setIsPixDialogOpen(true);
                                          }}
                                        >
                                          <Send className="h-4 w-4 mr-1" />
                                          Enviar PIX
                                        </Button>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </div>
          </div>

          {/* Right Column: Bid Section */}
          <div className="lg:w-80 xl:w-96">
            <Card className="sticky top-4">
              <CardContent className="pt-6">
                <div className="flex flex-col">
                  <div className="mb-4">
                    <span className="block text-sm text-gray-500 mb-1">Lance atual</span>
                    <span className="block text-3xl font-bold text-primary">
                      {formatCurrency(auction.currentBid)}
                    </span>
                  </div>
                  
                  {isAuctionActive && (
                    <div className="mb-6">
                      <AuctionTimer endTime={auction.endTime} />
                    </div>
                  )}
                  
                  {isAuctionActive ? (
                    <form onSubmit={handleBidSubmit}>
                      <div className="mb-6">
                        <Label htmlFor="bidAmount">Seu lance</Label>
                        <div className="relative mt-1">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            R$
                          </span>
                          <Input
                            id="bidAmount"
                            type="number"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            min={minBidValue}
                            step="10"
                            className="pl-9"
                            required
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Lance mínimo de {formatCurrency(minBidValue)}
                        </p>
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent/90"
                        disabled={isSubmittingBid || parseFloat(bidAmount) < minBidValue}
                      >
                        {isSubmittingBid ? "Processando..." : "Dar Lance"}
                      </Button>
                      
                      {!isAuthenticated && (
                        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-amber-700">
                              Você precisa estar logado e ter seus documentos verificados para dar lances.
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {isAuthenticated && !user?.isVerified && (
                        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-amber-700">
                              Seus documentos ainda não foram verificados. Aguarde a aprovação para dar lances.
                            </p>
                          </div>
                        </div>
                      )}
                    </form>
                  ) : (
                    <div className="p-3 bg-gray-100 rounded-lg text-center">
                      <p className="font-medium text-gray-700">
                        {auction.status === "scheduled" 
                          ? "Este leilão ainda não começou." 
                          : "Este leilão já foi encerrado."}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialog para envio da chave PIX */}
      <Dialog open={isPixDialogOpen} onOpenChange={setIsPixDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar Chave PIX ao Vencedor</DialogTitle>
            <DialogDescription>
              Informe a chave PIX que será enviada ao vencedor do leilão para realização do pagamento.
            </DialogDescription>
          </DialogHeader>
          
          {selectedBid && (
            <div className="mb-4">
              <p className="text-sm font-medium mb-1">Vencedor do leilão:</p>
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-medium">{selectedBid.userInfo?.name}</p>
                <p className="text-sm text-gray-600">{selectedBid.userInfo?.email}</p>
                {selectedBid.userInfo?.phone && <p className="text-sm text-gray-600">{selectedBid.userInfo.phone}</p>}
              </div>
              <div className="mt-2">
                <p className="text-sm font-medium">Valor do arremate: <span className="text-primary">{formatCurrency(selectedBid.amount)}</span></p>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pixKey">Chave PIX</Label>
              <Input 
                id="pixKey" 
                value={pixKey} 
                onChange={(e) => setPixKey(e.target.value)}
                placeholder="Insira a chave PIX (CPF, CNPJ, email, telefone ou chave aleatória)"
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button 
              onClick={handleSendPixKey}
              disabled={!pixKey.trim() || isProcessingAction}
            >
              {isProcessingAction ? "Enviando..." : "Enviar Chave PIX"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuctionDetail;
