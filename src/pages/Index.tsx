
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import AuctionCard, { VehicleAuction } from "@/components/auction/AuctionCard";
import { getAllAuctions, filterAuctions } from "@/services/auctionService";
import { Car, Search, Clock } from "lucide-react";

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-blue-800 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1600709406925-3e91a70f6b5a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Encontre os melhores veículos em leilão
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Compre e venda veículos de forma fácil e segura em nossa plataforma de leilões online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auctions">
                <Button size="lg" className="bg-accent hover:bg-accent/90">
                  Ver leilões ativos
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Como funciona
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Leilões em Destaque</h2>
            <Link to="/auctions" className="text-accent hover:underline font-medium">
              Ver todos
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

      {/* How It Works */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Como Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Encontre</h3>
              <p className="text-gray-600">
                Navegue por nosso catálogo de veículos em leilão e encontre as melhores oportunidades.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Participe</h3>
              <p className="text-gray-600">
                Cadastre-se, verifique sua documentação e comece a dar lances em tempo real.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Arremate</h3>
              <p className="text-gray-600">
                Ganhe o leilão com o melhor lance e adquira seu veículo com segurança e economia.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/how-it-works">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Saiba mais sobre leilões
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Ending Soon */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Encerrando em Breve</h2>
          
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
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            <p className="text-center text-gray-500">Nenhum leilão encerrando em breve</p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Pronto para começar a participar de leilões?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Cadastre-se agora para ter acesso a todos os leilões e começar a dar lances.
          </p>
          <Link to="/register">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
              Cadastre-se Gratuitamente
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
