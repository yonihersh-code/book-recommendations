export interface UserInput {
    name?: string;
    age: string;
    gender: string;
    tvShows: string;
    genres: string;
    pastBooks: string;
    favoriteAuthors: string;
    bookLength: string;
    otherFactors: string;
}

export interface BookRecommendation {
    title: string;
    author: string;
    reason: string;
    purchaseLink: string;
    kindleUnlimited: boolean;
}