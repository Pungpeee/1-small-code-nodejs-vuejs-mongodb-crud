export function byteConverter(
  bytes: number,
  decimals: number,
  only?: SizeType
) {
  const K_UNIT = 1024;
  const SIZES: SizeType[] = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

  if (bytes == 0) return "0 Byte";

  if (only === "MB") {
    return (bytes / (K_UNIT * K_UNIT)).toFixed(decimals) + "MB";
  }

  let i = Math.floor(Math.log(bytes) / Math.log(K_UNIT));
  let resp =
    parseFloat((bytes / Math.pow(K_UNIT, i)).toFixed(decimals)) + SIZES[i];

  return resp;
}

export function formItemClassName(mark?: "default" | "yes" | "no") {
  let cn = "ant-form-item__custom";
  switch (mark) {
    case "yes":
      cn += " with-star";
      break;
    case "no":
      cn += " without-star";
      break;
    default:
      break;
  }
  return cn;
}
