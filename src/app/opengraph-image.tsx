import { ImageResponse } from "next/og";

export const alt = "Emerg Technologies — Innovation. Intelligence. Impact.";
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
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg,#030811 0%,#081220 60%,#06303a 100%)",
          color: "#e8f3ff",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#00d1ff", letterSpacing: 6 }}>
          EMERG TECHNOLOGIES
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, marginTop: 28, lineHeight: 1.05 }}>
          Building a Smarter Digital Future.
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#9bafc4", marginTop: 32 }}>
          Innovation. Intelligence. Impact.
        </div>
      </div>
    ),
    size,
  );
}
