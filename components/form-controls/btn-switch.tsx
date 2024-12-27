import Label from "@/components/label";
import _ from "lodash";

type Props = {
  type?: "edge" | "round";
  label?: string;
  state: number | string | boolean;
  values: [string, string] | [number, number] | [true, false];
  labels: [string, string];
  onToggle: (val: any) => void;
  mark?: boolean;
};

export default function BTNSwitch({
  type = "round",
  label,
  state,
  values,
  labels,
  onToggle,
  mark,
}: Props) {
  return (
    <div>
      {label && <Label mark={mark}>{label}</Label>}
      <div
        className={`flex flex-row border-[--c-gray-7] overflow-hidden ${
          type === "edge" ? "border-y" : "border rounded-lg"
        }`}
      >
        {_.range(2).map((i) => (
          <button
            key={"switch-button-" + i}
            className={`h-11 border-none border-radius-0 p-0 basis-1/2 ${
              state === values[i]
                ? "text-white bg-[--c-blue]"
                : "text-[--c-black] bg-white"
            }`}
            onClick={() => onToggle(values[i])}
          >
            {labels[i]}
          </button>
        ))}
        <div className=""></div>
      </div>
    </div>
  );
}
