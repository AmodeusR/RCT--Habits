import { Plus, X } from "phosphor-react";
import logoImage from "../assets/logo.svg";
import * as Dialog from "@radix-ui/react-dialog";
import NewHabitForm from "./NewHabitForm";

const Header = () => {
  return (
    <header className="flex justify-between items-center max-w-3xl mx-auto w-full">
      <img src={logoImage} alt="Habits logo" />

      <Dialog.Root>
        <Dialog.Trigger
          className="font-medium border-violet-500 border px-5 py-3 rounded-lg flex gap-2 items-center group hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background"
          type="button"
        >
          <Plus
            size={20}
            className="text-violet-500 group-hover:text-violet-300 transition-colors"
          />
          Novo Hábito
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className=" w-screen h-screen bg-black/50 fixed inset-0" />
          <Dialog.Content className="flex flex-col p-10 bg-zinc-900 rounded-lg w-full max-w-md text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Dialog.Close className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900 rounded-lg">
              <X size={24} aria-label="Fechar" />
            </Dialog.Close>
            <Dialog.Title className="text-3xl font-bold mb-4">
              Criar hábito
            </Dialog.Title>
            <NewHabitForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
};
export default Header;
