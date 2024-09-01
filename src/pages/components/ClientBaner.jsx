import CreateClientForm from "../form/CreateClientForm";

export const ClientBaner = () => {
  return (
    <div className="grid grid-cols-2">
      <div>
        <div className="fixed">
          <div className="flex flex-col gap-[13rem]">
            <div>
              <h1 className="pt-8 text-2xl mb-4">
                Cadastrar novos <br /> clientes gerenciamento
              </h1>
              <p className="text-sm">
                Gerenciamento de clientes e  <br /> serviço.
                de forma rapida e precisa <br />
                no banco de dados.
              </p>
            </div>
            <div className="w-full h-24 p-4 rounded-xl bg-[#2c2752]">
                <div>
                   <p className="text-xs text-white">Love the experience. Got my <br />business set up and all necessary</p>
                </div>
            </div>
          </div>
        </div>
      </div>
      <CreateClientForm />
    </div>
  );
};
