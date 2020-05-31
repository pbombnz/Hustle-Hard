/**
 * Entities
 *
 * Here are Interfaces that represent database models.
 *
 * Things to note about the Interfaces below:
 *
 * - Fields MUST be camel-cased.
 *      Conversion via the 'snakecasekeys' and/or 'camelcasekeys' NPM modules may be required for communication between the DB.
 *
 * - Fields that begin with '_' are pseudo-fields.
 *      They hold data that is not part of DB Schema. Generally data from DB 'joins'.
 *      Should be removed when used in SQL builders.
 *
 * - Fields that begin with '__' are metadata fields.
 *      They hold data that describes DB Schema or some part of the interface.
 *      Should be removed when used in SQL builders.
 *
 * - Every field is optional despite what the DB schema states.
 *      This is because some API calls only return partial object information.
 */

/**
 * Types - Listing
 */
export interface ListingType {
    id?: number;
    value?: string;
}
/**
 * Types - Listing Category
 */
export interface ListingCategoryType {
    id?: number;
    value?: string;
}

/**
 * Listing Category
 */
export interface ListingCategory {
    id?: number;
    type?: string; // ^[A-Z_]+$ && ListingType
    category?: string; // ListingCategoryType
}
/**
 * Listing
 */
export interface Listing {
    id?: number;
    typeId?: number; // ^[A-Z_]+$ && ListingCategoryType
    categoryId?: number; // ListingCategory
    status?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    winningInstructions?: string;
    photoIds?: string[];
    expiresOn?: Date;
    createdOn?: Date;
    createdBy?: number; // User
}
/**
 * Listing - Auction
 */
export interface ListingAuction {
    listingId?: number;
    price?: {
        buyNow?: number; // currency
        initialReserve?: number; // currency
    };
}
/**
 * Listing Bidding
 */
export type ListingBid = {
    listingId?: number;
    userId?: number;
    bidAmount?: number; // currency
    createdOn?: Date;
};
/**
 * Listing - Classified
 */
export interface ListingClassified {
    listingId?: number;
    price?: {
        askingPrice?: number; // currency
        orNearestOffer?: boolean;
    };
}
/**
 * Listing - MQL
 */
export interface ListingMQL {
    listingId?: number;
    price?: number; // currency
    quantityAvailable?: number;
    quantitySold?: number;
}
/**
 * Listing - Payment Options
 */
export interface ListingPaymentOptions {
    listingId?: number;
    method?: string;
    methodDescription?: string | null;
}
/**
 * Listing - Shipping Options
 */
export interface ListingShippingOptions {
    listingId?: number;
    method?: string;
    methodDescription?: string | null;
    price?: number; // currency
}
/**
 * Order
 */
export interface Order {
    id?: number;
    consumerUserId?: number;
    producerUserId?: number;
    deliveryAddress?: string;
    phoneNumberE164?: string;
    statusConfirmed?: boolean;
    statusPaymentRecieved?: boolean;
    statusProcessed?: boolean;
    statusDelivered?: boolean;
    statusCompleted?: boolean;
    statusMessage?: string | null;
    updatedOn?: Date;
    createdOn?: Date;
}
/**
 * Order Items
 */
export type OrderItem = {
    orderId?: number;
    listingId?: number;
    quantity?: number;
    price?: number; // currency
};

export type OrderPayment = string;
export type OrderShipping = string;

// /**
//  * Types - User Roles
//  */
// export interface UserRoleType {
//     id?: number;
//     value?: string;
// }

// /**
//  * User Roles
//  */
// export interface UserRoles {
//     userId?: number;
//     roleId?: number;

//     _user?: User;
//     _role?: UserRoleType;
// }

/**
 * User
 */
export interface User {
    id?: number;
    username?: string;
    google_id?: string;
    facebook_id?: string;
    client_cert_dn?: string;
    password?: string;
    givenName?: string;
    familyName?: string;
    email?: string;
    address?: string;
    phoneNumberE164?: string;
    createdOn?: Date;
    banned?: boolean;
    bannedBy?: number;
    bannedReason?: string;
}

/**
 * User Listing Watchlist
 */
export type UserListingWatchlist = Listing[];

export interface UserNotifications {
    userId?: number;
    listingId?: number;
    type?: string;
    value?: string;
    extra?: Record<string, any>;
}
