import * as Type from './database-types'

export interface ListingCategory {
    /**
     * ID of the Listing Category.
     */
    readonly id: number;
    type: Type.ListingCategory; // ^[A-Z_]+$
    category: string;
}
/**
 * Listing
 */
export interface Listing {
    readonly id?: number;
    type?: Type.ListingType; // ^[A-Z_]+$
    category?: ListingCategory;
    status?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    winningInstructions: string;
    photo_ids?: string[];
    readonly expiresOn?: string; // date-time
    readonly createdOn?: string; // date-time
    readonly createdBy?: { id: number; username: string};
}
/**
 * Listing - Auction
 */
export interface ListingAuction {
    price?: {
        buyNow?: number; // currency
        initialReserve?: number; // currency
    };
}
/**
 * Listing Bidding
 */
export type ListingBids = {
    username: string;
    bidAmount: number; // currency
    readonly dateCreated: string; // date-time
};
/**
 * Listing - Classified
 */
export interface ListingClassified {
    price?: {
        askingPrice?: number; // currency
        orNearestOffer?: boolean;
    };
}
/**
 * Listing - MQL
 */
export interface ListingMQL {
    price: number; // currency
    quantityAvailable: number;
    quantitySold: number;
}
/**
 * Listing - Payment Options
 */
export interface ListingPaymentOptions {
    method: string;
    methodDescription?: string | null;
}
/**
 * Listing - Shipping Options
 */
export interface ListingShippingOptions {
    method: string;
    methodDescription?: string | null;
    price: number; // currency
}
/**
 * Order
 */
export interface Order {
    readonly id?: number;
    readonly consumer?: User;
    readonly producer?: User;
    deliveryAddress?: string;
    phoneNumberE164?: string;
    statusConfirmed?: boolean;
    statusPaymentRecieved?: boolean;
    statusProcessed?: boolean;
    statusDelivered?: boolean;
    statusCompleted?: boolean;
    statusMessage?: string | null;
    readonly updatedOn?: string; // date-time
    readonly createdOn?: string; // date-time
}
/**
 * Order Items
 */
export type OrderItems = {
    readonly orderId?: number;
    readonly listingId?: number;
    readonly quantity: number;
    readonly price: number; // currency
}[];
export type OrderPayment = string;
export type OrderShipping = string;

/**
 * User
 */
export interface User {
    readonly id?: number;
    readonly accountType?: Type.UserAccount; // ^[A-Z_]+$
    username?: string;
    password?: string; // password
    givenName?: string;
    familyName?: string;
    email?: string; // email
    address?: string;
    phoneNumberE164?: string;
    readonly createdOn?: string; // date-time
    readonly banned?: boolean;
    readonly bannedBy?: number;
    readonly bannedReason?: string;
    readonly roles?: Type.UserRoles /* ^[A-Z_]+$ */ [];
}
/**
 * User Listing Watchlist
 */
export type UserListingWatchlist = Listing[];

export interface UserNotifications {
    listingId: number;
    type: string;
    value?: string;
    extra?: Record<string, any>;
}
