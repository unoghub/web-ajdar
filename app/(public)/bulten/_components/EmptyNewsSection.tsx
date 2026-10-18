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
          <EmptyTitle>Can't find news</EmptyTitle>
          <EmptyDescription>We dont have any news for you just yet</EmptyDescription>
        </EmptyContent>
      </EmptyHeader>
    </Empty>
  );
}
