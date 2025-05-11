
import { useState } from "react";
import { 
  FileCheck, 
  FileX, 
  Search, 
  Filter, 
  ChevronDown, 
  CheckCircle, 
  XCircle,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

// Mock data for document verification
const mockDocuments = [
  {
    id: "doc-001",
    userId: "user-123",
    userName: "João Silva",
    documentType: "CNH",
    status: "pending",
    submittedAt: "2025-04-30T15:30:00",
    documentUrl: "/documents/cnh-123.pdf"
  },
  {
    id: "doc-002",
    userId: "user-456",
    userName: "Maria Souza",
    documentType: "RG",
    status: "verified",
    submittedAt: "2025-04-29T12:15:00",
    verifiedAt: "2025-04-30T09:45:00",
    documentUrl: "/documents/rg-456.pdf"
  },
  {
    id: "doc-003",
    userId: "user-789",
    userName: "Carlos Ferreira",
    documentType: "Comprovante de Residência",
    status: "rejected",
    submittedAt: "2025-04-28T10:00:00",
    rejectedAt: "2025-04-29T14:20:00",
    rejectionReason: "Documento ilegível",
    documentUrl: "/documents/comprovante-789.pdf"
  },
  {
    id: "doc-004",
    userId: "user-101",
    userName: "Ana Oliveira",
    documentType: "CNH",
    status: "pending",
    submittedAt: "2025-05-01T09:30:00",
    documentUrl: "/documents/cnh-101.pdf"
  },
  {
    id: "doc-005",
    userId: "user-202",
    userName: "Roberto Almeida",
    documentType: "RG",
    status: "verified",
    submittedAt: "2025-04-27T16:45:00",
    verifiedAt: "2025-04-28T11:30:00",
    documentUrl: "/documents/rg-202.pdf"
  }
];

type DocumentStatus = "all" | "pending" | "verified" | "rejected";

const DocumentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<DocumentStatus>("all");
  const [selectedDocument, setSelectedDocument] = useState<typeof mockDocuments[0] | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { toast } = useToast();

  // Filter documents based on search query and status
  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch = 
      doc.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.documentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const openDocumentDetails = (document: typeof mockDocuments[0]) => {
    setSelectedDocument(document);
    setIsDialogOpen(true);
  };

  const handleApproveDocument = () => {
    if (!selectedDocument) return;
    
    // In a real implementation, this would call an API
    toast({
      title: "Documento aprovado",
      description: `O documento ${selectedDocument.documentType} de ${selectedDocument.userName} foi aprovado com sucesso.`,
    });
    
    setIsDialogOpen(false);
  };

  const handleRejectDocument = () => {
    if (!selectedDocument || !rejectionReason.trim()) return;
    
    // In a real implementation, this would call an API
    toast({
      title: "Documento rejeitado",
      description: `O documento ${selectedDocument.documentType} de ${selectedDocument.userName} foi rejeitado.`,
      variant: "destructive",
    });
    
    setRejectionReason("");
    setIsDialogOpen(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>Verificado</span>
          </div>
        );
      case "rejected":
        return (
          <div className="flex items-center text-red-600">
            <XCircle className="h-4 w-4 mr-1" />
            <span>Rejeitado</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center text-amber-500">
            <FileCheck className="h-4 w-4 mr-1" />
            <span>Pendente</span>
          </div>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Verificação de Documentos</h1>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por nome ou tipo..."
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Status</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuCheckboxItem
                checked={statusFilter === "all"}
                onCheckedChange={() => setStatusFilter("all")}
              >
                Todos
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter === "pending"}
                onCheckedChange={() => setStatusFilter("pending")}
              >
                Pendentes
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter === "verified"}
                onCheckedChange={() => setStatusFilter("verified")}
              >
                Verificados
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter === "rejected"}
                onCheckedChange={() => setStatusFilter("rejected")}
              >
                Rejeitados
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Documentos ({filteredDocuments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Usuário</TableHead>
                  <TableHead>Tipo de Documento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[180px]">Data de Envio</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      Nenhum documento encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDocuments.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell className="font-medium">{document.userName}</TableCell>
                      <TableCell>{document.documentType}</TableCell>
                      <TableCell>{getStatusBadge(document.status)}</TableCell>
                      <TableCell>{formatDate(document.submittedAt)}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openDocumentDetails(document)}
                          className="h-8"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Visualizar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Document Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Documento</DialogTitle>
          </DialogHeader>
          
          {selectedDocument && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Usuário</p>
                  <p>{selectedDocument.userName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tipo de Documento</p>
                  <p>{selectedDocument.documentType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p>{getStatusBadge(selectedDocument.status)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Data de Envio</p>
                  <p>{formatDate(selectedDocument.submittedAt)}</p>
                </div>
                
                {selectedDocument.status === "verified" && selectedDocument.verifiedAt && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Data de Verificação</p>
                    <p>{formatDate(selectedDocument.verifiedAt)}</p>
                  </div>
                )}
                
                {selectedDocument.status === "rejected" && selectedDocument.rejectedAt && (
                  <>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Data de Rejeição</p>
                      <p>{formatDate(selectedDocument.rejectedAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Motivo da Rejeição</p>
                      <p>{selectedDocument.rejectionReason}</p>
                    </div>
                  </>
                )}
              </div>
              
              <div className="border rounded-md bg-slate-50 aspect-[16/9] flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-muted-foreground">Visualização do documento</p>
                  <p className="text-xs text-muted-foreground">Em uma implementação real, o documento seria exibido aqui</p>
                </div>
              </div>

              {selectedDocument.status === "pending" && (
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Button 
                      className="w-full" 
                      variant="default"
                      onClick={handleApproveDocument}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Aprovar Documento
                    </Button>
                    <Button 
                      className="w-full" 
                      variant="destructive"
                      onClick={handleRejectDocument}
                      disabled={!rejectionReason.trim()}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Rejeitar Documento
                    </Button>
                  </div>
                  
                  <div>
                    <p className="mb-2 text-sm font-medium">Motivo da rejeição (obrigatório para rejeitar)</p>
                    <Input 
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Informe o motivo da rejeição"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentsPage;
