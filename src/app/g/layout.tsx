import { AppSidebar, teacherItems } from "@/components/layout/AppSidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-warm-white">
      <AppSidebar role="teacher" items={teacherItems} userName="Bu Siti Rahma" userSub="Guru Bahasa Jepang" />
      <div className="md:pl-60">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 md:px-8 md:py-8 md:pb-8">{children}</div>
      </div>
      <MobileBottomNav />
    </div>
  );
}
