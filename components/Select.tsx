import React from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { Level, SelectedValue } from "../pages";

const classnames = (...classes: string[]) => classes.filter(Boolean).join(" ");


interface Props {
  label: string;
  values: string[];
  setSelectedValue: React.Dispatch<React.SetStateAction<SelectedValue | Level>>;
  placeholder: string;
}

const SelectDemo: React.FC<Props> = ({ label, values, setSelectedValue, placeholder }) => {
  function handleValueChange(newValue: string) {
    setSelectedValue(newValue as SelectedValue);
  }

  return (

    <Select.Root onValueChange={handleValueChange}>
      <Select.Trigger
        className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet-500 shadow-[0_2px_10px] shadow-black/10 hover:bg-slate-100 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-slate-600 outline-none"
        aria-label="Select a color"
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="text-violet-500">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet-500 cursor-default">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[5px]">
            <Select.Group>
              <Select.Label className="px-[25px] text-xs leading-[25px] text-violet-600">
                {label}
              </Select.Label>
              {values.map((value) => (
                <SelectItem key={value} value={value.toLowerCase()}>{value}</SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
};

interface SelectItemProps {
  children: React.ReactNode;
  className?: string;
  value?: string;
  [propName: string]: any;
}

const SelectItem = React.forwardRef(
  (
    { children, className, value, ...props }: SelectItemProps,
    forwardedRef: React.Ref<HTMLDivElement>
  ) => {
    return (
      <Select.Item
        className={classnames(
          "text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1",
          className as string
        )}
        {...props}
        ref={forwardedRef}
        value={value as string}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default SelectDemo;
