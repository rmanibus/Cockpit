import React from 'react';
import api from 'api';

export interface DataContextValue {
    setPath(path: Resource): void;
    create(values: any): Promise<any>;
    edit(values: any, id?: string): Promise<any>;
    get(id?: string): Promise<any>;
    remove(id?: string): Promise<any>;
    refresh(): Promise<any>;
    clearData(): void;
    clearListData(): void;
    listData: Array<any>;
    data: any;
    type: string;
    loading: boolean;
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
    const [type, setType] = React.useState("");
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    
    const create = (values) => {
        return api.post(path.context, values)
        .then(refresh);

    };

    const get = (id) => {
        if(id == null && path.id == null){
            return Promise.reject("no id set");
        }
        return api.get(path.context + "/" + (id || path.id))
        .then((res) => setData(res.data));
    };

    const edit = (values, id) => {
        if(id == null && path.id == null){
            return Promise.reject("no id set");
        }
        return api.put(path.context + "/" + (id || path.id), values)
        .then(refresh);
    };

    const remove = (id) => {
        if(id == null && path.id == null){
            return Promise.reject("no id set");
        }
        return api.delete(path.context + "/" + (id || path.id))
        .then(refresh);
    };

    const refresh = () => {
        if(path == null){
            return Promise.reject("path not set");
        }
        if(path.id){
            setListData(null);
            return api.get(path.context + "/" + path.id)
            .then((res) => {
                setData(res.data);
                setType(path.context.slice(0, -1));
            })
            ;
        }
        setData(null);
        return api.get(path.context)
        .then((res) => {
            setListData(res.data);
            setType("Array<" + path.context.slice(0, -1) + ">");
        });
    };

    const clearData = () => {
        setData(null);
    }
    const clearListData = () => {
        setListData(null);
    }
    React.useEffect(() => {
        setLoading(true);
        if(path){
            refresh()
            .finally(() => {
                setLoading(false);
            })
            .catch(() => {

            });
        }
    }, [path]);

    return (
        <DataContext.Provider
          value={{
            type,
            listData,
            data,
            loading,
            refresh,
            create,
            get,
            edit,
            remove,
            setPath,
            clearData,
            clearListData
          }}
        >
          {children}
        </DataContext.Provider>
    );
}