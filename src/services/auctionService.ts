
import { VehicleAuction } from "@/components/auction/AuctionCard";

// Mock data for auctions
const mockAuctions: VehicleAuction[] = [
  {
    id: "1",
    title: "Honda Civic Touring 2022",
    make: "Honda",
    model: "Civic",
    year: 2022,
    imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop",
    currentBid: 98500,
    minBidIncrement: 500,
    endTime: new Date(Date.now() + 3600000 * 24 * 2).toISOString(), // 2 days from now
    status: "active",
    bidsCount: 12,
    bids: [
      { id: "b1", userId: "user1", amount: 98500, timestamp: new Date().toISOString(), status: "pending" },
      { id: "b2", userId: "user2", amount: 98000, timestamp: new Date(Date.now() - 3600000).toISOString(), status: "rejected" },
      { id: "b3", userId: "user3", amount: 97500, timestamp: new Date(Date.now() - 7200000).toISOString(), status: "accepted" }
    ]
  },
  {
    id: "2",
    title: "Jeep Compass Limited 2021",
    make: "Jeep",
    model: "Compass",
    year: 2021,
    imageUrl: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?q=80&w=1000&auto=format&fit=crop",
    currentBid: 120000,
    minBidIncrement: 1000,
    endTime: new Date(Date.now() + 3600000 * 5).toISOString(), // 5 hours from now
    status: "active",
    bidsCount: 23,
    bids: [
      { id: "b4", userId: "user5", amount: 120000, timestamp: new Date().toISOString(), status: "pending" },
      { id: "b5", userId: "user1", amount: 119000, timestamp: new Date(Date.now() - 3600000).toISOString(), status: "rejected" }
    ]
  },
  {
    id: "3",
    title: "Volkswagen Golf GTI 2020",
    make: "Volkswagen",
    model: "Golf GTI",
    year: 2020,
    imageUrl: "https://images.unsplash.com/photo-1517994112540-009c47ea476b?q=80&w=1000&auto=format&fit=crop",
    currentBid: 85000,
    minBidIncrement: 500,
    endTime: new Date(Date.now() + 3600000 * 48).toISOString(), // 48 hours from now
    status: "active",
    bidsCount: 8,
  },
  {
    id: "4",
    title: "BMW Serie 3 320i 2019",
    make: "BMW",
    model: "Serie 3",
    year: 2019,
    imageUrl: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=1000&auto=format&fit=crop",
    currentBid: 140000,
    minBidIncrement: 1000,
    endTime: new Date(Date.now() + 3600000 * 72).toISOString(), // 3 days from now
    status: "active",
    bidsCount: 18,
  },
  {
    id: "5",
    title: "Toyota Corolla XEi 2021",
    make: "Toyota",
    model: "Corolla",
    year: 2021,
    imageUrl: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=1000&auto=format&fit=crop",
    currentBid: 94000,
    minBidIncrement: 500,
    endTime: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
    status: "ended",
    bidsCount: 32,
  },
  {
    id: "6",
    title: "Ford Ranger XLT 2022",
    make: "Ford",
    model: "Ranger",
    year: 2022,
    imageUrl: "https://images.unsplash.com/photo-1605893477799-b99e3b8b93eb?q=80&w=1000&auto=format&fit=crop",
    currentBid: 170000,
    minBidIncrement: 1000,
    endTime: new Date(Date.now() + 3600000 * 24 * 7).toISOString(), // 7 days from now
    status: "scheduled",
    bidsCount: 0,
  },
];

// Get all auctions
export const getAllAuctions = async (): Promise<VehicleAuction[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockAuctions;
};

// Get auction by ID
export const getAuctionById = async (id: string): Promise<VehicleAuction | undefined> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockAuctions.find((auction) => auction.id === id);
};

// Filter auctions by various criteria
export const filterAuctions = async (filters: {
  status?: 'active' | 'scheduled' | 'ended';
  make?: string;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
}): Promise<VehicleAuction[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  let filtered = [...mockAuctions];
  
  if (filters.status) {
    filtered = filtered.filter(auction => auction.status === filters.status);
  }
  
  if (filters.make) {
    filtered = filtered.filter(auction => auction.make.toLowerCase() === filters.make.toLowerCase());
  }
  
  if (filters.minYear) {
    filtered = filtered.filter(auction => auction.year >= filters.minYear);
  }
  
  if (filters.maxYear) {
    filtered = filtered.filter(auction => auction.year <= filters.maxYear);
  }
  
  if (filters.minPrice) {
    filtered = filtered.filter(auction => auction.currentBid >= filters.minPrice);
  }
  
  if (filters.maxPrice) {
    filtered = filtered.filter(auction => auction.currentBid <= filters.maxPrice);
  }
  
  return filtered;
};

// Submit a bid
export const submitBid = async (auctionId: string, amount: number): Promise<{ success: boolean; message: string }> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const auction = mockAuctions.find(a => a.id === auctionId);
  
  if (!auction) {
    return { 
      success: false, 
      message: 'Leilão não encontrado' 
    };
  }
  
  if (auction.status !== 'active') {
    return { 
      success: false, 
      message: 'Este leilão não está ativo' 
    };
  }
  
  if (amount <= auction.currentBid) {
    return { 
      success: false, 
      message: `O lance deve ser maior que ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(auction.currentBid)}` 
    };
  }
  
  if (amount < auction.currentBid + auction.minBidIncrement) {
    return { 
      success: false, 
      message: `O incremento mínimo é de ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(auction.minBidIncrement)}` 
    };
  }
  
  // Update the auction with the new bid (in a real app, this would be done on the server)
  auction.currentBid = amount;
  auction.bidsCount += 1;
  
  // Add the bid to the auction's bids array
  const newBid = {
    id: `b${Math.floor(Math.random() * 1000)}`,
    userId: `user${Math.floor(Math.random() * 10) + 1}`,
    amount,
    timestamp: new Date().toISOString(),
    status: "pending" as const
  };
  
  if (!auction.bids) {
    auction.bids = [];
  }
  
  auction.bids.push(newBid);
  
  return { 
    success: true, 
    message: 'Lance registrado com sucesso!' 
  };
};

// Funções para gerenciamento dos lances
export interface Bid {
  id: string;
  userId: string;
  amount: number;
  timestamp: string;
  status: 'pending' | 'accepted' | 'rejected';
  userInfo?: {
    name: string;
    email: string;
    phone?: string;
  };
}

// Get all bids for an auction
export const getAuctionBids = async (auctionId: string): Promise<Bid[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const auction = mockAuctions.find(a => a.id === auctionId);
  if (!auction || !auction.bids) {
    return [];
  }
  
  // Simulando informações de usuários para os lances
  return auction.bids.map(bid => ({
    ...bid,
    userInfo: {
      name: `Usuário ${bid.userId.replace('user', '')}`,
      email: `user${bid.userId.replace('user', '')}@example.com`,
      phone: `+55 11 9${Math.floor(Math.random() * 100000000)}`.replace(/(\d{2})(\d{5})(\d{4})/, '$1 $2-$3')
    }
  }));
};

// Accept a bid
export const acceptBid = async (auctionId: string, bidId: string): Promise<{ success: boolean; message: string }> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  const auction = mockAuctions.find(a => a.id === auctionId);
  if (!auction || !auction.bids) {
    return { 
      success: false, 
      message: 'Leilão ou lance não encontrado' 
    };
  }
  
  const bid = auction.bids.find(b => b.id === bidId);
  if (!bid) {
    return { 
      success: false, 
      message: 'Lance não encontrado' 
    };
  }
  
  // Atualizar status para 'accepted'
  bid.status = 'accepted';
  
  // Rejeitar automaticamente todos os outros lances do mesmo leilão
  auction.bids.forEach(b => {
    if (b.id !== bidId && b.status === 'pending') {
      b.status = 'rejected';
    }
  });
  
  // Marcar o leilão como encerrado
  auction.status = 'ended';
  
  return { 
    success: true, 
    message: 'Lance aceito com sucesso!' 
  };
};

// Reject a bid
export const rejectBid = async (auctionId: string, bidId: string): Promise<{ success: boolean; message: string }> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  const auction = mockAuctions.find(a => a.id === auctionId);
  if (!auction || !auction.bids) {
    return { 
      success: false, 
      message: 'Leilão ou lance não encontrado' 
    };
  }
  
  const bid = auction.bids.find(b => b.id === bidId);
  if (!bid) {
    return { 
      success: false, 
      message: 'Lance não encontrado' 
    };
  }
  
  // Atualizar status para 'rejected'
  bid.status = 'rejected';
  
  return { 
    success: true, 
    message: 'Lance rejeitado com sucesso!' 
  };
};

// Send PIX key to the winner
export const sendPixKeyToWinner = async (auctionId: string, bidId: string, pixKey: string): Promise<{ success: boolean; message: string }> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const auction = mockAuctions.find(a => a.id === auctionId);
  if (!auction || !auction.bids) {
    return { 
      success: false, 
      message: 'Leilão ou lance não encontrado' 
    };
  }
  
  const bid = auction.bids.find(b => b.id === bidId);
  if (!bid) {
    return { 
      success: false, 
      message: 'Lance não encontrado' 
    };
  }
  
  if (bid.status !== 'accepted') {
    return { 
      success: false, 
      message: 'Apenas lances aceitos podem receber a chave PIX' 
    };
  }
  
  // Em um app real, aqui enviaríamos um email com a chave PIX
  console.log(`Enviando chave PIX ${pixKey} para o usuário ${bid.userId} pelo lance ${bid.id} do leilão ${auctionId}`);
  
  return { 
    success: true, 
    message: 'Chave PIX enviada com sucesso para o vencedor!' 
  };
};

// Create a dedicated interface for our extended auction type that includes bids
export interface VehicleAuctionExtended extends VehicleAuction {
  bids?: Bid[];
}

// Properly augment the module to match the original interface exactly
declare module "@/components/auction/AuctionCard" {
  interface VehicleAuction {
    id: string;
    title: string;
    make: string;
    model: string;
    year: number;
    imageUrl?: string;
    image?: string;
    currentBid: number;
    initialBid?: number;
    minBidIncrement?: number;
    endTime: string;
    status: "active" | "ended" | "scheduled";
    bidsCount?: number;
    location?: string;
    lotNumber?: string;
    color?: string;
    fuel?: string;
    financing?: boolean;
    condition?: string;
    km?: number;
    totalBids?: number;
    bids?: Bid[];
    partnerLogo?: string; // Added for partner logos
  }
}
