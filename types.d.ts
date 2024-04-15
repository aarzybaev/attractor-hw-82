export interface artistsApi {
    _id: string;
    name: string;
    photo: string | null;
    information: string;
    __v?: number;
}

export interface  albumsApi {
    _id: string;
    title: string;
    artist: string;
    releaseDate: string;
    coverImage: string | null;
}

export interface tracksApi {
    _id: string;
    title: string;
    album: string;
    duration: string;
}