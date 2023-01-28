import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const daysOfWeek = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const NewHabitForm = () => {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  const createNewHabit = (e: FormEvent) => {
    e.preventDefault();

    if (!title || weekDays.length === 0) {
      alert("Você precisa escrever um compromisso e escolher os dias");

      return;
    };
    
    api.post("habits", {
      title,
      weekDays,
    });
    
    setTitle("");
    setWeekDays([]);
    alert("Hábito criado!");
  };

  const handleWeekDayToggle = (day: number) => {
    if (weekDays.includes(day)) {
      const filteredDays = weekDays.filter((weekDay) => weekDay !== day);
      setWeekDays(filteredDays);
    } else {
      setWeekDays([...weekDays, day]);
    }
  };

  return (
    <form onSubmit={createNewHabit} className="flex flex-col">
      <label className="font-medium">
        <span className="my-2 inline-block">Qual seu comprometimento?</span>
        <input
          className="py-3 px-2 w-full rounded-lg bg-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
          type="text"
          placeholder="Exercícios, dormir bem, etc..."
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label className="mt-4">
        <span className="font-medium">Qual a recorrência?</span>
      </label>
      <div className="mt-2 flex flex-col gap-2">
        {daysOfWeek.map((dayOfWeek, i) => (
          <Checkbox.Root
            key={dayOfWeek + i}
            className="flex items-center gap-2 group focus:outline-none"
            onCheckedChange={() => handleWeekDayToggle(i)}
            checked={weekDays.includes(i)}
          >
            <div className="h-8 w-8 bg-zinc-900 border-2 border-zinc-800 rounded-lg flex justify-center items-center group-data-[state=checked]:bg-green-600 group-data-[state=checked]:border-none transition-colors group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background">
              <Checkbox.Indicator>
                <Check size={20} color="white" weight="bold" />
              </Checkbox.Indicator>
            </div>
            <span className="text-white leading-tight">{dayOfWeek}</span>
          </Checkbox.Root>
        ))}
      </div>

      <button
        type="submit"
        className="bg-green-600 flex gap-2 py-3 items-center justify-center rounded-lg font-medium mt-6 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
};

export default NewHabitForm;
