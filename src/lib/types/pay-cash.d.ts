import { TProduct } from "./product";

export type TPayCashResponse = {
        message: string;
        order: {
            user: string;
            orderItems: TProduct[];
            totalPrice: number;
            paymentType: string;
            isPaid: boolean;
            isDelivered: boolean;
            state: string;
            _id: string;
            createdAt: string;
            updatedAt: string;
            orderNumber: string;
            __v: number;
        };
    }