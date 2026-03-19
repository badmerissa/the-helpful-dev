import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 60%)",
          padding: "60px 72px",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#dcfce7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
            }}
          >
            🐼
          </div>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#16a34a",
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Parenting Tools
          </span>
        </div>

        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "#0f172a",
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Potty Panda
        </div>

        <div
          style={{
            fontSize: 24,
            color: "#475569",
            lineHeight: 1.4,
            marginBottom: 40,
            maxWidth: 700,
          }}
        >
          Free Potty Training App · Log Successes · Track Streaks · No Account Needed
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 24px",
            background: "#0092ae",
            borderRadius: 12,
            width: "fit-content",
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 700, color: "#ffffff" }}>
            thehelpfuldev.com
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
