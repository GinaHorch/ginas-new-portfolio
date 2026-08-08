import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { person } from "@/app/resources/content";

export const runtime = "nodejs";

const publicFile = (...parts: string[]) => join(process.cwd(), "public", ...parts);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "Portfolio";

  // Both assets are read off disk rather than fetched. Turbopack's production server
  // does not implement fetch() for file:// URLs, and satori cannot decode the WebP
  // avatar the rest of the site uses — hence the JPEG copy, inlined as a data URI.
  const [fontData, avatarData] = await Promise.all([
    readFile(publicFile("fonts", "Inter.ttf")),
    readFile(publicFile("images", "GinaHeadShot-og.jpg")),
  ]);
  const avatarSrc = `data:image/jpeg;base64,${avatarData.toString("base64")}`;

  // Titles vary from "Skills | Gina Horch" to a full project name. Step the display
  // size down as the title grows so long ones stay inside the 1280x720 canvas.
  const titleSize = title.length > 60 ? "3.5rem" : title.length > 36 ? "4.5rem" : "5.75rem";

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "5rem",
        background: "#151515",
        fontFamily: "Inter",
        fontStyle: "normal",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.25rem",
          fontSize: "1.75rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#56ECAD",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "2.5rem",
            height: "0.25rem",
            background: "#56ECAD",
          }}
        />
        {person.role}
      </div>

      <div
        style={{
          display: "flex",
          fontSize: titleSize,
          lineHeight: 1.15,
          letterSpacing: "-0.03em",
          whiteSpace: "pre-wrap",
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <img
          alt=""
          src={avatarSrc}
          style={{
            width: "7rem",
            height: "7rem",
            objectFit: "cover",
            borderRadius: "100%",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: "3rem",
            letterSpacing: "-0.02em",
          }}
        >
          {person.name}
        </div>
      </div>
    </div>,
    {
      width: 1280,
      height: 720,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
        },
      ],
    },
  );
}
