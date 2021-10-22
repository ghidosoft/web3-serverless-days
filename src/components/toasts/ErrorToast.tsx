import React from 'react';
import ToastContent from './ToastContent';

type Props = {
    reason: string;
};

const ErrorToast: React.FC<Props> = ({reason}) => (
    <ToastContent>
        An error occurred: {reason}
    </ToastContent>
);

export default ErrorToast;
