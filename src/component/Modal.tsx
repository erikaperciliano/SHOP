import { CloseButton, Content, Overlay } from "@/styles/pages/modal";
import { ReactNode } from "react";

interface ModalProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export function Modal({ children, isOpen, onClose }: ModalProps){
    if(!isOpen){
        return null;
    }

    return(
        <Overlay>
            <Content>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                {children}
            </Content>
        </Overlay>
    )
}