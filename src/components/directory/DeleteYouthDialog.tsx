import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Youth } from "@/data/mockData";
import { AlertTriangle } from "lucide-react";

interface DeleteYouthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  youth: Youth | null;
  onConfirmDelete: (youth: Youth) => void;
}

export function DeleteYouthDialog({ 
  open, 
  onOpenChange, 
  youth, 
  onConfirmDelete 
}: DeleteYouthDialogProps) {
  if (!youth) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Delete Youth Record
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Are you sure you want to delete the record for{" "}
              <strong>{youth.firstName} {youth.lastName}</strong>?
            </p>
            <p className="text-destructive">
              This action cannot be undone. All attendance history and engagement data 
              for this member will be permanently removed.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => onConfirmDelete(youth)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
