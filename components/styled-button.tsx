import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export type StyledButtonColors = {
    background?: string;
    foreground?: string;
    shadow?: string;
    insetShadow?: string;
};

export type StyledButtonProps = Omit<ComponentProps<typeof Button>, "children" | "className"> & {
    icon?: ReactNode;
    children?: ReactNode;
    className?: string;
    colors?: StyledButtonColors;
};

export function StyledButton({ icon, children, className, colors, style, ...props }: StyledButtonProps) {
    const colorStyles = {
        "--button-background": colors?.background ?? "var(--blurple)",
        "--button-foreground": colors?.foreground ?? "#fff",
        "--button-shadow": colors?.shadow ?? "#3B47CC",
        "--button-inset-shadow": colors?.insetShadow ?? "#000",
    } satisfies CSSProperties & Record<`--button-${string}`, string>;

    return (
        <Button
            {...props}
            style={typeof style === "function"
                ? (state) => ({ ...colorStyles, ...style(state) })
                : { ...colorStyles, ...style }}
            className={cn(
                "gap-2 rounded-md bg-[var(--button-background)] text-2xl text-[color:var(--button-foreground)] hover:bg-[var(--button-background)] cursor-pointer",
                "shadow-[0_6px_0_var(--button-shadow),inset_0_0_0_transparent]",
                "transition-[translate,box-shadow,background-color] duration-150 ease-out",
                "enabled:hover:translate-y-1 enabled:hover:shadow-[0_2px_0_var(--button-shadow),inset_0_2px_4px_color-mix(in_srgb,var(--button-inset-shadow)_15%,transparent)]",
                "enabled:active:translate-y-1.5 enabled:active:not-aria-[haspopup]:translate-y-1.5 enabled:active:shadow-[0_0_0_var(--button-shadow),inset_0_3px_6px_color-mix(in_srgb,var(--button-inset-shadow)_20%,transparent)]",
                "motion-reduce:transition-none",
                className,
            )}
        >
            {icon}
            {children}
        </Button>
    );
}
