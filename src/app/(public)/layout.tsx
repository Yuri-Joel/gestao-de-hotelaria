import { Header } from "@/components/Header/Header";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {children}
    </div>
  );
};

export default PublicLayout;
