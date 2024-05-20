'use client';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { useParams, usePathname } from 'next/navigation';

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {}

type LinkItem = {
  href: string;
  text: string;
};

export function MainNav({ className, ...props }: MainNavProps) {
  const pathname = usePathname();
  const { boardId } = useParams<{ boardId: string }>();

  let links: LinkItem[] = [];
  if (pathname !== '/') {
    links = [
      { href: `/${boardId}`, text: 'Tasks' },
      { href: `/${boardId}/settings`, text: 'Settings' },
    ];
  }

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            link.href === pathname && 'font-extrabold text-primary',
          )}
        >
          {link.text}
        </Link>
      ))}
    </nav>
  );
}
