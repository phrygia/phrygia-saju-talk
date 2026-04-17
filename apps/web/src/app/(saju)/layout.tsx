import { getUser } from "@/src/lib/getUser";
import ChatLayout from "@/src/app/(saju)/_components/layout/ChatLayout";
import BirthInfoModal from "@/src/app/(saju)/_components/birth/BirthInfoModal";

export default async function ChatRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile } = await getUser();

  return (
    <ChatLayout initialUser={user} initialProfile={profile}>
      {children}
      <BirthInfoModal />
    </ChatLayout>
  );
}
