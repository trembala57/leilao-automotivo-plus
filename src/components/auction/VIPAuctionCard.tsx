
import React from "react";
import { Link } from "react-router-dom";
import { Heart, Share2 } from "lucide-react";
import { VehicleAuction } from "./AuctionCard";
import { formatCurrency } from "@/lib/format";
import AuctionTimer from "./AuctionTimer";

interface VIPAuctionCardProps {
  auction: VehicleAuction;
  showTimer?: boolean;
}

const VIPAuctionCard: React.FC<VIPAuctionCardProps> = ({ auction, showTimer = true }) => {
  const {
    id,
    title,
    make,
    model,
    currentBid,
    status,
    endTime,
    bidsCount,
  } = auction;

  // Use the correct properties or provide fallbacks
  const image = auction.image || auction.imageUrl;
  const initialBid = auction.initialBid || Math.floor(currentBid * 0.8);
  const totalBids = auction.totalBids || bidsCount;
  const location = auction.location || "São Paulo";
  const lotNumber = auction.lotNumber || `L${id.substring(0, 5)}`;
  const financing = auction.financing || false;

  return (
    <div className="bg-white border border-gray-200 rounded-sm overflow-hidden h-full flex flex-col">
      {/* Card Header with Auction Status */}
      <div className="flex justify-between items-center bg-green-600 text-white text-xs px-2 py-1">
        <div className="font-bold uppercase tracking-wider">Em leilão</div>
        <div className="flex space-x-1">
          <button
            aria-label="Like auction"
            className="hover:text-white/80"
          >
            <Heart size={14} />
          </button>
          <button
            aria-label="Share auction"
            className="hover:text-white/80"
          >
            <Share2 size={14} />
          </button>
        </div>
      </div>

      {/* Auction Image */}
      <Link to={`/auction/${id}`} className="block relative">
        <img
          src={image || "https://placehold.co/300x200?text=No+Image"}
          alt={title}
          className="w-full h-48 object-cover"
        />
        
        {/* Finance Badge */}
        {financing && (
          <div className="absolute bottom-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase">
            Financie
          </div>
        )}
      </Link>

      {/* Auction Details */}
      <div className="p-3 flex flex-col h-full">
        <div className="text-xs text-gray-600 mb-1">
          Lote: {lotNumber} | Local: {location}
        </div>
        
        <div className="mb-2">
          <div className="text-xs uppercase font-bold text-gray-700">{make}</div>
          <Link to={`/auction/${id}`} className="block">
            <h3 className="text-sm font-bold text-vip-blue truncate hover:underline">
              {title}
            </h3>
          </Link>
        </div>

        <div className="text-xs flex items-center mb-1">
          <span className="bg-gray-200 text-gray-600 px-1 rounded-sm mr-2">
            Valor Atual ({totalBids} Lances)
          </span>
        </div>
        
        <div className="text-vip-blue font-bold text-xl mb-2">
          {formatCurrency(currentBid)}
        </div>

        <div className="text-xs text-gray-600 flex flex-col space-y-1 mb-auto">
          <div className="flex items-center">
            <span className="mr-1">Lance Inicial:</span>
            <span className="font-bold">{formatCurrency(initialBid)}</span>
          </div>
          
          <div className="flex items-center">
            <span className="mr-1">Leilão:</span>
            <span className="font-bold">
              {new Date(endTime).toLocaleDateString('pt-BR')} {new Date(endTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Bottom Action Button */}
        <div className="mt-3 text-center">
          <Link 
            to={`/auction/${id}`}
            className="inline-block w-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold py-1 px-2 rounded-sm"
          >
            Informações
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VIPAuctionCard;
