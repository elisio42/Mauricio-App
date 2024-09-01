import { useUser } from "@/context/UserContext";
import SignInForm from "./form/SignInForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignPage = () => {
  const { user } = useUser();
  const nav = useNavigate();
  
  useEffect(()=> {
    if (user !== null) {
        nav('/dashboard', { replace: true })
    }
  }, [user, nav])

  return (
    <>
      <div className="container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-[100vh] flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute left-0 bottom-0">
            <img src="/login.jpg" alt="" />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Faça login com suas credenciais abaixo. Se você é um novo usuário, 
                entre em contato com o suporte para obter acesso ao sistema.&rdquo;
              </p>
              <footer className="text-sm">Elisio Augusto</footer>
            </blockquote>
          </div>
        </div>

        <div className="lg:p-8 mx-5">
          <div className="mx-autoflex w-full flex-col justify-center space-y-2 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-left">
              <img src="/image.svg" className='mb-4' width={40} />

              <p className="text-sm text-muted-foreground mb-4">
                Digite seu e-mail e senha abaixo <br />
                para fazer login na sua conta
              </p>
            </div>

            <SignInForm />

            <p className="px-8 text-center text-sm text-muted-foreground">
            Entrando, você concorda com nossos {" "}
              <a
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
               Termos de Serviço 
              </a>{" "}
              e{" "}
              <a
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Política de Privacidade ✌🏾
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignPage;
