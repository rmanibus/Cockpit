
export interface SourceType {
    color: string;
    text: string;
}
export interface SourceTypes {
    [key: string]: SourceType;
}

export interface Source {
    id: string;
    name: string;
    type: string;
    location: string;

}