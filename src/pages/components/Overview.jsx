import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import { useClient } from "@/context/ClientContext";
import { User, DollarSign, PenBox, ServerIcon } from "lucide-react";
import { db } from "@/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

const Overview = () => {
  const [services, setServices] = useState([]);
  const servicesRef = collection(db, "services");

  useEffect(() => {
    const fetchServices = async () => {
      const querySnapshot = await getDocs(servicesRef);
      const servicesData = querySnapshot.docs.map((doc) => doc.data());
      setServices(servicesData);
    };
    fetchServices();
  }, [servicesRef]);

  const { clients } = useClient();
  const cardData = [
    {
      title: "Total clientes",
      value: clients.length,
      change: "+2 adicionados",
      svg: <User size={18} />,
    },
    {
      title: "Serviços",
      value: services.length,
      change: "+0 nos ultimos dias",
      svg: <ServerIcon size={18} />,
    },
    {
      title: "Servicos Agendado",
      value: "0",
      change: "+1 processando",
      svg: <PenBox size={18} />,
    },
    {
      title: "Total de receita",
      value: "0",
      change: "+0 na ultima semana",
      svg: <DollarSign size={18} />,
    },
  ];
  return (
    <Tabs value="overview">
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cardData.map((card, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center pb-4 mb-4 border-b border-zinc-300   justify-between space-y-0">
                <CardTitle className="text-sm font-medium ">
                  {card.title}
                </CardTitle>
                {card.svg}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{card.value}</div>
                <p className="text-xs text-muted-foreground">{card.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default Overview