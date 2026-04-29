"use client";
import Script from "next/script";

export default function Analytics() {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-LJC2QQFK86" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-LJC2QQFK86');
      `}} />
    </>
  );
}