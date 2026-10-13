import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

// Generada en build (export estático). Sin foto ni matrícula: solo marca y cobertura.
export const dynamic = "force-static";
export const alt = `${siteConfig.name}: derecho de familia en CABA y GBA`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e1f3a",
          color: "#ffffff",
          padding: "72px",
          borderTop: "12px solid #b8925a",
        }}
      >
        <div style={{ display: "flex", color: "#b8925a", fontSize: 26, fontWeight: 700, letterSpacing: 6 }}>
          {siteConfig.tagline.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
            Abogada de familia en CABA y GBA
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 34, color: "rgba(255,255,255,0.9)" }}>
            {siteConfig.name}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
