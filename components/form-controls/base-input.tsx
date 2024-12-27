import { formItemClassName } from "@/util/helper";
import { Form, Input } from "antd";
import { Rule } from "antd/es/form";
import { ChangeEvent, KeyboardEvent, useMemo } from "react";

type Props = {
  name: string;
  label?: string;
  mark?: "default" | "yes" | "no";
  rules?: Rule[];
  placeholder?: string;
  type?: "text" | "number" | "password";
  initialValue?: any;
  maxLength?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoComplete?: string;
};

export default function BaseInput({
  name,
  label,
  mark = "default",
  rules,
  placeholder = "กรุณากรอก",
  type = "text",
  initialValue,
  maxLength = 50,
  onChange,
  disabled,
  autoComplete,
}: Props) {
  let Element = null;
  switch (type) {
    case "password":
      Element = Input.Password;
      break;
    default:
      Element = Input;
      break;
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    switch (type) {
      case "number":
        const charCode = event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          event.preventDefault();
        }
        return true;
      case "password":
        if (/[A-Za-z\d@.#$!%*?&]$/.test(event.key)) return true;
        event.preventDefault();
        break;
      default:
        return true;
    }
  }

  const className = useMemo(() => formItemClassName(mark), [mark]);

  return (
    <Form.Item
      name={name}
      label={label}
      className={className}
      rules={rules}
      initialValue={initialValue}
    >
      <Element
        className="ant-input__custom"
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        maxLength={maxLength}
        onChange={onChange}
        disabled={disabled}
        autoComplete={autoComplete}
      />
    </Form.Item>
  );
}
