import { ImageResponse } from "next/og";
import { SITE_METADATA } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "radial-gradient(circle at top left, #2078CF 0%, #011F65 48%, #000521 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          color: "#f6f3ee",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: 26, opacity: 0.9 }}>AJITESH CHANNA</div>
        <div style={{ maxWidth: "880px", display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, lineHeight: 1.1, fontWeight: 700 }}>
            AI Engineer and Creative Technologist
          </div>
          <div style={{ marginTop: 18, fontSize: 30, opacity: 0.92 }}>
            Systems, research, and product-minded engineering case studies.
          </div>
        </div>
        <div style={{ fontSize: 24, opacity: 0.85 }}>{SITE_METADATA.name}</div>
      </div>
    ),
    size,
  );
}
