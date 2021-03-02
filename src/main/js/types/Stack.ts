
import { Source } from './Source';
import { Docker } from './Docker';
export interface Stack {
    id: string;
    name: string;
    source: Source;
    docker: Docker;
}