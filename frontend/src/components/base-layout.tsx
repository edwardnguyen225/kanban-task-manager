import DialogNewBoard from './dialog-new-board';
import { Header } from './header';

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <DialogNewBoard />
    </>
  );
}
