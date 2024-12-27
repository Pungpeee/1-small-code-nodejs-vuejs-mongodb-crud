import { byteConverter } from "@/util/helper";
import { Button } from "antd";
import { FaFileLines, FaXmark } from "react-icons/fa6";

type Props = {
  name: string;
  items: any;
  onRemove: (index: number) => void;
};

export default function FilesBasket({ name, items, onRemove }: Props) {
  return (
    <div className="flex flex-col gap-1 mt-1">
      {/* {items.map((item: any, i: number) => (
        <div
          key={name + "-" + i}
          className="flex flex-row items-center h-12 gap-4 pl-4 overflow-hidden border rounded-lg border-stone-300"
        >
          <FaFileLines className="flex-none text-xl" />
          <div className="flex flex-col flex-auto gap-1 overflow-hidden">
            <p className="text-base leading-none truncate">
              {item?.data?.data?.fieldname}
            </p>
            <p className="text-sm font-light text-[--c-gray-8] leading-none">
              {byteConverter(item?.data?.data?.size, 0, "MB")}
              {(item?.data?.data?.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <Button
            className="btn-x-only"
            type="link"
            onClick={() => onRemove(i)}
          >
            <FaXmark className="text-[20px]" />
          </Button>
        </div>
      ))} */}
      {items?.length > 0 && (
        <div className="flex flex-row items-center h-12 gap-4 pl-4 overflow-hidden border rounded-lg border-stone-300">
          <FaFileLines className="flex-none text-xl" />
          <div className="flex flex-col flex-auto gap-1 overflow-hidden">
            <p className="text-base leading-none truncate">
              {items[1]?.data?.data?.fieldname}
            </p>
            <p className="text-sm font-light text-[--c-gray-8] leading-none">
              {/* {byteConverter(items[1]?.data?.data?.size, 0, "MB")} */}
              {(items[1]?.data?.data?.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <Button
            className="btn-x-only"
            type="link"
            onClick={() => onRemove(items[1])}
          >
            <FaXmark className="text-[20px]" />
          </Button>
        </div>
      )}
    </div>
  );
}
