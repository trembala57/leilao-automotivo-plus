
import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/format";
import AuctionTimer from "./AuctionTimer";
import { Badge } from "@/components/ui/badge";

export interface VehicleAuction {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  imageUrl?: string;
  image?: string; // Added for VIPAuctionCard
  currentBid: number;
  minBidIncrement?: number;
  endTime: string; // ISO date string
  status: "active" | "scheduled" | "ended";
  bidsCount?: number;
  
  // Additional fields for VIP Leilões style
  initialBid?: number;
  totalBids?: number;
  location?: string;
  lotNumber?: string;
  financing?: boolean;
  partnerLogo?: string; // Added for partner logos in auction cards
  
  // Properties for VIPAuctionDetail
  color?: string;
  fuel?: string;
  condition?: string;
  km?: number;
}

interface AuctionCardProps {
  auction: VehicleAuction;
}

const AuctionCard = ({ auction }: AuctionCardProps) => {
  const {
    id,
    title,
    make,
    model,
    year,
    imageUrl,
    currentBid,
    endTime,
    status,
    bidsCount,
  } = auction;

  const getStatusBadge = () => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600">Ativo</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-600">Agendado</Badge>;
      case "ended":
        return <Badge className="bg-gray-600">Encerrado</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/auction/${id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={`${make} ${model}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            {getStatusBadge()}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium truncate">{title}</h3>
          <p className="text-sm text-gray-500">
            {make} {model} • {year}
          </p>
          
          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Lance atual:</span>
              <span className="text-lg font-bold text-primary">
                {formatCurrency(currentBid)}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Lances:</span>
              <span className="text-sm">{bidsCount}</span>
            </div>
            
            {status === "active" && (
              <div className="pt-2 border-t border-gray-100">
                <AuctionTimer endTime={endTime} />
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AuctionCard;
