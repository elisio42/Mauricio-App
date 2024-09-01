import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
  } from "@/components/ui/tooltip";
  import { LogOut } from "lucide-react";
  import { useUser } from '@/context/UserContext'
  import Header from "./components/Header";
  import Sidebar from "./components/Sidebar";
import CreateClientForm from "./form/CreateClientForm";
import { ClientBaner } from "./components/ClientBaner";

  
const RegisterPage = () => {
    const { signOutUser } = useUser()
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="bg-white fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <Header />
          <nav className="mt-auto bg-white flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={()=> signOutUser()}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Sair</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Sair</TooltipContent>
            </Tooltip>
          </nav>
        </aside>
  
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Sidebar />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <ClientBaner />
          </main>
        </div>
      </div>
    )
  }
  
  export default RegisterPage