import { Suspense } from "react";
import { getUser } from "@/src/lib/getUser";
import ChatLayout from "@/src/app/(saju)/_components/layout/ChatLayout";
import BirthInfoModal from "@/src/app/(saju)/_components/birth/BirthInfoModal";

async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { user, profile } = await getUser();

  return (
    <ChatLayout initialUser={user} initialProfile={profile}>
      {children}
      <BirthInfoModal />
    </ChatLayout>
  );
}

function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen text-foreground">
      <aside className="hidden w-65 shrink-0 border-r border-r-sidebar-border bg-tertiary md:flex" />
      <div className="flex flex-1 flex-col min-w-0">
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function ChatRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<LayoutShell>{children}</LayoutShell>}>
      <AuthenticatedLayout>{children}</AuthenticatedLayout>
    </Suspense>
  );
}
