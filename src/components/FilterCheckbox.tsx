
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FilterCheckboxProps {
  id: string;
  label: string;
  count?: number;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export function FilterCheckbox({
  id,
  label,
  count,
  checked,
  onChange,
  className,
}: FilterCheckboxProps) {
  return (
    <div className={cn("flex items-center space-x-2 py-1.5 px-1 rounded-md hover:bg-muted/50 transition-colors", checked && "bg-muted/50", className)}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      <Label
        htmlFor={id}
        className={cn(
          "text-sm font-normal cursor-pointer flex-1",
          checked && "font-medium text-primary"
        )}
      >
        {label}
      </Label>
      {count !== undefined && (
        <Badge variant="secondary" className="text-xs font-normal ml-auto">
          {count}
        </Badge>
      )}
    </div>
  );
}
