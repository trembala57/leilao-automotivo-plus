import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import AuctionCard, { VehicleAuction } from "@/components/auction/AuctionCard";
import { getAllAuctions, filterAuctions } from "@/services/auctionService";
import { Car, Truck, Clock, Search, Download, MessageCircle, MoveRight, ChevronRight } from "lucide-react";
import Banner from "@/components/Banner";

const Index = () => {
  const [featuredAuctions, setFeaturedAuctions] = useState<VehicleAuction[]>([]);
  const [endingSoonAuctions, setEndingSoonAuctions] = useState<VehicleAuction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setIsLoading(true);
        const allAuctions = await getAllAuctions();
        
        // Filter active auctions for featured
        const active = allAuctions.filter(auction => auction.status === "active");
        setFeaturedAuctions(active.slice(0, 4));
        
        // Sort ending soon auctions
        const sortedByEndTime = [...active].sort((a, b) => {
          return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
        });
        setEndingSoonAuctions(sortedByEndTime.slice(0, 3));
        
      } catch (error) {
        console.error("Error fetching auctions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  // Categories data
  const categories = [
    { id: 1, name: "Seminovos", icon: <Car className="h-8 w-8" />, link: "/auctions?category=seminovos" },
    { id: 2, name: "Usados", icon: <Car className="h-8 w-8" />, link: "/auctions?category=usados" },
    { id: 3, name: "Motos", icon: <Car className="h-8 w-8" />, link: "/auctions?category=motos" },
    { id: 4, name: "Sinistrados", icon: <Car className="h-8 w-8" />, link: "/auctions?category=sinistrados" },
    { id: 5, name: "Pesados", icon: <Truck className="h-8 w-8" />, link: "/auctions?category=pesados" },
    { id: 6, name: "Diversos", icon: <Car className="h-8 w-8" />, link: "/auctions?category=diversos" }
  ];

  return (
    <div>
      {/* Hero Banner Carousel */}
      <Banner />

      {/* Categories Section */}
      <section className="bg-white py-8 shadow-md relative -mt-10 z-20 rounded-t-3xl mx-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map(category => (
              <Link 
                key={category.id}
                to={category.link}
                className="flex flex-col items-center justify-center p-4 hover:bg-gray-50 rounded-lg transition-colors text-center"
              >
                <div className="bg-primary/10 p-3 rounded-full mb-2">
                  {category.icon}
                </div>
                <span className="text-gray-700 font-medium text-sm md:text-base">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-primary">Leilões em Destaque</h2>
              <p className="text-gray-600">As melhores oportunidades em veículos</p>
            </div>
            <Link to="/auctions" className="text-accent hover:underline font-medium flex items-center">
              Ver todos <ChevronRight size={16} />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredAuctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center text-primary">Por que escolher a LeilãoAuto?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparência</h3>
              <p className="text-gray-600">
                Todas as informações sobre os veículos são verificadas e disponibilizadas com clareza.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Facilidade</h3>
              <p className="text-gray-600">
                Processo simples e seguro para participar, dar lances e arrematar veículos.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Variedade</h3>
              <p className="text-gray-600">
                Grande variedade de veículos e oportunidades exclusivas em leilões semanais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ending Soon */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-primary">Encerrando em Breve</h2>
              <p className="text-gray-600">Não perca estas oportunidades</p>
            </div>
            <Link to="/auctions?sort=ending-soon" className="text-accent hover:underline font-medium flex items-center">
              Ver todos <ChevronRight size={16} />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : endingSoonAuctions.length > 0 ? (
            <Carousel className="w-full">
              <CarouselContent>
                {endingSoonAuctions.map(auction => (
                  <CarouselItem key={auction.id} className="sm:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <AuctionCard auction={auction} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          ) : (
            <p className="text-center text-gray-500">Nenhum leilão encerrando em breve</p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Pronto para começar a participar de leilões?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Cadastre-se agora para ter acesso a todos os leilões e começar a dar lances.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-accent hover:bg-accent-light text-white text-lg px-8 py-6 rounded-full">
                Cadastre-se Gratuitamente
              </Button>
            </Link>
            <Link to="/app">
              <Button size="lg" variant="outline" className="border-white bg-white/10 text-white hover:bg-white/20 text-lg px-8 py-6 rounded-full">
                <Download className="mr-2 h-5 w-5" /> Baixar Aplicativo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Offers Counter */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-lg text-gray-600">Vamos Comprar?</h3>
          <h2 className="text-3xl font-bold text-primary">Confira nossos destaques. Temos <span className="text-accent">445</span> Ofertas Ativas!</h2>
        </div>
      </section>
    </div>
  );
};

export default Index;
