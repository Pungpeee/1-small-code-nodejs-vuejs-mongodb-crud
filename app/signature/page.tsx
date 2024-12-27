"use client";
import { useGlobalContext } from "@/context/store";
import api from "@/services";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import Swal from "sweetalert2";

export default function SignaturePage() {
  const router = useRouter();
  const { setFormData, formData } = useGlobalContext();
  const [imageURL, setImageURL] = useState("");
  const sigCanvas = useRef({} as SignatureCanvas);

  const toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
  });

  const handleFileUpload = async (event: any, fileName = "") => {
    let formData: any = new FormData();
    formData.append("file", event, fileName);
    let res: any;
    try {
      res = await api.post.uploadFile(formData);
    } catch (error) {
      console.log(error);
    }
    return res;
  };
  const clear = () => sigCanvas.current.clear();

  const save = async () => {
    // setImageURL(sigCanvas.current.getCanvas().toDataURL("image/png"));
    // const upload = await handleFileUpload(imageURL, "name");
    try {
      const res = await api.post.postSiteList({
        ...formData,
        signature: "url",
      });
      if (res?.status === 201) {
        router.push("/applied");
      }
    } catch (e) {
      console.log(e);
      toast.fire({
        icon: "error",
        text: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
        padding: "10px 20px",
      });
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-rainbow">
      <div className="flex-none py-5 text-white container__custom max-[470px]:px-5">
        <h1 className="mb-1 text-2xl font-medium">
          กรุณาเซ็นชื่อเพื่อยืนยันการลงทะเบียน
        </h1>
        <p className="text-lg font-light">ขอโดย INNOPOWER</p>
      </div>
      <div className="pt-6 pb-12 rounded-t-[28px] bg-gray-200 px-5 w-full flex-auto">
        <div className="flex flex-col gap-8 container__custom">
          <p className="signature-body">
            Lorem ipsum dolor sit amet consectetur. Sed nullam imperdiet sed
            duis suscipit molestie leo quis. Consequat id ullamcorper fermentum
            egestas id. Laoreet malesuada est leo eu vitae cras justo quis.
            Aliquam mauris non et vel penatibus sollicitudin.
          </p>

          <div>
            <p className="mb-2 label">กรุณาเซ็นชื่อในกรอบด้านล่าง</p>
            <SignatureCanvas
              penColor="black"
              canvasProps={{
                className:
                  "w-full h-[300px] bg-stone-100 border border-dashed border-stone-500 rounded-2xl",
              }}
              ref={sigCanvas}
            />
          </div>
          <div className="button-container">
            <button className="signature-btn" onClick={clear}>
              เซ็นใหม่อีกครั้ง
            </button>
          </div>
          <div className="button-container">
            <button className="signature-btn-confirm" onClick={save}>
              ยืนยันการแนบลายเซ็น
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
