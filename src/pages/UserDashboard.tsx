
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Clock, FilePlus, User, FileCheck, FileWarning, Car, Timer } from "lucide-react";

const UserDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  
  // For demo purposes, we'll assume the user hasn't uploaded any documents yet
  const [documentsStatus, setDocumentsStatus] = useState({
    isVerified: false,
    isRejected: false,
    isPending: false,
    hasRg: false,
    hasCnh: false,
    hasAddress: false,
  });
  
  const handleFileUpload = (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    // Simulate file upload
    setIsUploading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsUploading(false);
      
      if (type === 'rg') {
        setDocumentsStatus(prev => ({ ...prev, hasRg: true }));
      } else if (type === 'cnh') {
        setDocumentsStatus(prev => ({ ...prev, hasCnh: true }));
      } else if (type === 'address') {
        setDocumentsStatus(prev => ({ ...prev, hasAddress: true }));
      }
      
      // If all documents are uploaded, set status to pending
      if ((type === 'rg' && documentsStatus.hasCnh && documentsStatus.hasAddress) ||
          (type === 'cnh' && documentsStatus.hasRg && documentsStatus.hasAddress) ||
          (type === 'address' && documentsStatus.hasRg && documentsStatus.hasCnh)) {
        setDocumentsStatus(prev => ({ ...prev, isPending: true }));
      }
      
      toast({
        title: "Documento enviado",
        description: "Seu documento foi enviado e está aguardando verificação.",
      });
    }, 2000);
  };
  
  const allDocumentsUploaded = documentsStatus.hasRg && documentsStatus.hasCnh && documentsStatus.hasAddress;
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Minha Conta</h1>
        
        <div className="grid gap-6 lg:grid-cols-4">
          {/* User Info */}
          <Card className="col-span-4 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-xl">Informações do Usuário</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{user?.name}</h3>
                <p className="text-gray-500">{user?.email}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Status da Verificação</p>
                  {user?.isVerified ? (
                    <Badge className="w-full justify-center py-1 bg-green-600">Verificado</Badge>
                  ) : documentsStatus.isRejected ? (
                    <Badge className="w-full justify-center py-1 bg-red-600">Rejeitado</Badge>
                  ) : documentsStatus.isPending ? (
                    <Badge className="w-full justify-center py-1 bg-yellow-600">Em Análise</Badge>
                  ) : (
                    <Badge className="w-full justify-center py-1 bg-gray-600">Pendente</Badge>
                  )}
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Documentos</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">RG/Identidade</span>
                      {documentsStatus.hasRg ? (
                        <FileCheck className="h-4 w-4 text-green-600" />
                      ) : (
                        <FileWarning className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">CNH</span>
                      {documentsStatus.hasCnh ? (
                        <FileCheck className="h-4 w-4 text-green-600" />
                      ) : (
                        <FileWarning className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Comprovante de Residência</span>
                      {documentsStatus.hasAddress ? (
                        <FileCheck className="h-4 w-4 text-green-600" />
                      ) : (
                        <FileWarning className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" disabled>
                  Editar Perfil
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Main Content */}
          <div className="col-span-4 lg:col-span-3">
            <Tabs defaultValue="documents">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="documents">Documentos</TabsTrigger>
                <TabsTrigger value="bids">Meus Lances</TabsTrigger>
                <TabsTrigger value="won">Arremates</TabsTrigger>
              </TabsList>
              
              {/* Documents Tab */}
              <TabsContent value="documents">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Upload de Documentos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <FileWarning className="h-5 w-5 text-yellow-600" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              {allDocumentsUploaded ? (
                                "Todos os documentos foram enviados e estão aguardando verificação. Este processo pode levar até 24 horas."
                              ) : (
                                "Para participar dos leilões, você precisa enviar todos os documentos abaixo para verificação."
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid gap-6 md:grid-cols-3">
                        {/* RG Upload */}
                        <div className="p-4 border border-gray-200 rounded-md">
                          <div className="flex flex-col items-center text-center">
                            <div className={`h-12 w-12 mb-3 rounded-full flex items-center justify-center ${documentsStatus.hasRg ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                              <FilePlus className="h-6 w-6" />
                            </div>
                            <h3 className="text-base font-medium mb-1">RG / Identidade</h3>
                            <p className="text-xs text-gray-500 mb-3">
                              Documento de identidade válido, frente e verso
                            </p>
                            
                            <div className="w-full">
                              {documentsStatus.hasRg ? (
                                <>
                                  <Badge className="w-full justify-center py-1 bg-green-600 mb-2">Enviado</Badge>
                                  <Button 
                                    variant="outline" 
                                    className="w-full text-xs" 
                                    size="sm"
                                  >
                                    Ver documento
                                  </Button>
                                </>
                              ) : (
                                <div className="space-y-2">
                                  <Label htmlFor="rg-upload" className="sr-only">Enviar RG</Label>
                                  <Input
                                    id="rg-upload"
                                    type="file"
                                    className="text-xs"
                                    accept=".jpg,.jpeg,.png,.pdf"
                                    onChange={handleFileUpload('rg')}
                                    disabled={isUploading}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* CNH Upload */}
                        <div className="p-4 border border-gray-200 rounded-md">
                          <div className="flex flex-col items-center text-center">
                            <div className={`h-12 w-12 mb-3 rounded-full flex items-center justify-center ${documentsStatus.hasCnh ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                              <FilePlus className="h-6 w-6" />
                            </div>
                            <h3 className="text-base font-medium mb-1">CNH</h3>
                            <p className="text-xs text-gray-500 mb-3">
                              Carteira Nacional de Habilitação válida
                            </p>
                            
                            <div className="w-full">
                              {documentsStatus.hasCnh ? (
                                <>
                                  <Badge className="w-full justify-center py-1 bg-green-600 mb-2">Enviado</Badge>
                                  <Button 
                                    variant="outline" 
                                    className="w-full text-xs" 
                                    size="sm"
                                  >
                                    Ver documento
                                  </Button>
                                </>
                              ) : (
                                <div className="space-y-2">
                                  <Label htmlFor="cnh-upload" className="sr-only">Enviar CNH</Label>
                                  <Input
                                    id="cnh-upload"
                                    type="file"
                                    className="text-xs"
                                    accept=".jpg,.jpeg,.png,.pdf"
                                    onChange={handleFileUpload('cnh')}
                                    disabled={isUploading}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Address Upload */}
                        <div className="p-4 border border-gray-200 rounded-md">
                          <div className="flex flex-col items-center text-center">
                            <div className={`h-12 w-12 mb-3 rounded-full flex items-center justify-center ${documentsStatus.hasAddress ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                              <FilePlus className="h-6 w-6" />
                            </div>
                            <h3 className="text-base font-medium mb-1">Comprovante de Residência</h3>
                            <p className="text-xs text-gray-500 mb-3">
                              Conta de água, luz ou telefone (últimos 3 meses)
                            </p>
                            
                            <div className="w-full">
                              {documentsStatus.hasAddress ? (
                                <>
                                  <Badge className="w-full justify-center py-1 bg-green-600 mb-2">Enviado</Badge>
                                  <Button 
                                    variant="outline" 
                                    className="w-full text-xs" 
                                    size="sm"
                                  >
                                    Ver documento
                                  </Button>
                                </>
                              ) : (
                                <div className="space-y-2">
                                  <Label htmlFor="address-upload" className="sr-only">Enviar Comprovante</Label>
                                  <Input
                                    id="address-upload"
                                    type="file"
                                    className="text-xs"
                                    accept=".jpg,.jpeg,.png,.pdf"
                                    onChange={handleFileUpload('address')}
                                    disabled={isUploading}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Bids Tab */}
              <TabsContent value="bids">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Meus Lances</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                          <Timer className="h-8 w-8 text-gray-500" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Nenhum lance registrado</h3>
                        <p className="text-gray-500 mb-4">
                          Você ainda não deu lances em nenhum leilão.
                        </p>
                        <Button asChild className="bg-primary hover:bg-primary/90">
                          <a href="/auctions">Ver leilões ativos</a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Won Tab */}
              <TabsContent value="won">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Meus Arremates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                          <Car className="h-8 w-8 text-gray-500" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Nenhum arremate</h3>
                        <p className="text-gray-500 mb-4">
                          Você ainda não arrematou nenhum veículo.
                        </p>
                        <Button asChild className="bg-primary hover:bg-primary/90">
                          <a href="/auctions">Ver leilões ativos</a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
