import { formItemClassName } from "@/util/helper";
import { Form, Select } from "antd";
import { Rule } from "antd/es/form";
import { ChangeEvent, useMemo } from "react";

type Props = {
  name: string;
  label?: string;
  mark?: "default" | "yes" | "no";
  rules?: Rule[];
  placeholder?: string;
  initialValue?: any;
  options?: OptionType[];
  onChange?: (
    value: ChangeEvent<HTMLInputElement>,
    option?: OptionType | OptionType[],
  ) => void;
  disabled?: boolean;
};

export default function BaseSelect({
  name,
  label,
  mark = "default",
  rules,
  placeholder = "",
  initialValue,
  options,
  onChange,
  disabled,
}: Props) {
  const className = useMemo(() => formItemClassName(mark), [mark]);

  return (
    <Form.Item
      name={name}
      label={label}
      className={className}
      rules={rules}
      initialValue={initialValue}
    >
      <Select
        className="ant-select__custom"
        placeholder={placeholder}
        options={options}
        popupClassName="ant-select-dropdown__custom"
        onChange={onChange}
        disabled={disabled}
      />
    </Form.Item>
  );
}
