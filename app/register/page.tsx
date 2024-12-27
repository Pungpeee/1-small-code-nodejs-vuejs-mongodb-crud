"use client";
import MapComponent from "@/components/MapComponent";
import FilesBasket from "@/components/files-basket";
import BaseInput from "@/components/form-controls/base-input";
import BaseSelect from "@/components/form-controls/base-select";
import BaseTextarea from "@/components/form-controls/base-textarea";
import BaseUpload from "@/components/form-controls/base-upload";
import BTNSwitch from "@/components/form-controls/btn-switch";
import { useGlobalContext } from "@/context/store";
import api from "@/services";
import GetDistrict from "@/services/swr/getDistrict";
import GetProvince from "@/services/swr/getProvince";
import GetSubDistrict from "@/services/swr/getSubDistrict";
import { LoadScript } from "@react-google-maps/api";
import { Form, Radio, RadioChangeEvent, message } from "antd";
import axios, { AxiosResponse } from "axios";
import _ from "lodash";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useEffect, useState } from "react";
import { FaMap } from "react-icons/fa";
import liff from "@line/liff";
import { liffInit } from "../../services/liff";
import GetProfile from "@/services/swr/getProfile";
import Cookies from "js-cookie";

const googleAPI = process.env.NEXT_PUBLIC_GOOGLE_API!;

type FieldType = {
  nameSolarRooftop: string;
  addressSolarRooftop: string;
  numberSolarRooftop: string;
  mooSolarRooftop: string;
  soiRooftop: string;
  roadRooftop: string;
  province_id: number;
  district_id: number;
  subdistrict_id: number;
  // provinceRooftop: string;
  // districtRooftop: string;
  // subDistrictRooftop: string;
  zipCodeRooftop: string;
  latAndLongRooftop: string;
  bankAccountKbank: string;
  productionCapacity: number;
  account: string;
  password: string;
  numberSN: string;
  idCard: number;
  phoneNumber: string;

  // productionForOwnUse: boolean; // Switch
  // sellingElectricityToOutsiders: boolean; //
  // attachedSalesContract: string;
  // outsidersUse: boolean; // Switch
  // documentRequestingElectricalSize: string; // Switch
  // registerRecAndCarbon: boolean; // Switch

  // idCardSoloar: string;
  // houseRegistrationSolar: string;
  // ownershipEvidence: string;
  // imageSolar: string;
};

export default function RegisterPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const { setFormData } = useGlobalContext();
  const [isMapPopupOpen, setIsMapPopupOpen] = useState<boolean>(false);

  const [registerType, setRegisterType] = useState<number>(1);

  const [province_id, setProvince_id] = useState<any>();
  const [district_id, setDistrict_id] = useState<any>();
  const [subdistrict_id, setSubdistrict_id] = useState<any>();

  const [provinceOptions, setProvinceOptions] = useState<any>("1");
  const [districtOptions, setDistrictOptions] = useState<any>("1");
  const [subDistrictOptions, setSubDistrictOptions] = useState<any>("1");

  const [section2field1, setSection2field1] = useState<boolean>(true);
  const [section2field2, setSection2field2] = useState<boolean>(true);
  const [section2Upload2, setSection2Upload2] = useState<File[]>([]);
  const [section2field3, setSection2field3] = useState<boolean>(true);
  const [section2Upload3, setSection2Upload3] = useState<File[]>([]);
  const [section2field4, setSection2field4] = useState<boolean>(true);

  const [section3Upload1, setSection3Upload1] = useState<File[]>([]);
  const [section3Upload2, setSection3Upload2] = useState<File[]>([]);
  const [section3Upload3, setSection3Upload3] = useState<File[]>([]);
  const [section3Upload4, setSection3Upload4] = useState<File[]>([]);

  const ssid = Cookies.get("sessionid");
  const { data: dataProfile } = GetProfile(ssid);
  useEffect(() => {
    form.setFields([
      {
        name: "nameSolarRooftop",
        value: dataProfile?.customerInfo?.enFstName
          ? dataProfile?.customerInfo?.enFstName +
            " " +
            dataProfile?.customerInfo?.enLstName
          : "",
      },
      {
        name: "addressSolarRooftop",
        value: dataProfile?.prodInfo?.contactAddr?.postCd || "",
      },
      {
        name: "numberSolarRooftop",
        value: dataProfile?.prodInfo?.contactAddr?.mailNo || "",
      },
      {
        name: "mooSolarRooftop",
        value: dataProfile?.prodInfo?.contactAddr?.moo || "",
      },
      {
        name: "soiRooftop",
        value: dataProfile?.prodInfo?.contactAddr?.soi || "",
      },
      {
        name: "roadRooftop",
        value: dataProfile?.prodInfo?.contactAddr?.road || "",
      },
      {
        name: "zipCodeRooftop",
        value: dataProfile?.prodInfo?.contactAddr?.postCd || "",
      },
      { name: "idCard", value: dataProfile?.customerInfo?.citizenID || "" },
      { name: "phoneNumber", value: dataProfile?.mobNo || "" },
      {
        name: "bankAccountKbank",
        value: dataProfile?.acctNo || "",
      },
    ]);
  }, [form, dataProfile]);

  useEffect(() => {
    liffInit();
  }, []);

  // get province
  const {
    data: provinceData,
    error: provinceError,
    mutate: provinceMutate,
  } = GetProvince(Number());

  // get district
  const {
    data: districtData,
    error: districtError,
    mutate: districtMutate,
  } = GetDistrict(Number(province_id));

  // get sub district
  const {
    data: subDistrictData,
    error: subDistrictError,
    mutate: subDistrictMutate,
  } = GetSubDistrict(Number(district_id));

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

  const handleLatLong = (val: string) => {
    form.setFields([{ name: "latAndLongRooftop", value: val }]);
  };

  const toggleMapPopup = () => {
    setIsMapPopupOpen(!isMapPopupOpen);
  };

  const closeMapPopup = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains("overlay")) {
      setIsMapPopupOpen(false);
    }
  };

  const getFiles = async (
    files: File[],
    set: (value: SetStateAction<File[]>) => void
  ) => {
    if (files.length) {
      const upload = await handleFileUpload(files[0], "name");
      set((prev) => prev.concat([upload?.data?.data?.storageUrl, upload]));
    }
  };

  const removeFile = (
    index: number,
    files: File[],
    set: (value: SetStateAction<File[]>) => void
  ) => {
    const array = files.filter((_, i) => i !== index);
    set(array);
  };

  const handleChangeRadio = (e: RadioChangeEvent) => {
    setRegisterType(e.target.value);
  };

  const handleChangeInput = (
    value: string,
    field: string,
    type: "text" | "number" | "no"
  ) => {
    let reg1: RegExp;
    let reg2: RegExp;
    switch (type) {
      case "no":
        reg1 = /^[\d(.*?)\/1\/(.*?)]+$/;
        reg2 = /[^\d\/]+/g;
        break;
      case "number":
        reg1 = /^\d+$/;
        reg2 = /[^\d]+/g;
        break;
      case "text":
      default:
        reg1 = /^[a-zA-Z\s\d.-]+$/;
        reg2 = /[^a-zA-Z\s\d.-]+/g;
        break;
    }
    if (!reg1.test(value)) {
      console.log("field: ", field);
      form.setFieldValue(field, value.replace(reg2, ""));
    }
  };

  let str = "this/that and/if";
  // console.log(str.replace(/[/]/g, "ForwardSlash"));

  const onFinish = _.debounce(async () => {
    // ส่วนนนี้เช็คเฉพาะ input ของ form

    form
      .validateFields()
      .then(async (values: FieldType) => {
        const data = {
          ...values,
          // form section 1
          province_id: province_id,
          district_id: district_id,
          subdistrict_id: subdistrict_id,
          // provinceRooftop: provinceOptions,
          // districtRooftop: districtOptions,
          // subDistrictRooftop: subDistrictOptions,
          // form section 2
          productionForOwnUse: section2field1,
          sellingElectricityToOutsiders: section2field2,
          attachedSalesContract: section3Upload1[0],
          outsidersUse: section2field3,
          documentRequestingElectricalSize: section3Upload2[0],
          registerRecAndCarbon: section2field4,
          // form section 3
          idCardSoloar: section3Upload1[0],
          houseRegistrationSolar: section3Upload2[0],
          ownershipEvidence: section3Upload3[0],
          imageSolar: section3Upload4[0],
        };
        setFormData(data);

        router.push("/signature");

        // liff.closeWindow()
      })
      .catch((errorInfo) => {
        message.warning("กรุณากรอกข้อมูลให้ครบถ้วน");
        console.log("errorInfo: ", errorInfo);
      });
  }, 200);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-rainbow">
      <div className="py-5 text-white container__custom max-[470px]:px-5">
        <h1 className="mb-1 text-2xl font-medium">ข้อมูล</h1>
        <p className="text-lg font-light">
          กรุณากรอกข้อมูลเพิ่มเติมที่ขอโดย INNOPOWER
        </p>
      </div>
      <Form
        form={form}
        name="innopower-form"
        className="ant-form__custom pt-6 pb-12 rounded-t-[28px] bg-gray-200 grow px-5 w-full"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="flex flex-col gap-8 container__custom">
          <div>
            <p className="mb-3.5 basic-info-text">ข้อมูลพื้นฐาน</p>
            <div className="flex flex-col gap-5 px-5 py-6 card-two">
              <BaseInput
                name="nameSolarRooftop"
                label="ชื่อบุคคลที่เป็นเจ้าของ Solar Rooftop"
                rules={[{ required: true, message: "" }]}
              />
              <BaseTextarea
                rules={[{ required: false, message: "" }]}
                //
                name="addressSolarRooftop"
                label="ที่อยู่ของ Solar Rooftop (EN)"
                placeholder="ระบุที่อยู่ , ตึก , อาคาร , หมู่บ้าน"
                onChange={(e) =>
                  handleChangeInput(e.target.value, "address", "text")
                }
              />
              <BaseInput
                name="numberSolarRooftop"
                label="เลขที่"
                placeholder="ระบุเลขที่"
                rules={[{ required: true, message: "" }]}
                onChange={(e) => handleChangeInput(e.target.value, "no", "no")}
              />
              <BaseInput
                rules={[{ required: false, message: "" }]}
                name="mooSolarRooftop"
                label="หมู่ที่"
                placeholder="ระบุหมู่ที่"
                onChange={(e) =>
                  handleChangeInput(e.target.value, "moo", "number")
                }
              />
              <BaseInput
                rules={[{ required: false, message: "" }]}
                name="soiRooftop"
                label="ตรอก / ซอย (EN)"
                placeholder="ระบุตรอก / ซอย"
                onChange={(e) =>
                  handleChangeInput(e.target.value, "alley", "text")
                }
              />
              <BaseInput
                rules={[{ required: false, message: "" }]}
                name="roadRooftop"
                label="ถนน (EN)"
                placeholder="ระบุถนน"
                onChange={(e) =>
                  handleChangeInput(e.target.value, "road", "text")
                }
              />
              <BaseSelect
                initialValue={province_id}
                name="province_id"
                label="จังหวัด"
                placeholder="ระบุจังหวัด"
                rules={[{ required: true, message: "" }]}
                options={provinceData?.map((item: any) => {
                  return {
                    value: item?.id,
                    label: item?.name_en,
                  };
                })}
                onChange={(e) => setProvince_id(e)}
              />
              <BaseSelect
                initialValue={district_id}
                name="district_id"
                label="เขต / อำเภอ"
                placeholder="ระบุเขต / อำเภอ"
                rules={[{ required: true, message: "" }]}
                options={districtData?.map((item: any) => {
                  return {
                    value: item?.id,
                    label: item?.name_en,
                  };
                })}
                onChange={(e) => setDistrict_id(e)}
              />
              <BaseSelect
                initialValue={subdistrict_id}
                name="subdistrict_id"
                label="แขวง / ตำบล"
                placeholder="ระบุแขวง / ตำบล"
                rules={[{ required: true, message: "" }]}
                options={subDistrictData?.map((item: any) => {
                  return {
                    value: item?.id,
                    label: item?.name_en,
                  };
                })}
                onChange={(e) => setSubdistrict_id(e)}
              />
              <BaseInput
                name="zipCodeRooftop"
                label="รหัสไปรษณีย์"
                placeholder="ระบุรหัสไปรษณีย์"
                rules={[{ required: true, message: "" }]}
                maxLength={6}
                onChange={(e) =>
                  handleChangeInput(e.target.value, "zip", "number")
                }
              />
              <div>
                <div className="relative">
                  <BaseInput
                    name="latAndLongRooftop"
                    label="Lat/Long"
                    rules={[{ required: true, message: "" }]}
                  />
                  <div className="grid h-12 place-content-center absolute right-1.5 bottom-0">
                    <button onClick={toggleMapPopup} className="p-2">
                      <FaMap />
                    </button>
                  </div>
                </div>
                <LoadScript
                  googleMapsApiKey={googleAPI}
                  libraries={["places"]}
                  language="th"
                  region="TH"
                >
                  {isMapPopupOpen && (
                    <div className="overlay" onClick={closeMapPopup}>
                      <div className="map-popup">
                        <MapComponent
                          setLatLong={handleLatLong}
                          setPopup={setIsMapPopupOpen}
                        />
                      </div>
                    </div>
                  )}
                </LoadScript>
              </div>
              <BaseInput
                name="bankAccountKbank"
                label="เลขบัญชีธนาคารกสิกร (สำหรับรับโอนค่า REC)"
                rules={[{ required: true, message: "" }]}
              />
              <BaseInput
                name="productionCapacity"
                label="กำลังการผลิตติดตั้ง (กิโลวัตต์)"
                rules={[{ required: true, message: "" }]}
                type="number"
                onChange={(e) =>
                  handleChangeInput(
                    e.target.value,
                    "productionCapacity",
                    "number"
                  )
                }
              />
              {/* <Radio.Group
                onChange={handleChangeRadio}
                value={registerType}
                className="flex flex-row"
              >
                <Radio className="flex-auto ant-radio__custom" value={1}>
                  หมายเลข S/N
                </Radio>
                <Radio className="flex-auto ant-radio__custom" value={2}>
                  Huawei Account
                </Radio>
              </Radio.Group>
              {registerType === 1 ? (
                <BaseInput
                  name="numberSN"
                  label="หมายเลข S/N"
                  rules={[{ required: true, message: "" }]}
                />
              ) : (
                <>
                  <BaseInput
                    name="account"
                    label="Username"
                    autoComplete="off"
                    rules={[{ required: true, message: "" }]}
                  />
                  <BaseInput
                    name="password"
                    label="Password"
                    autoComplete="off"
                    rules={[{ required: true, message: "" }]}
                  />
                  <BaseInput
                    name="company"
                    label="ชื่อผู้รับเหมาติดตั้ง"
                    autoComplete="off"
                    rules={[{ required: true, message: "" }]}
                  />
                </>
              )} */}
            </div>
          </div>

          <div>
            <p className="mb-3.5 basic-info-text">
              ข้อมูล Inverter และผู้รับเหมาติดตั้งอุปกรณ์
            </p>
            <div className="flex flex-col gap-5 px-5 py-6 card-two">
              <BaseInput
                name="numberSN"
                label="Serial Number Inverter"
                autoComplete="off"
                rules={[{ required: true, message: "" }]}
              />
              <BaseInput
                name="company"
                label="ชื่อผู้รับเหมาติดตั้ง"
                autoComplete="off"
                rules={[{ required: true, message: "" }]}
              />
              <BaseInput
                name="company_phone"
                label="เบอร์ติดต่อผู้รับเหมาติดตั้ง"
                autoComplete="off"
                rules={[{ required: false, message: "" }]}
              />
            </div>
          </div>

          <div>
            <p className="mb-3.5 basic-info-text">
              ข้อมูลสำหรับการล็อกอิน <br />
              Inverter Data Access Permission
            </p>
            <div className="flex flex-col gap-5 px-5 py-6 card-two">
              <BaseInput
                rules={[{ required: true, message: "" }]}
                name="idCard"
                label="หมายเลขบัตรประชาชน"
                type="number"
              />
              <BaseInput
                name="phoneNumber"
                label="หมายเลขโทรศัพท์"
                rules={[{ required: true, message: "" }]}
              />
            </div>
          </div>

          <div>
            <p className="mb-3.5 basic-info-text">ข้อมูลเพิ่มเติม</p>
            <div className="flex flex-col gap-5 px-5 py-6 card-two">
              <BTNSwitch
                label="โครงการมีการผลิตและใช้ไฟฟ้าเองหรือไม่"
                state={section2field1}
                values={[true, false]}
                labels={["Yes", "No"]}
                onToggle={(val) => setSection2field1(val)}
                mark
              />
              <BTNSwitch
                label="ขายไฟฟ้าให้ภายนอกหรือไม่"
                state={section2field2}
                values={[true, false]}
                labels={["Yes", "No"]}
                onToggle={(val) => setSection2field2(val)}
                mark
              />
              {section2field2 && (
                <div className="flex flex-col gap-1">
                  <BaseUpload
                    name="AttachedSalesContract"
                    label="แนบสัญญาซื้อขายไฟฟ้า"
                    onChange={(files) => getFiles(files, setSection2Upload2)}
                    mark
                  />
                  <FilesBasket
                    name="AttachedSalesContract"
                    items={section2Upload2}
                    onRemove={(index) =>
                      removeFile(index, section2Upload2, setSection2Upload2)
                    }
                  />
                </div>
              )}
              <BTNSwitch
                label="โครงการมีการเชื่อมต่อระบบเพื่อขายไฟฟ้าให้ กฟภ. หรือ กฟน. หรือไม่"
                state={section2field3}
                values={[true, false]}
                labels={["Yes", "No"]}
                onToggle={(val) => setSection2field3(val)}
                mark
              />
              {section2field3 && (
                <div className="flex flex-col gap-1">
                  <BaseUpload
                    name="documentRequestingElectricalSize"
                    label="เอกสารการขอขนานไฟฟ้ากับ กฟน. กฟภ."
                    onChange={(files) => getFiles(files, setSection2Upload3)}
                    mark
                  />
                  <FilesBasket
                    name="documentRequestingElectricalSize"
                    items={section2Upload3}
                    onRemove={(index) =>
                      removeFile(index, section2Upload3, setSection2Upload3)
                    }
                  />
                </div>
              )}
              <BTNSwitch
                label="โครงการลงทะเบียนกับมาตรฐาน REC หรือ Carbon Credit ใด บ้างหรือไม่"
                state={section2field4}
                values={[true, false]}
                labels={["Yes", "No"]}
                onToggle={(val) => setSection2field4(val)}
                mark
              />
            </div>
          </div>

          <div>
            <p className="mb-3.5 basic-info-text">เอกสารแนบ</p>
            <div className="flex flex-col gap-5 px-5 py-6 card-two">
              <div className="flex flex-col gap-1">
                <BaseUpload
                  name="idCardSoloar"
                  label="บัตรประชาชนของเจ้าของ Solar Rooftop"
                  onChange={(files) => getFiles(files, setSection3Upload1)}
                  mark
                />
                <FilesBasket
                  name="idCardSoloar"
                  items={section3Upload1}
                  onRemove={(index) =>
                    removeFile(index, section3Upload1, setSection3Upload1)
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <BaseUpload
                  name="houseRegistrationSolar"
                  label="ทะเบียนบ้าน"
                  onChange={(files) => getFiles(files, setSection3Upload2)}
                  mark
                />
                <FilesBasket
                  name="houseRegistrationSolar"
                  items={section3Upload2}
                  onRemove={(index) =>
                    removeFile(index, section3Upload2, setSection3Upload2)
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <BaseUpload
                  name="ownershipEvidence"
                  label="หลักฐานยืนยันการเป็นเจ้าของ Solar Rooftop (กรณีเจ้าของฯ ไม่ได้เป็นเจ้าบ้าน) เช่น สัญญาว่า จ้างติดตั้ง, ใบเสร็จรับเงินในชื่อเจ้าของฯ เป็นต้น"
                  onChange={(files) => getFiles(files, setSection3Upload3)}
                  mark
                />
                <FilesBasket
                  name="ownershipEvidence"
                  items={section3Upload3}
                  onRemove={(index) =>
                    removeFile(index, section3Upload3, setSection3Upload3)
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <BaseUpload
                  name="imageSolar"
                  label="รูปถ่ายแผงโซลาร์"
                  onChange={(files) => getFiles(files, setSection3Upload4)}
                  mark
                />
                <FilesBasket
                  name="imageSolar"
                  items={section3Upload4}
                  onRemove={(index) =>
                    removeFile(index, section3Upload4, setSection3Upload4)
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-auto button-container">
            <button className="next-button" onClick={onFinish}>
              ถัดไป
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}
