
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Car, 
  Users, 
  FileCheck, 
  Clock, 
  DollarSign, 
  ArrowUp, 
  ArrowDown,
  BarChart 
} from "lucide-react";
import { formatCurrency } from "@/lib/format";

const AdminDashboard = () => {
  // Mock data for dashboard
  const stats = {
    totalAuctions: 48,
    activeAuctions: 12,
    totalVehicles: 52,
    totalUsers: 516,
    pendingVerifications: 8,
    totalBids: 872,
    totalRevenue: 2450000,
    revenueChange: 23.5,
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Painel de Administração</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Vehicles */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-md mr-4">
                <Car className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total de Veículos</p>
                <h3 className="text-2xl font-bold">{stats.totalVehicles}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Auctions */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-md mr-4">
                <Clock className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Leilões Ativos</p>
                <h3 className="text-2xl font-bold">{stats.activeAuctions}</h3>
                <p className="text-xs text-gray-500">
                  De {stats.totalAuctions} leilões totais
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Users */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-md mr-4">
                <Users className="h-6 w-6 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Usuários Cadastrados</p>
                <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
                <p className="text-xs text-gray-500">
                  {stats.pendingVerifications} verificações pendentes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-amber-100 rounded-md mr-4">
                <DollarSign className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Receita Total</p>
                <h3 className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</h3>
                <p className={`text-xs flex items-center ${
                  stats.revenueChange > 0 
                    ? "text-green-600" 
                    : "text-red-600"
                }`}>
                  {stats.revenueChange > 0 
                    ? <ArrowUp className="h-3 w-3 mr-1" /> 
                    : <ArrowDown className="h-3 w-3 mr-1" />
                  }
                  {Math.abs(stats.revenueChange)}% no último mês
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-2 border-green-500 pl-4 py-1">
                <p className="text-sm font-medium">Novo lance registrado</p>
                <p className="text-xs text-gray-500">Honda Civic Touring 2022 - R$ 98.500,00</p>
                <p className="text-xs text-gray-500">Há 5 minutos</p>
              </div>
              <div className="border-l-2 border-blue-500 pl-4 py-1">
                <p className="text-sm font-medium">Novo usuário cadastrado</p>
                <p className="text-xs text-gray-500">Maria Silva (maria@email.com)</p>
                <p className="text-xs text-gray-500">Há 1 hora</p>
              </div>
              <div className="border-l-2 border-amber-500 pl-4 py-1">
                <p className="text-sm font-medium">Leilão encerrado</p>
                <p className="text-xs text-gray-500">Toyota Corolla XEi 2021 - Arrematado por R$ 94.000,00</p>
                <p className="text-xs text-gray-500">Há 2 horas</p>
              </div>
              <div className="border-l-2 border-purple-500 pl-4 py-1">
                <p className="text-sm font-medium">Documentos enviados para verificação</p>
                <p className="text-xs text-gray-500">João Santos (joao@email.com)</p>
                <p className="text-xs text-gray-500">Há 3 horas</p>
              </div>
              <div className="border-l-2 border-green-500 pl-4 py-1">
                <p className="text-sm font-medium">Novo veículo cadastrado</p>
                <p className="text-xs text-gray-500">Jeep Compass Limited 2021</p>
                <p className="text-xs text-gray-500">Há 5 horas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Requests */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Verificações Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-xs font-medium">JS</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">João Santos</p>
                    <p className="text-xs text-gray-500">Enviado há 3 horas</p>
                  </div>
                </div>
                <FileCheck className="h-5 w-5 text-amber-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-xs font-medium">AL</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ana Lima</p>
                    <p className="text-xs text-gray-500">Enviado há 5 horas</p>
                  </div>
                </div>
                <FileCheck className="h-5 w-5 text-amber-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-xs font-medium">CF</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Carlos Ferreira</p>
                    <p className="text-xs text-gray-500">Enviado há 12 horas</p>
                  </div>
                </div>
                <FileCheck className="h-5 w-5 text-amber-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-xs font-medium">RS</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Roberta Silva</p>
                    <p className="text-xs text-gray-500">Enviado há 1 dia</p>
                  </div>
                </div>
                <FileCheck className="h-5 w-5 text-amber-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-xs font-medium">PM</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pedro Moreira</p>
                    <p className="text-xs text-gray-500">Enviado há 2 dias</p>
                  </div>
                </div>
                <FileCheck className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
