
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Car, Plus, Search, Upload, Link, AlertCircle, FileText } from "lucide-react";
import { VehicleAuction } from "@/components/auction/AuctionCard";
import { formatCurrency } from "@/lib/format";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";

const AdminVehicles = () => {
  const { toast } = useToast();
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);
  const [batchProgress, setBatchProgress] = useState(0);
  const [processedCount, setProcessedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Mock vehicles data
  const [vehicles, setVehicles] = useState<VehicleAuction[]>([
    {
      id: "1",
      title: "Honda Civic Touring 2022",
      make: "Honda",
      model: "Civic",
      year: 2022,
      imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop",
      currentBid: 98500,
      minBidIncrement: 500,
      endTime: new Date(Date.now() + 3600000 * 24 * 2).toISOString(), // 2 days from now
      status: "active",
      bidsCount: 12,
    },
    {
      id: "2",
      title: "Jeep Compass Limited 2021",
      make: "Jeep",
      model: "Compass",
      year: 2021,
      imageUrl: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?q=80&w=1000&auto=format&fit=crop",
      currentBid: 120000,
      minBidIncrement: 1000,
      endTime: new Date(Date.now() + 3600000 * 5).toISOString(), // 5 hours from now
      status: "active",
      bidsCount: 23,
    },
    {
      id: "3",
      title: "Volkswagen Golf GTI 2020",
      make: "Volkswagen",
      model: "Golf GTI",
      year: 2020,
      imageUrl: "https://images.unsplash.com/photo-1517994112540-009c47ea476b?q=80&w=1000&auto=format&fit=crop",
      currentBid: 85000,
      minBidIncrement: 500,
      endTime: new Date(Date.now() + 3600000 * 48).toISOString(), // 48 hours from now
      status: "active",
      bidsCount: 8,
    },
    {
      id: "5",
      title: "Toyota Corolla XEi 2021",
      make: "Toyota",
      model: "Corolla",
      year: 2021,
      imageUrl: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=1000&auto=format&fit=crop",
      currentBid: 94000,
      minBidIncrement: 500,
      endTime: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
      status: "ended",
      bidsCount: 32,
    },
    {
      id: "6",
      title: "Ford Ranger XLT 2022",
      make: "Ford",
      model: "Ranger",
      year: 2022,
      imageUrl: "https://images.unsplash.com/photo-1605893477799-b99e3b8b93eb?q=80&w=1000&auto=format&fit=crop",
      currentBid: 170000,
      minBidIncrement: 1000,
      endTime: new Date(Date.now() + 3600000 * 24 * 7).toISOString(), // 7 days from now
      status: "scheduled",
      bidsCount: 0,
    },
  ]);
  
  const [activeVehicles, endedVehicles, scheduledVehicles] = [
    vehicles.filter(v => v.status === "active"),
    vehicles.filter(v => v.status === "ended"),
    vehicles.filter(v => v.status === "scheduled"),
  ];
  
  // Form state for adding a new vehicle
  const [newVehicle, setNewVehicle] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    startingBid: 0,
    minBidIncrement: 500,
    description: "",
    imageUrl: "",
    auctionType: "standard",
    endTime: "",
  });
  
  // Batch processing state
  const [batchUrls, setBatchUrls] = useState("");
  const [useAI, setUseAI] = useState(true);
  
  const handleBatchProcess = () => {
    // Get URLs from textarea
    const urls = batchUrls.split('\n').filter(url => url.trim() !== '');
    
    if (urls.length === 0) {
      toast({
        title: "Nenhuma URL fornecida",
        description: "Por favor, insira pelo menos uma URL de leilão.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessingBatch(true);
    setBatchProgress(0);
    setProcessedCount(0);
    setFailedCount(0);
    
    // Process URLs with delay to show progress
    const totalUrls = urls.length;
    let processed = 0;
    let failed = 0;
    
    toast({
      title: "Processamento iniciado",
      description: `Processando ${totalUrls} URLs de leilões`,
    });
    
    // Mock batch processing with progress
    const processNext = (index: number) => {
      if (index >= urls.length) {
        // All URLs processed
        setIsProcessingBatch(false);
        setBatchProgress(100);
        
        toast({
          title: "Processamento concluído",
          description: `${processedCount} veículos adicionados, ${failedCount} falhas`,
        });
        
        setBatchUrls("");
        return;
      }
      
      const currentUrl = urls[index];
      
      // Simulate AI processing
      setTimeout(() => {
        try {
          // Mock successful extraction 90% of the time
          const success = Math.random() > 0.1;
          
          if (success) {
            // Generate a mock vehicle
            const makes = ["Honda", "Toyota", "Volkswagen", "BMW", "Ford", "Jeep"];
            const models = ["Civic", "Corolla", "Golf", "X3", "Focus", "Compass"];
            
            const randomMake = makes[Math.floor(Math.random() * makes.length)];
            const randomModel = models[Math.floor(Math.random() * models.length)];
            const randomYear = 2018 + Math.floor(Math.random() * 6);
            const randomPrice = 50000 + Math.floor(Math.random() * 100000);
            
            // Create new vehicle
            const newId = (vehicles.length + 1).toString();
            const mockVehicle: VehicleAuction = {
              id: newId,
              title: `${randomMake} ${randomModel} ${randomYear}`,
              make: randomMake,
              model: randomModel,
              year: randomYear,
              imageUrl: `https://source.unsplash.com/featured/?car,${randomMake}${randomModel}`,
              currentBid: randomPrice,
              minBidIncrement: 1000,
              endTime: new Date(Date.now() + 3600000 * 24 * (7 + Math.floor(Math.random() * 14))).toISOString(),
              status: "scheduled",
              bidsCount: 0,
            };
            
            setVehicles(prev => [...prev, mockVehicle]);
            processed++;
            setProcessedCount(processed);
          } else {
            failed++;
            setFailedCount(failed);
            console.error(`Falha ao processar: ${currentUrl}`);
          }
          
          // Update progress
          const progress = ((index + 1) / totalUrls) * 100;
          setBatchProgress(progress);
          
          // Process next URL
          processNext(index + 1);
        } catch (error) {
          console.error("Erro ao processar URL:", currentUrl, error);
          failed++;
          setFailedCount(failed);
          
          // Continue with next URL
          processNext(index + 1);
        }
      }, 200); // Small delay to visualize progress
    };
    
    // Start processing
    processNext(0);
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      // Assume each line contains a URL
      setBatchUrls(content);
      
      toast({
        title: "Arquivo carregado",
        description: `${content.split('\n').filter(url => url.trim()).length} URLs encontradas`,
      });
    };
    reader.readAsText(file);
  };
  
  // Quick add vehicle by URL state
  const [quickAddUrl, setQuickAddUrl] = useState("");
  
  const handleQuickAdd = () => {
    // Simulate fetching vehicle data from URL
    toast({
      title: "Processando URL",
      description: "Buscando informações do veículo...",
    });
    
    // Mock successful processing after a delay
    setTimeout(() => {
      setQuickAddUrl("");
      toast({
        title: "Veículo adicionado com sucesso",
        description: "Os dados do veículo foram importados e o leilão foi configurado.",
      });
      
      // Add mock vehicle to the list
      const newId = (vehicles.length + 1).toString();
      const mockVehicle: VehicleAuction = {
        id: newId,
        title: "Fiat Toro Freedom 2023",
        make: "Fiat",
        model: "Toro",
        year: 2023,
        imageUrl: "https://images.unsplash.com/photo-1591293835940-934a7c4bae1d?q=80&w=1000&auto=format&fit=crop",
        currentBid: 105000,
        minBidIncrement: 1000,
        endTime: new Date(Date.now() + 3600000 * 24 * 10).toISOString(), // 10 days from now
        status: "scheduled",
        bidsCount: 0,
      };
      
      setVehicles([...vehicles, mockVehicle]);
    }, 2000);
  };
  
  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingVehicle(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create new vehicle object
      const newId = (vehicles.length + 1).toString();
      const newVehicleObj: VehicleAuction = {
        id: newId,
        title: `${newVehicle.make} ${newVehicle.model} ${newVehicle.year}`,
        make: newVehicle.make,
        model: newVehicle.model,
        year: newVehicle.year,
        imageUrl: newVehicle.imageUrl || "https://images.unsplash.com/photo-1597007029837-50acbf742405?q=80&w=1000&auto=format&fit=crop",
        currentBid: newVehicle.startingBid,
        minBidIncrement: newVehicle.minBidIncrement,
        endTime: newVehicle.endTime || new Date(Date.now() + 3600000 * 24 * 7).toISOString(),
        status: "scheduled",
        bidsCount: 0,
      };
      
      // Add to vehicles list
      setVehicles([...vehicles, newVehicleObj]);
      
      // Reset form
      setNewVehicle({
        make: "",
        model: "",
        year: new Date().getFullYear(),
        startingBid: 0,
        minBidIncrement: 500,
        description: "",
        imageUrl: "",
        auctionType: "standard",
        endTime: "",
      });
      
      setIsAddingVehicle(false);
      
      toast({
        title: "Veículo adicionado com sucesso",
        description: "O veículo foi adicionado e o leilão foi agendado.",
      });
    }, 1500);
  };

  const deleteVehicle = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
    toast({
      title: "Veículo removido",
      description: "O veículo foi removido com sucesso.",
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Gerenciamento de Veículos</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" /> Adicionar Veículo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Veículo</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes do veículo para criar um novo leilão ou importe de URLs.
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="batch">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="batch">Adição em Lote</TabsTrigger>
                  <TabsTrigger value="quick">Adição Rápida</TabsTrigger>
                  <TabsTrigger value="manual">Adição Manual</TabsTrigger>
                </TabsList>
                
                <TabsContent value="batch" className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">URLs de Leilão em Lote</Label>
                    <div className="flex items-center space-x-2 mb-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" /> Importar Lista
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept=".txt,.csv"
                        className="hidden"
                      />
                      <span className="text-sm text-gray-500">ou cole as URLs abaixo (uma por linha)</span>
                    </div>
                    <Textarea
                      placeholder="https://leilao.com/veiculo/1&#10;https://leilao.com/veiculo/2&#10;https://leilao.com/veiculo/3"
                      value={batchUrls}
                      onChange={(e) => setBatchUrls(e.target.value)}
                      rows={8}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500">
                      {batchUrls.split('\n').filter(url => url.trim() !== '').length} URLs detectadas
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="use-ai" checked={useAI} onCheckedChange={setUseAI} />
                    <Label htmlFor="use-ai" className="cursor-pointer">
                      <span className="font-medium">Utilizar IA para extração de dados</span>
                      <p className="text-xs text-gray-500">
                        A IA analisará as páginas de leilão para extrair informações automaticamente
                      </p>
                    </Label>
                  </div>
                  
                  {isProcessingBatch && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Processando leilões...</span>
                        <span className="text-sm text-gray-500">
                          {processedCount + failedCount} de {batchUrls.split('\n').filter(url => url.trim() !== '').length}
                        </span>
                      </div>
                      <Progress value={batchProgress} className="h-2" />
                      <div className="flex justify-between text-xs">
                        <span className="text-green-600">{processedCount} concluídos</span>
                        {failedCount > 0 && <span className="text-red-600">{failedCount} falhas</span>}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end gap-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setBatchUrls("")}
                      disabled={isProcessingBatch || !batchUrls.trim()}
                    >
                      Limpar
                    </Button>
                    <Button 
                      type="button" 
                      onClick={handleBatchProcess}
                      disabled={isProcessingBatch || !batchUrls.trim()}
                    >
                      {isProcessingBatch ? "Processando..." : "Processar em Lote"}
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="quick">
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label htmlFor="vehicle-url">URL do Veículo</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="vehicle-url"
                          placeholder="https://site.com/veiculo/honda-civic"
                          value={quickAddUrl}
                          onChange={(e) => setQuickAddUrl(e.target.value)}
                        />
                        <Button
                          type="button"
                          size="icon"
                          onClick={() => setQuickAddUrl("")}
                        >
                          <Search className="h-4 w-4" />
                          <span className="sr-only">Buscar</span>
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Cole o URL de um site de veículos para importar automaticamente os dados.
                      </p>
                    </div>
                    
                    <Button 
                      type="button" 
                      className="w-full"
                      disabled={!quickAddUrl}
                      onClick={handleQuickAdd}
                    >
                      Importar e Adicionar
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="manual">
                  <form onSubmit={handleManualAdd}>
                    <div className="grid gap-4 py-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="make">Marca</Label>
                          <Select 
                            value={newVehicle.make} 
                            onValueChange={(value) => setNewVehicle({...newVehicle, make: value})}
                            required
                          >
                            <SelectTrigger id="make">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {["Honda", "Toyota", "Volkswagen", "BMW", "Ford", "Jeep", "Chevrolet", "Hyundai", "Fiat"].map((make) => (
                                  <SelectItem key={make} value={make}>{make}</SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="model">Modelo</Label>
                          <Input
                            id="model"
                            placeholder="Civic"
                            value={newVehicle.model}
                            onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="year">Ano</Label>
                          <Input
                            id="year"
                            type="number"
                            min="1990"
                            max={new Date().getFullYear() + 1}
                            value={newVehicle.year}
                            onChange={(e) => setNewVehicle({...newVehicle, year: Number(e.target.value)})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="starting-bid">Lance Inicial (R$)</Label>
                          <Input
                            id="starting-bid"
                            type="number"
                            min="0"
                            step="100"
                            value={newVehicle.startingBid}
                            onChange={(e) => setNewVehicle({...newVehicle, startingBid: Number(e.target.value)})}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="image-url">URL da Imagem</Label>
                        <Input
                          id="image-url"
                          placeholder="https://example.com/image.jpg"
                          value={newVehicle.imageUrl}
                          onChange={(e) => setNewVehicle({...newVehicle, imageUrl: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Descrição</Label>
                        <Input
                          id="description"
                          placeholder="Veículo em excelente estado..."
                          value={newVehicle.description}
                          onChange={(e) => setNewVehicle({...newVehicle, description: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="auction-type">Tipo de Leilão</Label>
                          <Select 
                            value={newVehicle.auctionType} 
                            onValueChange={(value) => setNewVehicle({...newVehicle, auctionType: value})}
                          >
                            <SelectTrigger id="auction-type">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="standard">Padrão</SelectItem>
                                <SelectItem value="flash">Flash</SelectItem>
                                <SelectItem value="scheduled">Agendado</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="end-time">Data de Término</Label>
                          <Input
                            id="end-time"
                            type="datetime-local"
                            value={newVehicle.endTime}
                            onChange={(e) => setNewVehicle({...newVehicle, endTime: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <DialogFooter className="mt-6">
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isAddingVehicle || !newVehicle.make || !newVehicle.model}
                      >
                        {isAddingVehicle ? "Adicionando..." : "Adicionar Veículo"}
                      </Button>
                    </DialogFooter>
                  </form>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
          
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input className="pl-8 w-full" placeholder="Buscar veículos..." />
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Todos ({vehicles.length})</TabsTrigger>
          <TabsTrigger value="active">Ativos ({activeVehicles.length})</TabsTrigger>
          <TabsTrigger value="scheduled">Agendados ({scheduledVehicles.length})</TabsTrigger>
          <TabsTrigger value="ended">Encerrados ({endedVehicles.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="bg-white rounded-md shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Veículo</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lance Atual</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lances</th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 mr-3 flex-shrink-0">
                          {vehicle.imageUrl ? (
                            <img
                              src={vehicle.imageUrl}
                              alt={vehicle.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Car className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{vehicle.title}</div>
                          <div className="text-sm text-gray-500">{vehicle.year}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
                        vehicle.status === "active" ? "bg-green-100 text-green-800" :
                        vehicle.status === "scheduled" ? "bg-blue-100 text-blue-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {vehicle.status === "active" ? "Ativo" :
                         vehicle.status === "scheduled" ? "Agendado" :
                         "Encerrado"}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {formatCurrency(vehicle.currentBid)}
                    </td>
                    <td className="py-3 px-4">
                      {vehicle.bidsCount}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">Editar</Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => deleteVehicle(vehicle.id)}
                        >
                          Excluir
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="active" className="space-y-4">
          {/* Similar table as above but filtered for active auctions */}
          <div className="bg-white rounded-md shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Veículo</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lance Atual</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lances</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tempo Restante</th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {activeVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 mr-3 flex-shrink-0">
                          {vehicle.imageUrl ? (
                            <img
                              src={vehicle.imageUrl}
                              alt={vehicle.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Car className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{vehicle.title}</div>
                          <div className="text-sm text-gray-500">{vehicle.year}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {formatCurrency(vehicle.currentBid)}
                    </td>
                    <td className="py-3 px-4">
                      {vehicle.bidsCount}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm">
                        {new Date(vehicle.endTime) > new Date() ? (
                          <>
                            {Math.floor((new Date(vehicle.endTime).getTime() - new Date().getTime()) / (1000 * 60 * 60))} horas
                          </>
                        ) : (
                          "Encerrado"
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">Editar</Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => deleteVehicle(vehicle.id)}
                        >
                          Encerrar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="scheduled" className="space-y-4">
          {/* Scheduled auctions */}
          <div className="bg-white rounded-md shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Veículo</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lance Inicial</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Início</th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {scheduledVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 mr-3 flex-shrink-0">
                          {vehicle.imageUrl ? (
                            <img
                              src={vehicle.imageUrl}
                              alt={vehicle.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Car className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{vehicle.title}</div>
                          <div className="text-sm text-gray-500">{vehicle.year}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {formatCurrency(vehicle.currentBid)}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(vehicle.endTime).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">Editar</Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-green-500 hover:text-green-600 hover:bg-green-50"
                        >
                          Iniciar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => deleteVehicle(vehicle.id)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="ended" className="space-y-4">
          {/* Ended auctions */}
          <div className="bg-white rounded-md shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Veículo</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Final</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lances</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Encerramento</th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {endedVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 mr-3 flex-shrink-0">
                          {vehicle.imageUrl ? (
                            <img
                              src={vehicle.imageUrl}
                              alt={vehicle.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Car className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{vehicle.title}</div>
                          <div className="text-sm text-gray-500">{vehicle.year}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {formatCurrency(vehicle.currentBid)}
                    </td>
                    <td className="py-3 px-4">
                      {vehicle.bidsCount}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(vehicle.endTime).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">Detalhes</Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                        >
                          Reabrir
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminVehicles;
