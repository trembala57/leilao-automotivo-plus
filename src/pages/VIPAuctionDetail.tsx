
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious, CarouselItem } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/format";
import { VehicleAuction } from "@/components/auction/AuctionCard";
import VIPAuctionCard from "@/components/auction/VIPAuctionCard";
import { Heart, Share2, ArrowLeft, ArrowRight, Facebook, Twitter } from "lucide-react";

const VIPAuctionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  
  // Mocked auction data
  const auction: VehicleAuction = {
    id: "123",
    title: "HILUX CDSR A4FD 2024/2024",
    make: "TOYOTA",
    model: "HILUX",
    initialBid: 130000.00,
    currentBid: 178000.00,
    status: "active",
    totalBids: 9,
    endTime: "2025-05-10T19:00:00",
    location: "GO",
    lotNumber: "3 (cod 10587)",
    year: 2024,
    color: "PRATA", // Now valid in the interface
    fuel: "DIESEL", // Now valid in the interface
    financing: true,
    condition: "Excelente", // Now valid in the interface
    km: 31550, // Now valid in the interface
    image: "https://images.unsplash.com/photo-1571861541250-f44574e4c9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  };

  // Related auctions
  const relatedAuctions: VehicleAuction[] = [
    {
      id: "456",
      title: "HILUX SWSRXA4RD",
      make: "TOYOTA",
      model: "HILUX",
      initialBid: 196000.00,
      currentBid: 266000.00,
      status: "active",
      totalBids: 7,
      endTime: "2025-05-15T19:00:00",
      location: "RJ",
      lotNumber: "1",
      year: 2024,
      color: "PRATA",
      fuel: "DIESEL",
      financing: true,
      image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  // Gallery images
  const galleryImages = [
    auction.image,
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1552519507-88aa2dfa9fdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-4 px-4">
        {/* Breadcrumb Navigation */}
        <div className="text-xs mb-4 flex items-center space-x-2">
          <Link to="/auctions" className="text-vip-blue flex items-center">
            <ArrowLeft size={16} className="mr-1" />
            LEILÃO 080525BSPA2
          </Link>
          <span className="mx-1">|</span>
          <button className="text-vip-blue">3</button>
        </div>

        {/* Vehicle Title */}
        <div className="flex flex-col md:flex-row mb-6">
          <div className="flex-1">
            <div className="text-gray-500 text-xs mb-1">TOYOTA</div>
            <h1 className="text-xl font-bold text-vip-blue flex items-center">
              {auction.title} 
              <button className="ml-2 text-gray-400 hover:text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </button>
            </h1>
            <div className="text-xs text-gray-600 mt-1">
              Lote: {auction.lotNumber}
            </div>
            <div className="text-xs text-gray-600">
              Lance inicial: {formatCurrency(auction.initialBid)}
            </div>
          </div>

          {/* Current Bid */}
          <div className="md:text-right mt-4 md:mt-0">
            <div className="flex items-center md:justify-end">
              <span className="text-xs text-gray-600 border border-gray-300 px-2 py-0.5 rounded-sm mr-2">
                ({auction.totalBids}) Lances
              </span>
              <span className="text-xs text-gray-600">Valor Atual</span>
            </div>
            <div className="text-2xl font-bold text-vip-blue">
              {formatCurrency(auction.currentBid)}
            </div>
            <div className="text-xs text-gray-600">
              Por: j***y
            </div>
            <div className="text-xs mt-1">
              <span className="bg-gray-200 px-2 py-0.5 rounded-sm">Incremento de R$ 6.000,00</span>
              <span className="ml-2">Local do Lote: {auction.location}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Gallery */}
            <div className="bg-white p-4 rounded-sm mb-6 shadow-sm">
              <div className="flex flex-col">
                <div className="relative mb-2">
                  <img 
                    src={auction.image} 
                    alt={auction.title} 
                    className="w-full object-cover max-h-[350px]" 
                  />
                  {/* Play Button for Video */}
                  <button className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/40 rounded-full p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {galleryImages.slice(0, 5).map((img, i) => (
                    <div key={i} className="cursor-pointer">
                      <img 
                        src={img} 
                        alt={`${auction.title} - image ${i+1}`} 
                        className="w-full h-20 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Share Buttons */}
              <div className="mt-4">
                <div className="text-xs font-semibold mb-1">COMPARTILHE</div>
                <div className="flex space-x-1">
                  <button className="bg-[#3b5998] text-white rounded-sm p-1">
                    <Facebook size={16} />
                  </button>
                  <button className="bg-[#1DA1F2] text-white rounded-sm p-1">
                    <Twitter size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="bg-white rounded-sm shadow-sm mb-6">
              <Tabs defaultValue="informacoes" className="w-full">
                <div className="border-b">
                  <TabsList className="flex w-full bg-white">
                    <TabsTrigger 
                      value="informacoes" 
                      className="flex-1 py-2 text-xs border-b-2 border-transparent data-[state=active]:border-vip-blue data-[state=active]:text-vip-blue font-semibold rounded-none"
                    >
                      INFORMAÇÕES
                    </TabsTrigger>
                    <TabsTrigger 
                      value="opcionais" 
                      className="flex-1 py-2 text-xs border-b-2 border-transparent data-[state=active]:border-vip-blue data-[state=active]:text-vip-blue font-semibold rounded-none"
                    >
                      OPCIONAIS
                    </TabsTrigger>
                    <TabsTrigger 
                      value="observacoes" 
                      className="flex-1 py-2 text-xs border-b-2 border-transparent data-[state=active]:border-vip-blue data-[state=active]:text-vip-blue font-semibold rounded-none"
                    >
                      OBSERVAÇÕES
                    </TabsTrigger>
                    <TabsTrigger 
                      value="video" 
                      className="flex-1 py-2 text-xs border-b-2 border-transparent data-[state=active]:border-vip-blue data-[state=active]:text-vip-blue font-semibold rounded-none"
                    >
                      VÍDEO
                    </TabsTrigger>
                    <TabsTrigger 
                      value="condicoes" 
                      className="flex-1 py-2 text-xs border-b-2 border-transparent data-[state=active]:border-vip-blue data-[state=active]:text-vip-blue font-semibold rounded-none"
                    >
                      CONDIÇÕES
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="informacoes" className="p-4">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-semibold text-gray-700 w-1/4">Veículo:</td>
                        <td className="py-2">TOYOTA HILUX CDSR A4FD</td>
                        <td className="py-2 font-semibold text-gray-700 w-1/4">Cor:</td>
                        <td className="py-2">PRATA</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-semibold text-gray-700">Ano:</td>
                        <td className="py-2">2024 / 2024</td>
                        <td className="py-2 font-semibold text-gray-700">Combustível:</td>
                        <td className="py-2">Diesel</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-semibold text-gray-700">Localização do lote:</td>
                        <td className="py-2">AV. PERIMETRAL NORTE, 3442, DISTRITO VI JOÃO VAZ, GOIÂNIA - GO</td>
                        <td className="py-2 font-semibold text-gray-700">KM:</td>
                        <td className="py-2">31.550 km</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-semibold text-gray-700">PATRIMÔNIO (Sinistro Recuperado):</td>
                        <td className="py-2">-</td>
                        <td className="py-2 font-semibold text-gray-700">Final Placa:</td>
                        <td className="py-2">8</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-gray-700">-</td>
                        <td className="py-2">-</td>
                        <td className="py-2 font-semibold text-gray-700">Situação de Entrada:</td>
                        <td className="py-2">Funcionando</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-gray-700">-</td>
                        <td className="py-2">-</td>
                        <td className="py-2 font-semibold text-gray-700">Comitente:</td>
                        <td className="py-2">PARTICULAR (P.FI)</td>
                      </tr>
                    </tbody>
                  </table>
                </TabsContent>

                <TabsContent value="opcionais" className="p-4">
                  <div className="p-6 text-center">
                    <p>Informações de opcionais não disponibilizadas pelo comitente.</p>
                  </div>
                </TabsContent>

                <TabsContent value="observacoes" className="p-4">
                  <div className="p-6 text-center">
                    <p>Sem observações para este lote.</p>
                  </div>
                </TabsContent>

                <TabsContent value="video" className="p-4">
                  <div className="p-6 text-center">
                    <p>Nenhum vídeo disponível para este lote.</p>
                  </div>
                </TabsContent>

                <TabsContent value="condicoes" className="p-4">
                  <div className="space-y-4 text-sm">
                    <p>
                      LEILÃO PROGRAMADO PARA 08/05/2025 ÀS 09:00
                    </p>
                    <p>
                      O arrematante da compra via LEILÃO, ESTÁ CIENTE QUE DEVERÁ ARCAR COM OS CUSTOS DE TRANSFERÊNCIA DO VEÍCULO E REGULARIZAÇÃO DE CRV DIGITAL (CASO A PROPRIEDADE DO VENDEDOR ESTEJA EM CRV DIGITAL), independente do veículo na loja estar com a documentação regularizada.
                    </p>
                    <p>
                      <strong>ATENÇÃO</strong>: O Arrematante é obrigado a pagar a comissão do leiloeiro de 5% sobre o valor do arremate. O pagamento deverá ser realizado no dia do leilão, via PIX, após a confirmação da arrematação, através da confirmação por e-mail.
                    </p>
                    <p>
                      <strong>- ARREMATANTE:</strong> Após arrematar o lote, o comprador deverá entrar em contato com a loja para agendar a visita, a vistoria e o pagamento do veículo AGENDAMENTO PELO TELEFONE (XX) XXXX-XXXX | (XX) XXXX-XXXX.
                    </p>
                    <p>
                      <strong>VEÍCULOS EMPLACADOS:</strong> Qualquer divergência quanto ao modelo de veículo descrito neste site, prevalecerá a descrição contida no RENAVAM, documento e placa do veículo.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar - Next Lots */}
          <div className="w-full md:w-80 lg:w-96">
            <div className="mb-4">
              <h3 className="text-base font-semibold mb-2">Próximos Lotes</h3>
              <div className="space-y-4">
                {relatedAuctions.map(auction => (
                  <VIPAuctionCard key={auction.id} auction={auction} showTimer={false} />
                ))}

                <div className="flex justify-center mt-4">
                  <Link to="/auctions" className="text-vip-blue hover:underline text-sm flex items-center">
                    Ver todos os lotes deste leilão
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VIPAuctionDetail;
