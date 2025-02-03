import { Header } from "@/components/header/Header";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
};

export default PublicLayout;
