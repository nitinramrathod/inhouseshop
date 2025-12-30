import { ReactQueryProvider } from "@/utils/providers/ReactQueryProvider";
import "./css/euclid-circular-a-font.css";
import "./css/style.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
