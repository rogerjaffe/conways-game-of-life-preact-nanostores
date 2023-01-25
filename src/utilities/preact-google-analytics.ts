import { useEffect } from "preact/hooks";

const gTagUrl = "https://www.googletagmanager.com/gtag/js?id=";

const injectScript = (prop: "innerText" | "src", val: string) => {
  const script = document.createElement("script");
  script[prop] = val;
  script.async = true;
  document.body.appendChild(script);
};

const injectScriptUrl = (url: string) => {
  injectScript("src", url);
};

const injectScriptInline = (code: string) => {
  injectScript("innerText", code);
};

export const configureGoogleAnalytics = (measurementId: string) => {
  injectScriptUrl(`${gTagUrl}${measurementId}`);
  injectScriptInline(`window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "${measurementId}");
  `);
};

// Inspired by https://stackoverflow.com/questions/34836500/how-to-set-up-google-analytics-for-react-router
export const usePageTracking = () => {
  const location = document.location;

  useEffect(() => {
    // @ts-ignore
    window.gtag("event", "page_view", {
      page_path: location.pathname + location.search,
    });
  }, [location.pathname, location.search]);
};
