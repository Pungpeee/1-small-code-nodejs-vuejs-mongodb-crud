import { formItemClassName } from "@/util/helper";
import { Form, Input } from "antd";
import { Rule } from "antd/es/form";
import { ChangeEvent, useMemo } from "react";

type Props = {
  name: string;
  label?: string;
  mark?: "default" | "yes" | "no";
  rules?: Rule[];
  placeholder?: string;
  initialValue?: any;
  maxLength?: number;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  autoSize?:
    | boolean
    | {
        minRows?: number;
        maxRows?: number;
      };
};

export default function BaseTextarea({
  name,
  label,
  mark = "default",
  rules,
  placeholder = "กรุณากรอก",
  initialValue,
  maxLength = 350,
  onChange,
  disabled,
  autoSize = { minRows: 2, maxRows: 6 },
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
      <Input.TextArea
        className="ant-input__custom ant-textarea__custom"
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={onChange}
        disabled={disabled}
        autoSize={autoSize}
      />
    </Form.Item>
  );
}
