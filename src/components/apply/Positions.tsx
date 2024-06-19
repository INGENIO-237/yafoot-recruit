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
import { POSITIONS } from "@/lib/enums";

const positions = [
  ...Object.keys(POSITIONS).map((city) => {
    return { label: city, value: city };
  }),
];

export default function Positions({
  value,
  setPosition,
}: {
  value: string;
  setPosition: Dispatch<SetStateAction<string>>;
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
            ? positions.find((position) => position.value === value)?.label
            : "Select position..."}
          {/* <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 -left-[30px]">
        <Command className="md:w-[400px] ">
          <CommandInput
            placeholder="Search position..."
            className="h-9 w-[500px]"
          />
          <CommandList>
            <CommandEmpty>No position found.</CommandEmpty>
            <CommandGroup>
              {positions.map((position) => (
                <CommandItem
                  key={position.value}
                  value={position.value}
                  onSelect={(currentValue) => {
                    setPosition(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {position.label}
                  {/* <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === position.value ? "opacity-100" : "opacity-0"
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
