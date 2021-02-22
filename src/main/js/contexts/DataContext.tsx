import React from 'react';
import api from '../api';

interface DataContextValue {
    setPath(path: Resource): void;
    create(values: any): Promise<any>;
    remove(id: string): Promise<any>;
    update(): Promise<any>;
    listData: Array<any>;
    data: any;
}

export const DataContext = React.createContext<DataContextValue>(null);

interface DataContextProviderProps {
    children: React.ReactNode;
}

export type Resource = {
    context: string;
    id?: string;
}
export const DataContextProvider: React.FC<DataContextProviderProps> = ({ children }: DataContextProviderProps) => {

    const [path, setPath] = React.useState<Resource>(null);
    const [listData, setListData] = React.useState([]);
    const [data, setData] = React.useState(null);

    const create = (values) => {
        return api.post(path.context, values)
        .then(update);

    };

    const remove = (id) => {
        if(id == null && path.id == null){
            return Promise.reject("no id set");
        }
        return api.delete(path.context + "/" + (id || path.id))
        .then(update);
    };

    const update = () => {
        if(path !== null){
            if(path.id){
                return api.get(path.context + "/" + path.id)
                .then((res) => setData(res.data));
            }
            return api.get(path.context)
            .then((res) => setListData(res.data));
        }
        return Promise.reject("path not set");
    };

    React.useEffect(() => {
        if(path){
            update();
        }
    }, [path]);

    return (
        <DataContext.Provider
          value={{
            listData,
            data,
            create,
            update,
            remove,
            setPath
          }}
        >
          {children}
        </DataContext.Provider>
    );
}