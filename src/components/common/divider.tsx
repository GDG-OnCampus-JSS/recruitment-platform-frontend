import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  text?: string;
}

export const Divider = ({ className, text }: DividerProps) => {
  return (
    <div className={cn("flex w-full items-center", text ? "gap-4" : "", className)}>
      <span className="h-[1px] flex-1 bg-gray-300"></span>
      {text && <span className="text-gray-600 text-sm">{text}</span>}
      <span className="h-[1px] flex-1 bg-gray-300"></span>
    </div>
  );
};
