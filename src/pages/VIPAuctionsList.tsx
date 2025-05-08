
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { filterAuctions } from "@/services/auctionService";
import { VehicleAuction } from "@/components/auction/AuctionCard";
import VIPAuctionCard from "@/components/auction/VIPAuctionCard";
import { Search, SlidersHorizontal, Filter, X, GridIcon, LayoutList } from "lucide-react";
import { formatCurrency } from "@/lib/format";

const VIPAuctionsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [auctions, setAuctions] = useState<VehicleAuction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Filter states
  const [status, setStatus] = useState<string>(searchParams.get("status") || "active");
  const [make, setMake] = useState<string>(searchParams.get("make") || "");
  const [minYear, setMinYear] = useState<number>(
    searchParams.get("minYear") ? Number(searchParams.get("minYear")) : 2010
  );
  const [maxYear, setMaxYear] = useState<number>(
    searchParams.get("maxYear") ? Number(searchParams.get("maxYear")) : new Date().getFullYear()
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : 0, 
    searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 500000
  ]);
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get("search") || "");

  // Available makes for the select
  const carMakes = ["", "Honda", "Toyota", "Volkswagen", "BMW", "Ford", "Jeep", "Chevrolet", "Hyundai", "Fiat"];

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setIsLoading(true);
        
        const filters: any = {};
        
        if (status) filters.status = status as any;
        if (make) filters.make = make;
        if (minYear) filters.minYear = minYear;
        if (maxYear) filters.maxYear = maxYear;
        if (priceRange[0] > 0) filters.minPrice = priceRange[0];
        if (priceRange[1] < 500000) filters.maxPrice = priceRange[1];
        
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
        
        setAuctions(filteredData);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAuctions();
  }, [status, make, minYear, maxYear, priceRange, searchTerm]);

  const updateFilters = () => {
    // Update URL search params
    const params: any = {};
    if (status) params.status = status;
    if (make) params.make = make;
    if (minYear !== 2010) params.minYear = minYear;
    if (maxYear !== new Date().getFullYear()) params.maxYear = maxYear;
    if (priceRange[0] > 0) params.minPrice = priceRange[0];
    if (priceRange[1] < 500000) params.maxPrice = priceRange[1];
    if (searchTerm) params.search = searchTerm;
    
    setSearchParams(params);
  };

  const handleFilterApply = () => {
    updateFilters();
    if (window.innerWidth < 768) {
      setFiltersOpen(false);
    }
  };

  const handleReset = () => {
    setStatus("active");
    setMake("");
    setMinYear(2010);
    setMaxYear(new Date().getFullYear());
    setPriceRange([0, 500000]);
    setSearchTerm("");
    setSearchParams({});
  };

  // Auction Header Data
  const auctionData = {
    id: "080525BSMA3",
    title: "Leilão: 080525BSMA3",
    date: "08/05/2025 09:00",
    location: "VICENTE PAULO",
    type: "Eletrônico",
    lots: 25
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Auction Header */}
      <div className="bg-vip-blue py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Left - Auction Logo */}
            <div className="bg-white p-4 flex items-center justify-center">
              <img 
                src="https://www.vipleiloes.com.br/img/empresas/itapeva.png" 
                alt="Itapeva" 
                className="max-h-16"
              />
            </div>
            
            {/* Middle - Auction Info */}
            <div className="bg-vip-blue p-4 text-white">
              <h2 className="text-xl font-bold mb-2">Leilão: {auctionData.id}</h2>
              <div className="space-y-1 text-sm">
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 opacity-80">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Data: {auctionData.date}
                </p>
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 opacity-80">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Leiloeiro: {auctionData.location}
                </p>
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 opacity-80">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  Tipo de leilão: {auctionData.type}
                </p>
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 opacity-80">
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2Z"></path>
                    <path d="M4 2v18"></path>
                    <path d="M8 6h4"></path>
                    <path d="M8 10h4"></path>
                  </svg>
                  Lotes: {auctionData.lots}
                </p>
              </div>
            </div>
            
            {/* Right - Status */}
            <div className="bg-gradient-to-r from-vip-green to-green-400 p-4 flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">LEILÃO ABERTO PARA LANCES</h3>
              </div>
            </div>
          </div>
          
          <div className="mt-4 bg-white p-2 text-center shadow-sm text-vip-blue">
            <button className="hover:underline text-sm flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              Exibir informações
            </button>
          </div>
        </div>
      </div>

      {/* Lotes heading */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Lotes</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Modo de Exibição:</span>
            <button className="p-1 hover:bg-gray-200 rounded">
              <GridIcon size={18} />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <LayoutList size={18} />
            </button>
          </div>
        </div>

        {/* Filters and Grid */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div
            className={`${
              filtersOpen ? "block" : "hidden"
            } md:block w-full md:w-64 shrink-0 bg-white rounded-sm shadow-sm p-4 mb-4 md:mb-0`}
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
                  className="md:hidden h-8"
                  onClick={() => setFiltersOpen(false)}
                >
                  <X size={16} />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Localidade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Localidade
                </label>
                <select className="vip-input text-sm py-1">
                  <option value="">Escolha uma opção</option>
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                </select>
              </div>

              {/* Marca/Tipo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marca/Tipo
                </label>
                <select 
                  className="vip-input text-sm py-1"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                >
                  <option value="">Escolha</option>
                  {carMakes.filter(m => m).map(carMake => (
                    <option key={carMake} value={carMake}>{carMake}</option>
                  ))}
                </select>
              </div>

              {/* Ano */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ano
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select className="vip-input text-sm py-1">
                    <option value="">Escolha</option>
                    {Array.from({length: 20}, (_, i) => new Date().getFullYear() - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <select className="vip-input text-sm py-1">
                    <option value="">Escolha</option>
                    {Array.from({length: 20}, (_, i) => new Date().getFullYear() - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Combustível */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Combustível
                </label>
                <select className="vip-input text-sm py-1">
                  <option value="">Escolha</option>
                  <option value="gasolina">Gasolina</option>
                  <option value="alcool">Álcool</option>
                  <option value="diesel">Diesel</option>
                  <option value="flex">Flex</option>
                </select>
              </div>

              {/* Modelo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Modelo
                </label>
                <select className="vip-input text-sm py-1">
                  <option value="">Escolha</option>
                </select>
              </div>

              {/* Tipo */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Tipo
                </label>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input type="radio" name="tipo" id="todos" className="mr-2" defaultChecked />
                    <label htmlFor="todos" className="text-xs">Todos</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="tipo" id="carros" className="mr-2" />
                    <label htmlFor="carros" className="text-xs">Carros</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="tipo" id="motos" className="mr-2" />
                    <label htmlFor="motos" className="text-xs">Motos</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="tipo" id="pesados" className="mr-2" />
                    <label htmlFor="pesados" className="text-xs">Pesados</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="tipo" id="outros" className="mr-2" />
                    <label htmlFor="outros" className="text-xs">Outros</label>
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

          {/* Auctions grid */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="block md:hidden mb-4">
              <Button
                onClick={() => setFiltersOpen(!filtersOpen)}
                variant="outline"
                className="w-full border-gray-300 text-gray-700 flex items-center justify-center"
              >
                <Filter size={16} className="mr-2" />
                Filtros
              </Button>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vip-blue"></div>
              </div>
            ) : auctions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {auctions.map((auction) => (
                  <VIPAuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-white rounded-sm shadow-sm p-8 text-center">
                <h3 className="text-xl font-medium mb-2">Nenhum leilão encontrado</h3>
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
              <div className="flex justify-center mt-6">
                <nav className="flex items-center space-x-1">
                  <button className="border border-gray-300 px-2 py-1 bg-vip-blue text-white">
                    1
                  </button>
                  <button className="border border-gray-300 px-2 py-1 text-gray-700 hover:bg-gray-100">
                    2
                  </button>
                  <button className="border border-gray-300 px-2 py-1 text-gray-700 hover:bg-gray-100">
                    3
                  </button>
                  <button className="border border-gray-300 px-2 py-1 text-gray-700 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VIPAuctionsList;
