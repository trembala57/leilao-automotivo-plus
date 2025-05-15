
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext,
  CarouselDots
} from "@/components/ui/carousel";
import { Search } from "lucide-react";

// Banner slides data
const bannerSlides = [
  {
    id: 1,
    title: "Compre seu veículo sem complicação",
    subtitle: "OS MELHORES LEILÕES DE VEÍCULOS DO BRASIL",
    ctaText: "Quero mais informações",
    ctaLink: "/como-comprar",
    imagePath: "https://armazviplprd.blob.core.windows.net/prod/551f629c-f102-4da7-8dba-b44abcb249b4",
    bgColor: "from-red-600 to-red-700"
  },
  {
    id: 2,
    title: "Leilões Exclusivos",
    subtitle: "AS MELHORES OPORTUNIDADES EM VEÍCULOS",
    ctaText: "Ver Agenda",
    ctaLink: "/agenda",
    imagePath: "https://armazviplprd.blob.core.windows.net/prod/32e9e6f3-25f7-4621-867d-5ea6e2f1365a",
    bgColor: "from-blue-600 to-blue-800"
  },
  {
    id: 3,
    title: "Oportunidades Imperdíveis",
    subtitle: "ENCONTRE SEU PRÓXIMO VEÍCULO COM AS MELHORES CONDIÇÕES",
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
            <div className={`relative w-full bg-gradient-to-r ${slide.bgColor}`}>
              <AspectRatio ratio={3.5 / 1} className="max-h-[400px]">
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-4 flex flex-row items-center">
                    <div className="w-1/2 space-y-4 text-white">
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-sm md:text-base font-medium">
                        {slide.subtitle}
                      </p>
                      <Link to={slide.ctaLink}>
                        <Button size="lg" className="bg-white hover:bg-gray-100 text-red-600 font-bold text-sm md:text-base px-4 py-2 rounded-sm">
                          {slide.ctaText}
                        </Button>
                      </Link>
                    </div>
                    <div className="w-1/2 flex justify-end">
                      {slide.id === 1 && (
                        <img 
                          src={slide.imagePath}
                          alt={slide.title}
                          className="h-full max-h-[350px] object-contain"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </AspectRatio>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots className="absolute bottom-2 left-0 right-0" />
    </Carousel>
  );
};

export default Banner;
