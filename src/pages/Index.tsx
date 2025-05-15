
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import AuctionCard, { VehicleAuction } from "@/components/auction/AuctionCard";
import VIPAuctionCard from "@/components/auction/VIPAuctionCard";
import { getAllAuctions, filterAuctions } from "@/services/auctionService";
import { Car, Truck, Clock, Search, MessageCircle, ChevronRight, CalendarRange, Car as CarIcon } from "lucide-react";
import Banner from "@/components/Banner";

// Partner logos for the auction lots
const partnerLogos = [
  "/partnerlogos/bradesco.png",
  "/partnerlogos/itau.png",
  "/partnerlogos/santander.png",
  "/partnerlogos/caixa.png",
  "/partnerlogos/bb.png",
  "/partnerlogos/detran.png",
  "/partnerlogos/porto.png",
  "/partnerlogos/sulamerica.png",
];

const Index = () => {
  const [featuredAuctions, setFeaturedAuctions] = useState<VehicleAuction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setIsLoading(true);
        const allAuctions = await getAllAuctions();
        
        // Filter active auctions for featured
        const active = allAuctions.filter(auction => auction.status === "active");
        
        // Assign random partner logos to auctions for display
        const auctionsWithLogos = active.slice(0, 20).map((auction, index) => ({
          ...auction,
          partnerLogo: partnerLogos[index % partnerLogos.length]
        }));
        
        setFeaturedAuctions(auctionsWithLogos);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  // Filter tabs data
  const filterTabs = [
    { id: "todos", label: "TODOS" },
    { id: "carros", label: "CARROS" },
    { id: "motos", label: "MOTOS" },
    { id: "utilitarios", label: "UTILITÁRIOS" }
  ];
  
  // Categories data
  const categories = [
    { id: 1, name: "SEMINOVOS", icon: <Car className="h-5 w-5" />, link: "/auctions?category=seminovos" },
    { id: 2, name: "USADOS", icon: <Car className="h-5 w-5" />, link: "/auctions?category=usados" },
    { id: 3, name: "MOTOS", icon: <Car className="h-5 w-5" />, link: "/auctions?category=motos" },
    { id: 4, name: "SINISTRADOS", icon: <Car className="h-5 w-5" />, link: "/auctions?category=sinistrados" },
    { id: 5, name: "PESADOS", icon: <Truck className="h-5 w-5" />, link: "/auctions?category=pesados" },
    { id: 6, name: "DIVERSOS", icon: <Car className="h-5 w-5" />, link: "/auctions?category=diversos" },
    { id: 7, name: "IMÓVEIS", icon: <Car className="h-5 w-5" />, link: "/auctions?category=imoveis" },
    { id: 8, name: "JUDICIAIS", icon: <Car className="h-5 w-5" />, link: "/auctions?category=judiciais" }
  ];

  return (
    <div>
      {/* Hero Banner Carousel */}
      <Banner />

      {/* Search and Filter Section */}
      <section className="bg-white py-4 shadow-md relative -mt-5 z-20 rounded-t-xl mx-4">
        <div className="container mx-auto px-4">
          {/* Vehicle Search Form */}
          <div className="bg-gray-100 p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <CarIcon className="text-blue-700 hidden md:block" size={24} />
                <div className="w-full">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Tipo do veículo</label>
                  <Select>
                    <SelectTrigger className="text-sm h-9 bg-white">
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="carros">Carros</SelectItem>
                      <SelectItem value="motos">Motos</SelectItem>
                      <SelectItem value="caminhoes">Caminhões</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <Search className="text-blue-700 hidden md:block" size={24} />
                <div className="w-full">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Marca ou Modelo</label>
                  <Input 
                    placeholder="Pesquise por marca ou modelo" 
                    className="h-9 text-sm bg-white"
                  />
                </div>
              </div>
              
              <div className="flex items-end">
                <Button className="w-full h-9 bg-red-600 hover:bg-red-700 text-white">
                  <Search size={18} className="mr-1" /> Buscar
                </Button>
              </div>
            </div>
          </div>
          
          {/* Categories */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mt-4 text-xs">
            {categories.map(category => (
              <Link 
                key={category.id}
                to={category.link}
                className="flex flex-col items-center justify-center p-2 hover:bg-gray-50 rounded-lg transition-colors text-center"
              >
                <div className="text-blue-700 mb-1">
                  {category.icon}
                </div>
                <span className="text-gray-700 font-medium text-[10px] md:text-xs">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Auction listings section */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h2 className="text-xl font-bold">Confira nossos destaques</h2>
              <p className="text-sm text-gray-600">São mais de 777 ofertas disponíveis</p>
            </div>
            
            <div className="mt-2 md:mt-0">
              <Tabs defaultValue="todos" className="w-full">
                <TabsList className="bg-white border border-gray-200 rounded-md p-1">
                  {filterTabs.map(tab => (
                    <TabsTrigger 
                      key={tab.id} 
                      value={tab.id}
                      className="text-xs py-1 px-3 data-[state=active]:bg-blue-700 data-[state=active]:text-white"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array.from({length: 10}).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-0">
                    <Skeleton className="h-32 w-full" />
                    <div className="p-3">
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-3 w-3/4 mb-2" />
                      <Skeleton className="h-5 w-1/2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {featuredAuctions.map((auction) => (
                <div key={auction.id} className="bg-white border border-gray-200 rounded-sm overflow-hidden h-full flex flex-col">
                  {/* Card Header with Partner Logo */}
                  <div className="bg-gray-100 border-b border-gray-200 p-2 flex justify-between items-center">
                    <div className="h-6 flex items-center justify-start overflow-hidden">
                      {auction.partnerLogo && (
                        <img 
                          src={auction.partnerLogo} 
                          alt="Parceiro" 
                          className="h-5 object-contain"
                        />
                      )}
                    </div>
                    <div className="text-xs font-medium text-gray-700">
                      Lote: {auction.id.substring(0, 5)}
                    </div>
                  </div>

                  {/* Auction Image */}
                  <Link to={`/auction/${auction.id}`} className="block relative">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={auction.imageUrl || "https://placehold.co/300x200?text=No+Image"}
                        alt={auction.title}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    
                    {/* Status Badge */}
                    <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-sm">
                      Em leilão
                    </div>
                    
                    {/* Finance Badge */}
                    {Math.random() > 0.7 && (
                      <div className="absolute bottom-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase">
                        Financie
                      </div>
                    )}
                  </Link>

                  {/* Auction Details */}
                  <div className="p-3 flex flex-col h-full">
                    <Link to={`/auction/${auction.id}`} className="block">
                      <h3 className="text-sm font-bold text-blue-700 hover:underline truncate">
                        {auction.title}
                      </h3>
                    </Link>
                    
                    <div className="text-xs text-gray-600 mb-2">
                      {auction.make} {auction.model} • {auction.year}
                    </div>

                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Lance atual:</span>
                      <span className="text-sm font-bold text-blue-700">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(auction.currentBid)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Lances:</span>
                      <span className="text-xs text-gray-700">{auction.bidsCount || Math.floor(Math.random() * 15)}</span>
                    </div>
                    
                    <div className="mt-3">
                      <Link 
                        to={`/auction/${auction.id}`}
                        className="block w-full bg-gray-200 hover:bg-gray-300 text-center text-gray-700 text-xs font-medium py-1.5 rounded-sm"
                      >
                        Ver detalhes
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-6 text-center">
            <Link to="/veiculos/home">
              <Button variant="outline" className="border-blue-700 text-blue-700">
                Ver mais veículos
                <ChevronRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Current Auctions Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Leilões programados</h2>
            <Link to="/agenda" className="text-blue-700 hover:underline flex items-center text-sm">
              Ver todos <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading ? (
              Array.from({length: 4}).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-0">
                    <Skeleton className="h-40 w-full" />
                    <div className="p-3">
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-1" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <>
                <Card className="overflow-hidden border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <CalendarRange className="text-blue-700 mr-2" size={20} />
                      <h3 className="font-bold text-blue-800">Leilão Chave na Mão</h3>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">29/04/2025 às 19h15</p>
                    <p className="text-sm text-gray-600 mb-4">Chegou a hora de arrematar seu novo carro!</p>
                    <Button className="w-full bg-blue-700 hover:bg-blue-800">
                      Participar
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden border-red-200 bg-gradient-to-r from-red-50 to-red-100">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <CalendarRange className="text-red-700 mr-2" size={20} />
                      <h3 className="font-bold text-red-800">Leilão Express</h3>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">05/05/2025 às 14h00</p>
                    <p className="text-sm text-gray-600 mb-4">Oportunidades relâmpago para você!</p>
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      Participar
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden border-green-200 bg-gradient-to-r from-green-50 to-green-100">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <CalendarRange className="text-green-700 mr-2" size={20} />
                      <h3 className="font-bold text-green-800">Leilão Premium</h3>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">12/05/2025 às 19h30</p>
                    <p className="text-sm text-gray-600 mb-4">Veículos exclusivos e de alto padrão!</p>
                    <Button className="w-full bg-green-700 hover:bg-green-800">
                      Participar
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <CalendarRange className="text-purple-700 mr-2" size={20} />
                      <h3 className="font-bold text-purple-800">Leilão de Motos</h3>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">18/05/2025 às 15h00</p>
                    <p className="text-sm text-gray-600 mb-4">As melhores motos estão aqui!</p>
                    <Button className="w-full bg-purple-700 hover:bg-purple-800">
                      Participar
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-8 text-center">Por que escolher a VIP Leilões?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Transparência</h3>
              <p className="text-sm text-gray-600">
                Todas as informações sobre os veículos são verificadas e disponibilizadas com clareza.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Facilidade</h3>
              <p className="text-sm text-gray-600">
                Processo simples e seguro para participar, dar lances e arrematar veículos.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Car className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Variedade</h3>
              <p className="text-sm text-gray-600">
                Grande variedade de veículos e oportunidades exclusivas em leilões semanais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <a 
          href="https://wa.me/5511999999999"
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

export default Index;
