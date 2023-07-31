import { Navbar, Provider } from "@/components";
import "@/styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "Discover and share great AI prompts ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
