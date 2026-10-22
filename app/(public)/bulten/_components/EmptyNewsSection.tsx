import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FaceSlightlyFrowning } from "lucide-react";

export function EmptyNewsSection() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <FaceSlightlyFrowning className="size-12" />
        </EmptyMedia>
        <EmptyContent>
          <EmptyTitle>Henüz bülten yok</EmptyTitle>
          <EmptyDescription>Yayınlanan bültenler burada görünecek.</EmptyDescription>
        </EmptyContent>
      </EmptyHeader>
    </Empty>
  );
}
