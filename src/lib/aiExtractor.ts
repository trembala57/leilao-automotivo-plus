
/**
 * Serviço de IA para extrair informações de leilões
 * 
 * Este é um mock para simular a extração de dados usando IA
 * Em uma implementação real, isto se conectaria a uma API de IA
 */

export interface VehicleData {
  make: string;
  model: string;
  year: number;
  startingBid: number;
  description: string;
  imageUrl: string;
  features: string[];
  condition: string;
  mileage?: number;
  endDate?: Date;
}

export class AuctionDataExtractor {
  /**
   * Extrai dados de um veículo a partir de uma URL de leilão
   * 
   * @param url URL da página do leilão
   * @returns Dados do veículo extraídos pela IA
   */
  static async extractFromUrl(url: string): Promise<VehicleData | null> {
    console.log(`Extraindo dados de: ${url}`);
    
    // Simula um delay para processamento de IA (200-1500ms)
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 1300));
    
    // Simula uma taxa de sucesso de 90%
    if (Math.random() > 0.1) {
      // Lista de marcas e modelos para simulação
      const makes = ["Honda", "Toyota", "Ford", "Chevrolet", "Volkswagen", "Fiat", "Hyundai", "Jeep", "BMW", "Mercedes"];
      const models = {
        "Honda": ["Civic", "Accord", "Fit", "HR-V", "CR-V"],
        "Toyota": ["Corolla", "Yaris", "Hilux", "RAV4", "Etios"],
        "Ford": ["Ka", "Focus", "EcoSport", "Ranger", "Fiesta"],
        "Chevrolet": ["Onix", "Cruze", "S10", "Tracker", "Spin"],
        "Volkswagen": ["Gol", "Polo", "T-Cross", "Virtus", "Jetta"],
        "Fiat": ["Argo", "Mobi", "Toro", "Strada", "Cronos"],
        "Hyundai": ["HB20", "Creta", "Tucson", "i30", "Santa Fe"],
        "Jeep": ["Renegade", "Compass", "Cherokee", "Wrangler", "Commander"],
        "BMW": ["320i", "X1", "X3", "X5", "118i"],
        "Mercedes": ["Classe A", "Classe C", "GLA", "GLC", "CLA"]
      };
      
      const conditions = ["Excelente", "Bom", "Regular", "Requer reparos"];
      const features = [
        "Ar condicionado", "Direção hidráulica", "Vidros elétricos", 
        "Travas elétricas", "Airbag", "Freios ABS", "Câmera de ré",
        "Sensor de estacionamento", "Bancos em couro", "Teto solar",
        "Central multimídia", "Piloto automático", "Start/Stop",
        "Controle de tração", "Faróis de LED"
      ];
      
      // Seleciona valores aleatórios para simulação
      const make = makes[Math.floor(Math.random() * makes.length)];
      const modelList = models[make as keyof typeof models] || models["Honda"];
      const model = modelList[Math.floor(Math.random() * modelList.length)];
      const year = 2015 + Math.floor(Math.random() * 9); // 2015-2023
      const mileage = Math.floor(Math.random() * 100000) + 10000; // 10k-110k km
      const startingBid = (Math.floor(Math.random() * 150) + 30) * 1000; // R$ 30k-180k
      const condition = conditions[Math.floor(Math.random() * conditions.length)];
      
      // Seleciona 3-7 características aleatórias
      const featureCount = 3 + Math.floor(Math.random() * 5);
      const shuffledFeatures = [...features].sort(() => 0.5 - Math.random());
      const selectedFeatures = shuffledFeatures.slice(0, featureCount);
      
      // Gera uma descrição baseada nos dados
      const descriptions = [
        `Veículo ${make} ${model} ${year} em estado ${condition.toLowerCase()}, com ${mileage} km rodados.`,
        `Oportunidade! ${make} ${model} ano ${year}, bem conservado, completo. Documentação em dia.`,
        `${make} ${model} ${year}, ${condition.toLowerCase()}, único dono, revisões em concessionária.`,
        `Excelente ${make} ${model} ${year}, ${mileage} km, IPVA pago, sem detalhes.`
      ];
      const description = descriptions[Math.floor(Math.random() * descriptions.length)];
      
      // Data de término aleatória entre 3-15 dias a partir de agora
      const daysToEnd = 3 + Math.floor(Math.random() * 13);
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + daysToEnd);
      
      // Retorna objeto com dados extraídos
      return {
        make,
        model,
        year,
        startingBid,
        description,
        imageUrl: `https://source.unsplash.com/featured/?car,${make}${model}`,
        features: selectedFeatures,
        condition,
        mileage,
        endDate
      };
    }
    
    console.error(`Falha ao extrair dados de: ${url}`);
    return null;
  }
  
  /**
   * Extrai dados de múltiplos veículos a partir de várias URLs de leilão
   * 
   * @param urls Lista de URLs de leilão
   * @param progressCallback Função opcional de callback para atualizar o progresso
   * @returns Array com os dados extraídos e estatísticas
   */
  static async extractBatch(
    urls: string[], 
    progressCallback?: (processed: number, total: number, success: number, failed: number) => void
  ): Promise<{
    vehicles: VehicleData[],
    stats: { processed: number, total: number, success: number, failed: number }
  }> {
    const total = urls.length;
    let processed = 0;
    let success = 0;
    let failed = 0;
    const vehicles: VehicleData[] = [];
    
    for (const url of urls) {
      try {
        const data = await this.extractFromUrl(url);
        processed++;
        
        if (data) {
          vehicles.push(data);
          success++;
        } else {
          failed++;
        }
        
        // Chama o callback de progresso, se fornecido
        if (progressCallback) {
          progressCallback(processed, total, success, failed);
        }
        
      } catch (error) {
        console.error(`Erro ao processar ${url}:`, error);
        processed++;
        failed++;
        
        if (progressCallback) {
          progressCallback(processed, total, success, failed);
        }
      }
    }
    
    return {
      vehicles,
      stats: { processed, total, success, failed }
    };
  }
}
