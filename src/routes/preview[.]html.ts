import { createFileRoute } from "@tanstack/react-router";
import previewHtml from "../../public/preview.html?raw";

export const Route = createFileRoute("/preview.html")({
  server: {
    handlers: {
      GET: () =>
        new Response(previewHtml, {
          headers: {
            "content-type": "text/html; charset=utf-8",
            "cache-control": "no-store",
          },
        }),
    },
  },
});
