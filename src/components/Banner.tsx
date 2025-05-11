
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext,
  CarouselDots
} from "@/components/ui/carousel";
import { Clock } from "lucide-react";

// Banner slides data
const bannerSlides = [
  {
    id: 1,
    title: "Leilão Chave na Mão",
    subtitle: "29/04/25 às 19h15",
    description: "Chegou a hora de arrematar seu novo carro!",
    ctaText: "Participe!",
    ctaLink: "/auctions",
    imagePath: "https://armazviplprd.blob.core.windows.net/prod/551f629c-f102-4da7-8dba-b44abcb249b4",
    bgColor: "from-primary to-blue-800"
  },
  {
    id: 2,
    title: "Leilões Exclusivos",
    subtitle: "Toda Semana",
    description: "Encontre as melhores oportunidades em veículos",
    ctaText: "Ver Agenda",
    ctaLink: "/agenda",
    imagePath: "https://armazviplprd.blob.core.windows.net/prod/32e9e6f3-25f7-4621-867d-5ea6e2f1365a",
    bgColor: "from-accent to-red-700"
  },
  {
    id: 3,
    title: "Oportunidades Imperdíveis",
    subtitle: "Leilões Semanais",
    description: "Encontre seu próximo veículo com as melhores condições",
    ctaText: "Confira",
    ctaLink: "/auctions",
    imagePath: "https://armazviplprd.blob.core.windows.net/prod/2be6fc81-5e30-4b2f-ba07-d01df7fa6fef",
    bgColor: "from-blue-600 to-blue-900"
  }
];

const Banner = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {bannerSlides.map(slide => (
          <CarouselItem key={slide.id} className="w-full">
            <div className={`relative w-full bg-gradient-to-r ${slide.bgColor} text-white min-h-[500px] flex items-center`}>
              <div className="absolute inset-0 bg-black/20 z-10"></div>
              <div className="container mx-auto px-4 z-20 flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 space-y-6 text-left mb-8 md:mb-0">
                  <div>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight">
                      {slide.title}
                    </h1>
                    <div className="flex items-center mt-4">
                      <Clock className="h-6 w-6 mr-2 text-accent-light" />
                      <p className="text-xl md:text-2xl font-semibold text-accent-light">
                        {slide.subtitle}
                      </p>
                    </div>
                    <p className="text-lg mt-4">{slide.description}</p>
                  </div>
                  <Link to={slide.ctaLink}>
                    <Button size="lg" className="bg-accent hover:bg-accent-light text-white text-lg px-8 py-6 rounded-full">
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
      <CarouselDots className="absolute z-30 bottom-4 left-0 right-0" />
      <CarouselPrevious className="left-4 bg-white/30 hover:bg-white/50" />
      <CarouselNext className="right-4 bg-white/30 hover:bg-white/50" />
    </Carousel>
  );
};

export default Banner;
