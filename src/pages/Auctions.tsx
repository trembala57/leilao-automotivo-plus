
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import AuctionCard, { VehicleAuction } from "@/components/auction/AuctionCard";
import { filterAuctions } from "@/services/auctionService";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { formatCurrency } from "@/lib/format";

const Auctions = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Leilões de Veículos</h1>

        {/* Search and filter bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por marca, modelo..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleFilterApply}
                className="bg-primary hover:bg-primary/90"
              >
                <Search size={18} className="mr-2" />
                Buscar
              </Button>
              <Button
                variant="outline"
                className="md:hidden"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <SlidersHorizontal size={18} className="mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div
            className={`${
              filtersOpen ? "block" : "hidden"
            } md:block w-full md:w-64 lg:w-72 shrink-0 bg-white rounded-lg shadow-sm p-4 mb-4 md:mb-0 transition-all`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Filtros</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="h-8 text-sm"
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

            <div className="space-y-6">
              {/* Status */}
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="active">Ativos</SelectItem>
                      <SelectItem value="scheduled">Agendados</SelectItem>
                      <SelectItem value="ended">Encerrados</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Make */}
              <div>
                <Label htmlFor="make">Marca</Label>
                <Select value={make} onValueChange={setMake}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Todas as marcas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="">Todas as marcas</SelectItem>
                      {carMakes.filter((m) => m).map((carMake) => (
                        <SelectItem key={carMake} value={carMake}>{carMake}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Year range */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="yearRange">Ano</Label>
                  <span className="text-sm text-gray-500">
                    {minYear} - {maxYear}
                  </span>
                </div>
                <div className="flex gap-4">
                  <Input
                    type="number"
                    value={minYear}
                    min="1990"
                    max={maxYear}
                    onChange={(e) => setMinYear(Number(e.target.value))}
                    className="w-full"
                  />
                  <Input
                    type="number"
                    value={maxYear}
                    min={minYear}
                    max={new Date().getFullYear()}
                    onChange={(e) => setMaxYear(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Price range */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="priceRange">Faixa de Preço</Label>
                  <span className="text-sm text-gray-500">
                    {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                  </span>
                </div>
                <Slider
                  defaultValue={priceRange}
                  min={0}
                  max={500000}
                  step={5000}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="mt-2"
                />
              </div>

              <Button
                onClick={handleFilterApply}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Aplicar Filtros
              </Button>
            </div>
          </div>

          {/* Auctions grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : auctions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {auctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-xl font-medium mb-2">Nenhum leilão encontrado</h3>
                <p className="text-gray-500 mb-4">
                  Tente ajustar seus filtros para encontrar mais resultados.
                </p>
                <Button onClick={handleReset} variant="outline">
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auctions;
