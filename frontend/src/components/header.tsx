import { MainNav } from './main-nav';
import BoardSwitcher from './board-switcher';
import { UserNav } from './user-nav';

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <BoardSwitcher />
        <MainNav className="mx-6" />
        {/* <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div> */}
      </div>
    </div>
  );
}
