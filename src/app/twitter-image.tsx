import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 600,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #000521 0%, #020C47 48%, #011F65 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "50px 60px",
          color: "#f6f3ee",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ fontSize: 20, opacity: 0.85 }}>AJITESH CHANNA</div>
          <div style={{ fontSize: 54, lineHeight: 1.1, fontWeight: 700, maxWidth: "760px" }}>
            AI Engineer and Creative Technologist
          </div>
          <div style={{ fontSize: 25, maxWidth: "760px", opacity: 0.9 }}>
            Practical AI systems, automation architecture, and research storytelling.
          </div>
        </div>
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 9999,
            border: "2px solid rgba(32, 120, 207, 0.78)",
            background: "rgba(14, 78, 178, 0.24)",
          }}
        />
      </div>
    ),
    size,
  );
}
