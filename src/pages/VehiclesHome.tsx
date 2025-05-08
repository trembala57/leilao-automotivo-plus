
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { filterAuctions } from "@/services/auctionService";
import { VehicleAuction } from "@/components/auction/AuctionCard";
import VIPAuctionCard from "@/components/auction/VIPAuctionCard";
import { Search, Filter, X, ChevronRight, ChevronLeft, Car, Truck, LayoutGrid, LayoutList } from "lucide-react";

const VehiclesHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [auctions, setAuctions] = useState<VehicleAuction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get("search") || "");
  const [make, setMake] = useState<string>(searchParams.get("make") || "");
  const [minYear, setMinYear] = useState<number>(
    searchParams.get("minYear") ? Number(searchParams.get("minYear")) : 2010
  );
  const [maxYear, setMaxYear] = useState<number>(
    searchParams.get("maxYear") ? Number(searchParams.get("maxYear")) : new Date().getFullYear()
  );
  
  // Banner slides data
  const bannerSlides = [
    {
      id: 1,
      title: "Leilão Chave na Mão",
      subtitle: "29/04/25 às 19h15",
      description: "Chegou a hora de arrematar seu novo carro!",
      ctaText: "Participe!",
      ctaLink: "/auctions",
      imagePath: "/lovable-uploads/b908a35e-14ab-4625-af6c-52022b1681c4.png",
      bgColor: "from-primary to-blue-800"
    },
    {
      id: 2,
      title: "Leilões Exclusivos",
      subtitle: "Toda Semana",
      description: "Encontre as melhores oportunidades em veículos",
      ctaText: "Ver Agenda",
      ctaLink: "/agenda",
      imagePath: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      bgColor: "from-accent to-red-700"
    }
  ];

  // Categories data
  const categories = [
    { id: 1, name: "SEMINOVOS", icon: <Car className="h-5 w-5" />, link: "?category=seminovos" },
    { id: 2, name: "USADOS", icon: <Car className="h-5 w-5" />, link: "?category=usados" },
    { id: 3, name: "MOTOS", icon: <Car className="h-5 w-5" />, link: "?category=motos" },
    { id: 4, name: "SINISTRADOS", icon: <Car className="h-5 w-5" />, link: "?category=sinistrados" },
    { id: 5, name: "PESADOS", icon: <Truck className="h-5 w-5" />, link: "?category=pesados" },
    { id: 6, name: "DIVERSOS", icon: <Car className="h-5 w-5" />, link: "?category=diversos" },
    { id: 7, name: "IMÓVEIS", icon: <Car className="h-5 w-5" />, link: "?category=imoveis" },
    { id: 8, name: "JUDICIAIS", icon: <Car className="h-5 w-5" />, link: "?category=judiciais" }
  ];

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setIsLoading(true);
        
        const filters: any = {};
        
        if (make) filters.make = make;
        if (minYear) filters.minYear = minYear;
        if (maxYear) filters.maxYear = maxYear;
        
        const data = await filterAuctions(filters);
        
        // Apply search term filter client-side
        let filteredData = data;
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          filteredData = data.filter(
            (auction) =>
              auction.title.toLowerCase().includes(searchLower) ||
              auction.make.toLowerCase().includes(searchLower) ||
              auction.model.toLowerCase().includes(searchLower)
          );
        }
        
        // Add VIP Leilões specific fields for display
        const enhancedData = filteredData.map(auction => ({
          ...auction,
          lotNumber: `L${auction.id.substring(0, 5)}`,
          location: ["São Paulo", "Rio de Janeiro", "Minas Gerais", "Paraná"][Math.floor(Math.random() * 4)],
          initialBid: Math.floor(auction.currentBid * 0.8),
          totalBids: auction.bidsCount,
          financing: Math.random() > 0.7
        }));
        
        setAuctions(enhancedData);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAuctions();
  }, [searchTerm, make, minYear, maxYear]);

  // Available makes for the select
  const carMakes = ["", "Honda", "Toyota", "Volkswagen", "BMW", "Ford", "Jeep", "Chevrolet", "Hyundai", "Fiat"];

  const handleFilterApply = () => {
    // Update URL search params
    const params: any = {};
    if (searchTerm) params.search = searchTerm;
    if (make) params.make = make;
    if (minYear !== 2010) params.minYear = minYear;
    if (maxYear !== new Date().getFullYear()) params.maxYear = maxYear;
    
    setSearchParams(params);
    
    if (window.innerWidth < 768) {
      setFiltersOpen(false);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setMake("");
    setMinYear(2010);
    setMaxYear(new Date().getFullYear());
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>Veículos - VIP Leilões</title>
      </Helmet>

      {/* Hero Banner Carousel */}
      <Carousel className="w-full">
        <CarouselContent>
          {bannerSlides.map(slide => (
            <CarouselItem key={slide.id} className="w-full">
              <div className={`relative w-full bg-gradient-to-r ${slide.bgColor} text-white min-h-[500px] flex items-center`}>
                <div className="absolute inset-0 bg-black/20 z-10"></div>
                <div className="container mx-auto px-4 z-20 flex flex-col md:flex-row items-center justify-between">
                  <div className="md:w-1/2 space-y-6 text-left mb-8 md:mb-0">
                    <div>
                      <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight">
                        {slide.title}
                      </h1>
                      <div className="flex items-center mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-2 text-accent-light">
                          <path d="M12 8v4l2 2"></path>
                          <circle cx="12" cy="12" r="10"></circle>
                        </svg>
                        <p className="text-2xl md:text-3xl font-semibold text-red-400">
                          {slide.subtitle}
                        </p>
                      </div>
                      <p className="text-xl mt-4">{slide.description}</p>
                    </div>
                    <Link to={slide.ctaLink}>
                      <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 rounded-full">
                        {slide.ctaText}
                      </Button>
                    </Link>
                  </div>
                  <div className="md:w-1/2 flex justify-center">
                    <img 
                      src={slide.imagePath} 
                      alt={slide.title}
                      className="max-h-[300px] md:max-h-[400px] object-contain rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute z-30 bottom-4 left-0 right-0 flex justify-center">
          <div className="flex space-x-2">
            {bannerSlides.map((_, index) => (
              <button 
                key={index}
                className="w-3 h-3 rounded-full bg-white/50 focus:outline-none"
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
        <CarouselPrevious className="left-4 bg-white/30 hover:bg-white/50" />
        <CarouselNext className="right-4 bg-white/30 hover:bg-white/50" />
      </Carousel>

      {/* Categories Section */}
      <section className="bg-white py-2 shadow-md relative -mt-5 md:-mt-10 z-20 rounded-t-3xl mx-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {categories.map(category => (
              <Link 
                key={category.id}
                to={category.link}
                className="flex flex-col items-center justify-center p-2 hover:bg-gray-50 rounded-lg transition-colors text-center"
              >
                <div className="text-gray-600 mb-1">
                  {category.icon}
                </div>
                <span className="text-gray-700 font-medium text-xs">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Vehicle Listings */}
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Veículos Disponíveis</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters sidebar */}
          <div
            className={`${
              filtersOpen ? "block" : "hidden"
            } lg:block w-full lg:w-64 shrink-0 bg-white rounded-sm shadow-sm p-4 mb-4 lg:mb-0`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-vip-blue">Filtrar por:</h3>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="h-8 text-xs text-gray-600"
                >
                  Limpar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden h-8"
                  onClick={() => setFiltersOpen(false)}
                >
                  <X size={16} />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Buscar
                </label>
                <div className="flex">
                  <Input 
                    placeholder="Modelo, marca..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="vip-input text-sm py-1 flex-grow"
                  />
                  <Button className="ml-1 bg-vip-blue" size="sm">
                    <Search size={16} />
                  </Button>
                </div>
              </div>
              
              {/* Localidade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Localidade
                </label>
                <Select>
                  <SelectTrigger className="vip-input text-sm py-1">
                    <SelectValue placeholder="Escolha uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sp">São Paulo</SelectItem>
                    <SelectItem value="rj">Rio de Janeiro</SelectItem>
                    <SelectItem value="mg">Minas Gerais</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Marca/Tipo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marca/Tipo
                </label>
                <Select value={make} onValueChange={setMake}>
                  <SelectTrigger className="vip-input text-sm py-1">
                    <SelectValue placeholder="Escolha" />
                  </SelectTrigger>
                  <SelectContent>
                    {carMakes.filter(m => m).map(carMake => (
                      <SelectItem key={carMake} value={carMake}>{carMake}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Ano */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ano
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Select value={minYear.toString()} onValueChange={(val) => setMinYear(parseInt(val))}>
                    <SelectTrigger className="vip-input text-sm py-1">
                      <SelectValue placeholder="De" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: 20}, (_, i) => new Date().getFullYear() - i).map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={maxYear.toString()} onValueChange={(val) => setMaxYear(parseInt(val))}>
                    <SelectTrigger className="vip-input text-sm py-1">
                      <SelectValue placeholder="Até" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: 20}, (_, i) => new Date().getFullYear() - i).map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Combustível */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Combustível
                </label>
                <Select>
                  <SelectTrigger className="vip-input text-sm py-1">
                    <SelectValue placeholder="Escolha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gasolina">Gasolina</SelectItem>
                    <SelectItem value="alcool">Álcool</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="flex">Flex</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Modelo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Modelo
                </label>
                <Select>
                  <SelectTrigger className="vip-input text-sm py-1">
                    <SelectValue placeholder="Escolha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="hatch">Hatch</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tipo */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Tipo
                </label>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <Checkbox id="todos" defaultChecked />
                    <label htmlFor="todos" className="text-xs ml-2">Todos</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="carros" />
                    <label htmlFor="carros" className="text-xs ml-2">Carros</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="motos" />
                    <label htmlFor="motos" className="text-xs ml-2">Motos</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="pesados" />
                    <label htmlFor="pesados" className="text-xs ml-2">Pesados</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="outros" />
                    <label htmlFor="outros" className="text-xs ml-2">Outros</label>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleFilterApply}
                className="w-full bg-gray-700 hover:bg-gray-800 text-white py-1 text-xs rounded-sm"
              >
                Filtrar
              </Button>
            </div>
          </div>

          {/* Vehicles grid */}
          <div className="flex-1">
            {/* Mobile Filter Button & View Mode Toggle */}
            <div className="flex items-center justify-between mb-4">
              <Button
                onClick={() => setFiltersOpen(!filtersOpen)}
                variant="outline"
                className="lg:hidden border-gray-300 text-gray-700 flex items-center justify-center"
              >
                <Filter size={16} className="mr-2" />
                Filtros
              </Button>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm hidden md:inline">Modo de Exibição:</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-gray-200" : ""}
                >
                  <LayoutGrid size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-gray-200" : ""}
                >
                  <LayoutList size={16} />
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vip-blue"></div>
              </div>
            ) : auctions.length > 0 ? (
              <div className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"} gap-4 mb-8`}>
                {auctions.map((auction) => (
                  <VIPAuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-white rounded-sm shadow-sm p-8 text-center">
                <h3 className="text-xl font-medium mb-2">Nenhum veículo encontrado</h3>
                <p className="text-gray-500 mb-4">
                  Tente ajustar seus filtros para encontrar mais resultados.
                </p>
                <Button onClick={handleReset} variant="outline">
                  Limpar Filtros
                </Button>
              </div>
            )}

            {/* Pagination */}
            {auctions.length > 0 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </div>
      
      {/* Offers Counter */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-lg text-gray-600">Vamos Comprar?</h3>
          <h2 className="text-3xl font-bold text-primary">Confira nossos destaques. Temos <span className="text-accent">445</span> Ofertas Ativas!</h2>
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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default VehiclesHome;
