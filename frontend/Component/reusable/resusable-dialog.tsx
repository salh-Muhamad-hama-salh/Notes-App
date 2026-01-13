import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

export type CustomDialogProps = {
  button_text?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  className_parent?: string;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  Description?: string;
};

function Resusabledialog({
  button_text,
  icon,
  className,
  className_parent,
  children,
  open,
  onOpenChange,
  title,
  Description,
}: CustomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className={className_parent}>
        <span className={className}>{button_text}</span>
        {icon}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{Description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default Resusabledialog;
