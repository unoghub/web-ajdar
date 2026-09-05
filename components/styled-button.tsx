import { ReactNode } from "react";
import { Button } from "./ui/button";

interface IStyledButtonProps {
    icon?: ReactNode;
    children: ReactNode | ReactNode[];
}

export function StyledButton(props: IStyledButtonProps) {
    return (
        <Button className="w-52 h-18 text-2xl rounded-md bg-blurple hover:bg-blurple/90 cursor-pointer shadow-[0_6px_0_#3B47CC] transition-[transform,box-shadow] duration-150 ease-out hover:translate-y-1 hover:shadow-[0_2px_0_#3B47CC)] active:translate-y-1.5 active:shadow-none">
            {props.icon}
            {props.children}
        </Button>
    )
}