import DialogNewBoard from './dialog-new-board';
import DialogTask from './dialog-task';
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
      <DialogTask />
    </>
  );
}
