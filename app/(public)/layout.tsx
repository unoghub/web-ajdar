import { Navbar } from "@/components/navbar";

export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
