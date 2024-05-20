import DialogNewBoard from './dialog-new-board';
import DialogNewTask from './dialog-new-task';
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
      <DialogNewTask />
    </>
  );
}
