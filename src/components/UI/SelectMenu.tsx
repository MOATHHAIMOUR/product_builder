import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";
import { categories } from "../../data";
import { ICategory } from "../../interfaces";

interface IProps {
  selected: { name: string; imageURL: string } | null;
  setSelected: (category: { name: string; imageURL: string } | null) => void;
}

export default function SelectMenu({ setSelected, selected }: IProps) {
  const [query, setQuery] = useState<string>("");

  const filteredCategories =
    query === ""
      ? categories
      : categories.filter((category) =>
          category.name.toLowerCase().includes(query.toLocaleLowerCase()),
        );

  return (
    <div className="rounded-md bg-slate-800">
      <Combobox
        value={selected}
        onChange={(value) => setSelected(value)}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              "w-full rounded-lg border-none bg-white/5 py-1.5 pl-3 pr-8 text-sm/6 text-white",
              "data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 focus:outline-none",
            )}
            displayValue={(cate: ICategory) => cate?.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          transition
          className={clsx(
            "h-32 w-[var(--input-width)] overflow-y-auto rounded-xl border border-white/5 bg-white/5 p-1 scrollbar-none [--anchor-gap:var(--spacing-1)] empty:invisible",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
          )}
        >
          {filteredCategories.map((category) => (
            <ComboboxOption
              key={category?.id}
              value={category}
              className="group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-red-400"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
              <img
                className="h-6 w-6 rounded-full"
                src={category?.imageURL}
                alt={category?.name}
              />
              <div className="text-sm/6 text-white">{category?.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
