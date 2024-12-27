"use client";
import React, { SetStateAction, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa";

export default function SignaturePage() {
  const [isLiffClient, setIsLiffClient] = useState<boolean>(true);
  const [LiffClient, setLiffClient] = useState<any>();
  // const router = useRouter();

  useEffect(() => {
    async function Init() {
      const liff = (await import("@line/liff")).default;
      setLiffClient(liff);
      try {
        await liff.init({ liffId: process.env.NEXT_PUBLIC_LINE_LIFF_ID || "" });
      } catch (error: any) {
        console.error("liff init error", error?.message);
      }
      if (liff.isLoggedIn()) {
        // console.log("In LIFF");
        setIsLiffClient(true);
      } else {
        // console.log("Out LIFF");
        setIsLiffClient(false);
      }
    }

    Init();
  });

  const save = () => {
    if (isLiffClient) {
      LiffClient.closeWindow();
    }
  };

  return (
    <div className="bg-custom-success">
      <div className="icon-success">
        <FaCheck size="46" />
      </div>
      <label className="label font-success">ลงทะเบียนสำเร็จ</label>
      <div className="button-container">
        <button className="signature-btn-confirm" onClick={save}>
          เข้าสู่ Green Wallet
        </button>
      </div>
    </div>
  );
}
