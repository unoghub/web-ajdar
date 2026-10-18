import { ReactNode } from "react";

interface IPageTemplate {
  title?: string;
  description?: string;
  action?: ReactNode | ReactNode[];
  children: ReactNode | ReactNode[];
}

export function PageTemplate(props: IPageTemplate) {
  return (
    <div className="flex-1 p-4">
      <div className="border-b pb-2 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">{props.title}</h1>
          <p className="text-sm text-muted-foreground">{props.description}</p>
        </div>

        <div>{props.action}</div>
      </div>

      <section className="pt-3">{props.children}</section>
    </div>
  );
}
