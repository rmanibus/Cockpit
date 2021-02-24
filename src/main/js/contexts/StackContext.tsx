import React from 'react';
import { useRouter } from 'next/router';
import yaml from 'js-yaml';
import api from '../api';
import { DockerStack } from '../types/DockerStack';
import { DataContext, DataContextValue } from './DataContext';
import { merge, isObject, isArray, compact } from 'lodash';

export interface StackContextValue {
    changeSet: any;
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
    const [changeSet, setChangeSet] = React.useState({});

    const { setPath } = React.useContext<DataContextValue>(DataContext);

    React.useEffect(() => {
        if(stackId){
            setPath({context:'stacks', id: stackId});
            refresh();
        } else {
            clear();
        }
    }, [stackId]);

    const baseupdate = (added, removed = {}) => {
        setChangeSet({...merge(changeSet, {added: added, removed: removed})});
        setStack(computeRemoved(merge({...stack}, added), removed));
    };

    const computeRemoved = (stack, removed) => {
        if(!removed){
            return stack;
        }
        const newStack = isArray(stack) ? []: {};

        for(var n in stack){
            if(removed[n] && (isObject(removed[n]))){
                newStack[n] = computeRemoved(stack[n], removed[n]);
            }
            else if(removed[n] && isArray(removed[n])){
                newStack[n] = compact(computeRemoved(stack[n], removed[n]))
            }
            else if (removed[n] !== stack[n]){
                newStack[n] = stack[n];
            }
        }
        return newStack;
    }

    const update = (item) => (added, removed) => {
        baseupdate({[item]: added}, removed && {[item]: removed})
    };

    const refresh = () => {
        if(!stackId){
            return Promise.reject("path not set");
        }
        setChangeSet({});
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
        setChangeSet({});
        setStack(null);
    }
    return (
        <StackContext.Provider
          value={{
            update,
            stackId,
            serviceId,
            stack,
            changeSet
          }}
        >
          {children}
        </StackContext.Provider>
    );
}