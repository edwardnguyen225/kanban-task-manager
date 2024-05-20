import DialogNewBoard from './dialog-new-board';
import DialogTask from './dialog-task';
import { Header } from './header';
import { Toaster } from './ui/toaster';

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
      <DialogTask />
      <Toaster />
    </>
  );
}
