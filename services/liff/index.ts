import liff from '@line/liff'

export const liffInit = async () => {
    await liff.init({ liffId: process.env.NEXT_PUBLIC_LINE_LIFF_ID || '' });
}