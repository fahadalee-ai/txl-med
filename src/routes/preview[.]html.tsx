import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

export const Route = createFileRoute("/preview.html")({
  head: () => ({
    meta: [
      { title: "Preview — TXL Med PLLC" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PreviewScreen,
});

function PreviewScreen() {
  const src = useMemo(() => {
    if (typeof window === "undefined") return "/";
    const params = new URLSearchParams(window.location.search);
    const override = params.get("url");
    if (override && /^https?:\/\//.test(override) && !override.includes("preview.html")) {
      return override;
    }
    return `${window.location.origin}/`;
  }, []);

  return (
    <div className="grid-bg flex min-h-dvh items-center justify-center bg-[#0b0b0c] p-5">
      <div className="relative aspect-[9/19.5] h-[min(86dvh,700px)] max-h-[86dvh] w-auto max-w-[92vw]">
        <div className="absolute inset-0 rounded-[2.6rem] bg-zinc-800 shadow-[0_18px_50px_rgba(0,0,0,0.45)]" />
        <div className="absolute inset-[10px] overflow-hidden rounded-[2.1rem] bg-white">
          <iframe
            title="App Preview"
            src={src}
            className="size-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
        <div className="pointer-events-none absolute top-3 left-1/2 z-10 h-6 w-[88px] -translate-x-1/2 rounded-full bg-black" />
      </div>
      <style>{`
        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 34px 34px;
        }
      `}</style>
    </div>
  );
}
