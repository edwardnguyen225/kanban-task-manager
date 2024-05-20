import { Separator } from '@/components/ui/separator';
import { BoardEditForm } from './board-edit-form';

export default function BoardSettingsPage() {
  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Edit Board</h2>
        <p className="text-sm text-muted-foreground">
          Change your board settings here.
        </p>
      </div>
      <Separator />
      <BoardEditForm />
    </div>
  );
}
