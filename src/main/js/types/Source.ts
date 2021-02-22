import React from 'react';
export interface SourceType {
    color: string;
    text: string;
    icon: React.FC;
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