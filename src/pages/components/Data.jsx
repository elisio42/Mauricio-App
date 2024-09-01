import { useState } from 'react';
import {
  MoreHorizontal,
  PlusCircle,
  Search
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useClient } from '@/context/ClientContext';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from '@/components/ui/alert-dialog'; // Import AlertDialog components

const Data = () => {
  const { clients, deleteClient } = useClient();
  const [searchValue, setSearchValue] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const filteredClients = clients.filter((client) => {
    const clientName = client.firstName.toLowerCase();
    const clientEmail = client.email.toLowerCase();
    const search = searchValue.toLowerCase();
    return clientName.includes(search) || clientEmail.includes(search);
  });

  const handleViewClient = (client) => {
    setSelectedClient(client);
    setIsAlertDialogOpen(true);
  };

  return (
    <>
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">Lista</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Buscar..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
            <Button size="sm" className="h-12 gap-1 bg-[#E85C0D]">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Adicionar
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Clientes</CardTitle>
              <CardDescription>
                Sistema de Agendamento de servicos pela dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Agenda</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Telefone
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Nacionalidade
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Email
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="hidden sm:table-cell">
                        <div className="">
                          <img className="rounded-lg w-10 h-10 object-cover" src={client.photo} />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {client.firstName}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className='bg-green-200'>{client.appointment}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {client.phoneNumber}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {client.country}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {client.email}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ação</DropdownMenuLabel>
                            <DropdownMenuItem className='cursor-pointer' onClick={() => handleViewClient(client)}>Ver</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>
                              <button onClick={()=> deleteClient(client.id)}>
                                Apagar
                              </button>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              {/* <div className="text-xs text-muted-foreground">
                // Mostrar mais
              </div> */}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AlertDialog for client details */}
      {isAlertDialogOpen && selectedClient && (
        <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button onClick={() => setIsAlertDialogOpen(true)} className="hidden">Show Details</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Detalhes do Cliente</AlertDialogTitle>
              <AlertDialogDescription>
                <div className="flex flex-col gap-4">
                  <img className="w-32 h-32 object-cover rounded-full" src={selectedClient.photo} alt="Client" />
                  <p><strong>Nome:</strong> {selectedClient.firstName} {selectedClient.lastName}</p>
                  <p><strong>Email:</strong> {selectedClient.email}</p>
                  <p><strong>Telefone:</strong> {selectedClient.phoneNumber}</p>
                  <p><strong>Data de Nascimento:</strong> {selectedClient.dateOfBirth}</p>
                  <p><strong>Nacionalidade:</strong> {selectedClient.country}</p>
                  <p><strong>Gênero:</strong> {selectedClient.gender}</p>
                  <p><strong>Passaporte:</strong> {selectedClient.passportNumber} (Expira em {selectedClient.passportExpiryDate})</p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant="outline" onClick={() => setIsAlertDialogOpen(false)}>Fechar</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default Data;