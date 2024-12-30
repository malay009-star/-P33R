import { useEffect } from "react";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Add Tawk.to widget script
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/YOUR_PROPERTY_ID/default";
    script.async = true;
    document.body.appendChild(script);

    // Customize widget styles after the script loads
    script.onload = () => {
      const iframe = document.querySelector('iframe[id^="tawk"]');
      if (iframe) {
        const iframeDocument =
          iframe.contentDocument || iframe.contentWindow.document;
        const style = document.createElement("style");
        style.innerHTML = `
          .tawk-button {
            background-color: #d855a0 !important;
          }
          .tawk-icon-right {
            display: none !important;
          }
        `;
        iframeDocument.head.appendChild(style);
      }
    };
  }, []);

  return <Component {...pageProps} />;
}
