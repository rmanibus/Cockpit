import React from 'react';
import { useRouter } from 'next/router';
import yaml from 'js-yaml';
import api from '../api';
import { DockerStack } from '../types/DockerStack';
import { DataContext, DataContextValue } from './DataContext';

export interface StackContextValue {
    stack : DockerStack;
    stackId: string;
    serviceId: string;
    update: any;
}

export const StackContext = React.createContext<StackContextValue>(null);
interface StackContextProviderProps {
    children: React.ReactNode;
}

export type Resource = {
    context: string;
    id?: string;
}
export const StackContextProvider: React.FC<StackContextProviderProps> = ({ children }: StackContextProviderProps) => {
    const router = useRouter();
    const { stackId, serviceId } = router.query;
    const [stack, setStack] = React.useState<DockerStack | null>(null);
    const [changeSet, setChangeSet] = React.useState({services: {}});

    const { setPath } = React.useContext<DataContextValue>(DataContext);

    React.useEffect(() => {
        if(stackId){
            setPath({context:'stacks', id: stackId});
            refresh();
        } else {
            clear();
        }
    }, [stackId]);

    const update = (item) => (value) => {
        const newStack = { ...stack, [item]: value };
        setStack(newStack);
    };

    const refresh = () => {
        if(!stackId){
            return Promise.reject("path not set");
        }
        return api.get('stacks/' + stackId + '/compose').then((res) => {
          try {
            const parsed = yaml.load(res.data);
            setStack(parsed);
          } catch (e) {
            console.log(e);
          }
        });
    }
    const clear = () => {
        setStack(null);
    }
    return (
        <StackContext.Provider
          value={{
            update,
            stackId,
            serviceId,
            stack
          }}
        >
          {children}
        </StackContext.Provider>
    );
}