import * as Select from "@radix-ui/react-select";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import React, { PropsWithChildren } from "react";

const SelectItem = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<Select.SelectItemProps>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className={"SelectItem " + className}
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="SelectItemIndicator">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

SelectItem.displayName = "SelectItem";

interface SelectFieldProps extends Select.SelectProps {
  options: string[];
  placeholder?: string;
}

export default function SelectField({
  options,
  placeholder,
  ...props
}: SelectFieldProps) {
  return (
    <Select.Root {...props}>
      <Select.Trigger className="SelectTrigger" aria-label="Food">
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="SelectIcon">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="SelectContent">
          <Select.ScrollUpButton className="SelectScrollButton">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="SelectViewport">
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
