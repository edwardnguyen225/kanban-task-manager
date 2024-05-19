import { Button } from './ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface DialogNewBoardProps {
  setShowNewBoardDialog: (show: boolean) => void;
}

export default function DialogNewBoard({
  setShowNewBoardDialog,
}: DialogNewBoardProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create board</DialogTitle>
        <DialogDescription>
          Add a new board to your workspace.
        </DialogDescription>
      </DialogHeader>
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Label htmlFor="name">Board name</Label>
            <Input id="name" placeholder="Acme Inc." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plan">Subscription plan</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">
                  <span className="font-medium">Free</span> -{' '}
                  <span className="text-muted-foreground">
                    Trial for two weeks
                  </span>
                </SelectItem>
                <SelectItem value="pro">
                  <span className="font-medium">Pro</span> -{' '}
                  <span className="text-muted-foreground">
                    $9/month per user
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => setShowNewBoardDialog(false)}>
          Cancel
        </Button>
        <Button type="submit">Continue</Button>
      </DialogFooter>
    </DialogContent>
  );
}
