import { ImageResponse } from "next/og"
import { siteConfig } from "@/data/site-config.data"

export const runtime = "edge"
export const alt = siteConfig.metadata.title
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

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
          padding: "80px",
          background: "#f6f1e7",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 90,
            height: 8,
            borderRadius: 4,
            background: siteConfig.themeColor,
            marginBottom: 40,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: siteConfig.themeColor,
            marginBottom: 24,
          }}
        >
          {siteConfig.siteName} · Aagaz &apos;26–27
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#2b2420",
            maxWidth: 980,
          }}
        >
          Every beginning holds endless possibilities.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            marginTop: 32,
            color: "#6b5f56",
          }}
        >
          Rotaract Club of Thane North End — District 3142
        </div>
      </div>
    ),
    { ...size }
  )
}
