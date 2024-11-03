export interface ModalConfig {
    title?: string,
    headerClass?: string,
    options?: any,
    closeButtonLabel?: string;
    closeButtonColor?: "success" | "info" | "warning" | "danger" | "help" | "primary" | "secondary" | "contrast" | null | undefined; // from primeng docs
    closeButtonTextOnly?: boolean;
    closeButtonClass?: string;
    submitButtonLabel?: string;
    submitButtonColor?: "success" | "info" | "warning" | "danger" | "help" | "primary" | "secondary" | "contrast" | null | undefined; // from primeng docs;
    submitButtonTextOnly?: boolean;
    submitButtonClass?: string;
    onSubmit?: () => void; 
    onClose?: () => void;
}

export interface ModalStatusConfig {
    status: string,
    message: string
}

export enum ModalStatusType {
    Success,
    Error,
    Warning
}

export interface ModalStatusEventEmitted {
    message: string,
    status: ModalStatusType
}