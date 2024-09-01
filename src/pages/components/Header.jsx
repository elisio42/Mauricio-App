import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Package2, Home, BookCopy, Layers3, UserPen } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Link } from 'react-router-dom';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from '@/components/ui/alert-dialog'; // Import AlertDialog components
import CreateClientForm from '../form/CreateClientForm'; // Import the CreateClientForm component

const navigationItems = [
  {
    icon: '/image.svg',
    label: 'Acme Inc',
    className: 'group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base',
  },
  {
    link: '/dashboard',
    icon: Home,
    label: 'Dashboard',
    className: 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
  },
  {
    link: '/agenda',
    icon: BookCopy,
    label: 'Agenda',
    className: 'flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
  },
  {
    icon: Layers3,
    label: 'Servicos',
    className: 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
  },
  {
    icon: UserPen,
    label: 'Clientes',
    className: 'flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
    link: '/cadastrar',
  },
];

const Header = () => {
  return (
    <>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        {navigationItems.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              {item.openForm ? (
                <div
                  className={item.className}
                  aria-label={item.label}
                  onClick={() => setIsAlertDialogOpen(true)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </div>
              ) : item.link ? (
                <Link to={item.link} className={item.className} aria-label={item.label}>
                  {typeof item.icon === 'string' ? (
                    <img src={item.icon} alt={item.label} className="h-5 w-5" />
                  ) : (
                    <item.icon className="h-5 w-5" />
                  )}
                  <span className="sr-only">{item.label}</span>
                </Link>
              ) : (
                <div className={item.className} aria-label={item.label}>
                  {typeof item.icon === 'string' ? (
                    <img src={item.icon} alt={item.label} className="h-5 w-5" />
                  ) : (
                    <item.icon className="h-5 w-5" />
                  )}
                  <span className="sr-only">{item.label}</span>
                </div>
              )}
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
    </>
  );
};

export default Header;
