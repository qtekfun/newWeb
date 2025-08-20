import Link from 'next/link';
import { CodeXml } from 'lucide-react';
import { ThemeSwitcher } from './theme-switcher';

export function Header() {
  return (
    <header className="py-6">
      <nav className="container mx-auto flex items-center justify-between px-4">
        <Link href="./" className="flex items-center gap-2">
          <CodeXml className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">LightWrite</span>
        </Link>
        <div className="flex items-center gap-6 text-lg">
          <Link href="./" className="transition-colors hover:text-primary">
            Blog
          </Link>
          <Link href="/about" className="transition-colors hover:text-primary">
            About
          </Link>
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}
