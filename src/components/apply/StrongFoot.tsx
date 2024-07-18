// import { CaretSortIcon, CheckIcon } from "react-icons"

// import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dispatch, SetStateAction, useState } from "react";
import { STRONG_FOOT } from "@/lib/enums";

const foots = [
  ...Object.keys(STRONG_FOOT).map((city) => {
    return { label: city, value: city };
  }),
];

export default function StrongFoot({
  value,
  setStrongFoot,
}: {
  value: string;
  setStrongFoot: Dispatch<SetStateAction<string>>;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  //   const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between text-black"
        >
          {value
            ? foots.find((city) => city.value === value)?.label
            : "Sélectionnez un pied fort..."}
          {/* <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 -left-[30px]">
        <Command className="md:w-[400px] ">
          <CommandInput
            placeholder="Rechercher un pied fort..."
            className="h-9 w-[500px]"
          />
          <CommandList>
            <CommandEmpty>Aucun pied fort trouvé.</CommandEmpty>
            <CommandGroup>
              {foots.map((city) => (
                <CommandItem
                  key={city.value}
                  value={city.value}
                  onSelect={(currentValue) => {
                    setStrongFoot(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {city.label}
                  {/* <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === city.value ? "opacity-100" : "opacity-0"
                    )}
                  /> */}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
