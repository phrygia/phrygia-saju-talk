import ThemeToggle from "@/src/components/ThemeToggle";

export default function Header() {
  return (
    <header className="w-full sticky top-0 left-0 p-3">
      <ThemeToggle />
    </header>
  );
}
