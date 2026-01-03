import { ReactQueryProvider } from "@/utils/providers/ReactQueryProvider";
import "./css/euclid-circular-a-font.css";
import "./css/style.css";
import { NextSessionProvider } from "@/utils/providers/NextSessionProvider";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/libs/nextAuth/authOptions";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(AuthOptions);
  
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=arrow_back" />
      </head>
      <body>
        <ReactQueryProvider>
          <NextSessionProvider session={session}>
            {children}
          </NextSessionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
