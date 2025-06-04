
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlurredSectionProps {
  title: string;
  children: ReactNode;
}

export function BlurredSection({ title, children }: BlurredSectionProps) {
  return (
    <Card className="relative">
      <CardContent className="p-0 overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-md bg-background/50 z-10 flex flex-col items-center justify-center">
          <LockKeyhole className="h-8 w-8 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3 text-center px-4">
            Upgrade to a premium account to view this information
          </p>
          <Button size="sm">Upgrade Now</Button>
        </div>
        <div className="p-6 filter blur-[4px]">{children}</div>
      </CardContent>
    </Card>
  );
}
