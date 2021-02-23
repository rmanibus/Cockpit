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
    updateService: any;
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
    const { setPath } = React.useContext<DataContextValue>(DataContext);

    React.useEffect(() => {
        if(stackId){
            setPath({context:'stacks', id: stackId});
            refresh();
        }
    }, [stackId]);

    const updateService = (name) => (service) => {
        const newServices = { ...stack.services, [name]: service };
        const newStack = { ...stack, services: newServices };
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
    return (
        <StackContext.Provider
          value={{
            updateService,
            stackId,
            serviceId,
            stack
          }}
        >
          {children}
        </StackContext.Provider>
    );
}