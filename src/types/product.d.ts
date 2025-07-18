export interface IProduct {
    _id: ObjectId;
    categoryId: string;
    productBaseMetalId: string;
    productBrandId: string;
    productColorId: string;
    productOccasionId: string;
    productPlatingId: string;
    productStoneTypeId: string;
    productTrendId: string;
    productTypeId: string;
    name: string;
    image: Array<{ _id: ObjectId, path: string }>;
    videoPath: string;
    code: string;
    price: number;
    mrp: number;
    qty: number;
    weight: number;
    size: string[];
    description: string;
    isWishlist: boolean;
    isCart: boolean;
    isPramotion: boolean;
    discount: number;
    inSuratCityCharge: number;
    inGujratStateCharge: number;
    inOutStateCharge: number;
    gst?: string;
    isPause?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export enum ProductDivision {
    Division1,
    Division2
}