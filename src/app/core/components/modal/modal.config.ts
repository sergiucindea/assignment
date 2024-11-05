export interface ModalConfig {
    title?: string,
    headerClass?: string,
    bodyClass?: string,
    options?: any,
    closeButtonLabel?: string;
    closeButtonTextOnly?: boolean;
    closeButtonClass?: string;
    submitButtonLabel?: string;
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