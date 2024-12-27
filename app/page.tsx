"use client";
import Image from "next/image";
import api from "@/services";
import Cookies from "js-cookie";
import { useState, useEffect, cache } from "react";
import Swal from "sweetalert2";
import { useParams, useSearchParams } from "next/navigation";
import GetProfile from "@/services/swr/getProfile";

export default function HomePage() {
  const params = useSearchParams();
  const [isLiffClient, setIsLiffClient] = useState<boolean>(true);
  const [LiffClient, setLiffClient] = useState<any>();
  const [intervalId, setIntervalId] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [loginBtn, setLoginBtn] = useState<boolean>(true);

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
        console.log("In LIFF");
        setIsLiffClient(true);
      } else {
        console.log("Out LIFF");
        setIsLiffClient(false);
      }
    }

    Init();
  });

  const mobNo = params.get("mobNo");
  const docId = params.get("docId");

  const toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
  });

  const dataLogin = {
    // mobNo: mobNo?.toString() || "0891111111",
    // docId: docId?.toString() || "3809507526886",
    mobNo: mobNo?.toString() || "0863992904",
    docId: docId?.toString() || "3570101752881",
  };
  const login = async () => {
    try {
      const cookiesExpire = new Date(new Date().getTime() + 5 * 60 * 1000);
      const res = await api.post.login(dataLogin);
      Cookies.set("csrftoken", res?.data?.token, {
        expires: cookiesExpire,
      }) || undefined;
      Cookies.set("sessionid", res?.data?.sessionid, {
        expires: cookiesExpire,
      }) || undefined;
      const redirectUrl = res?.data?.body?.url;
      // location.href = redirectUrl;
      setLoginBtn(false);
      if (isLiffClient) {
        LiffClient.openWindow({
          url: redirectUrl,
          external: true,
        });
      } else {
        window.open(redirectUrl, "_blank");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.fire({
        icon: "error",
        text: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง (101)",
        padding: "10px 20px",
      });
    }
  };

  const checkProfile = async () => {
    try {
      const res = await api.get.getProfile();
      // console.log("profile ", res?.data);
      if (res?.data) {
        location.href = "/terms";
      }
    } catch (error: any) {
      console.error("get profile failed:", error);
      toast.fire({
        icon: "error",
        text: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง (102)",
        padding: "10px 20px",
      });
    }
  };

  return (
    <div className="flex flex-col h-screen min-h-max bg-rainbow">
      <div className="py-5 text-white container__custom max-[470px]:px-5 basis-[200px] flex flex-col justify-center gap-3">
        <div className="relative max-w-[280px] h-[65px] left-1/2 -translate-x-1/2">
          <Image
            src={"/images/inno-logo.png"}
            alt="Green Wallet"
            sizes="280px"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <p className="text-2xl text-center text-white">
          สมัครบริการขึ้นทะเบียน REC
        </p>
      </div>
      <div className="card-three">
        <div className="container__custom grow">
          <p className="mb-10 text-3xl text-center">เริ่มต้นยืนยันตัวตน</p>
          <div className="relative max-w-[140px] h-[140px] left-1/2 -translate-x-1/2 mb-5">
            <Image
              src={"/images/kbank-logo.png"}
              alt="Green Wallet"
              sizes="140px"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex justify-center mt-auto">
            {/* <Link href="/register">
              <button className="next-button">ถัดไป</button>
            </Link> */}
            <button
              className="next-button"
              onClick={loginBtn ? login : checkProfile}
            >
              ถัดไป
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
