import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "var(--header-height)", minHeight: "100vh" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
