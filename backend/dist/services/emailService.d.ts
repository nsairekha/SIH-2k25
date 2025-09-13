interface EmailData {
    to: string;
    subject: string;
    template: string;
    data: any;
}
export declare const sendEmail: (emailData: EmailData) => Promise<void>;
export declare const sendBulkEmail: (emails: EmailData[]) => Promise<void>;
export {};
//# sourceMappingURL=emailService.d.ts.map