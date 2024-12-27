import Label from "@/components/label";
import { Button } from "antd";
import { ChangeEvent } from "react";
import { IoMdAttach } from "react-icons/io";

type Props = {
  name: string;
  label?: string;
  accept?: string;
  onChange?: (files: File[]) => void;
  mark?: boolean;
};

export default function BaseUpload({
  name,
  label,
  accept = ".doc, .docx, image/jpeg, image/jpg, image/png, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf",
  onChange,
  mark,
}: Props) {
  const elementId = name ? `input-upload-${name}` : "input-upload";

  const clearFileInput = (inputElement: HTMLInputElement) => {
    try {
      inputElement.value = "";
    } catch (ex) {}
    if (inputElement?.parentNode && inputElement?.value) {
      inputElement.parentNode.replaceChild(
        inputElement.cloneNode(true),
        inputElement
      );
    }
  };

  const onClick = () => {
    const inputElement = document.getElementById(elementId) as HTMLInputElement;
    if (inputElement) {
      clearFileInput(inputElement);
      inputElement.click();
    }
  };

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const inputFiles = event.target.files;
    if (onChange && inputFiles) {
      const files: File[] = [];
      for (let i = 0; i < inputFiles.length; i++) {
        files.push(inputFiles[i]);
      }
      onChange(files);
    }
  }

  return (
    <div className="relative">
      <input
        id={elementId}
        className="absolute invisible w-0 h-0"
        type="file"
        multiple
        accept={accept}
        onChange={handleChange}
      />
      {label && <Label mark={mark}>{label}</Label>}
      <Button
        className="!justify-between inline w-full text-left ant-btn__custom !text-base"
        onClick={onClick}
      >
        <span>กรุณาเลือกไฟล์เพื่ออัปโหลด</span>
        <IoMdAttach className="text-xl font-bold" />
      </Button>
    </div>
  );
}
