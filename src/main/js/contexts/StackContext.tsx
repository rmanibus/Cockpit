import React from 'react';
import { useRouter } from 'next/router';
import yaml from 'js-yaml';
import api from 'api';
import { DockerStack } from 'types/DockerStack';
import { DataContext, DataContextValue } from './DataContext';
import { merge, isObject, isArray, compact, isEmpty } from 'lodash';

export interface StackContextValue {
    originalStack: DockerStack;
    stack : DockerStack;
    stackId?: string;
    serviceId?: string;
    networkId?: string;
    configId?: string;
    secretId?: string;
    update: any;
    save: (message: string) => Promise<any>;
    refresh: () => Promise<any>;
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
    const { stackId, serviceId, networkId, configId, secretId } = router.query;
    const [originalStack, setOriginalStack] = React.useState<DockerStack | null>(null);
    const [stack, setStack] = React.useState<DockerStack | null>(null);
    

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
        var newStack = {...stack};
        if(!isEmpty(added)){
            newStack = computeAdded(newStack, added);
        }
        if(!isEmpty(removed)){
            newStack = computeRemoved(newStack, removed);
        }
        setStack(newStack);
    };

    const computeAdded = (stack, added) => {
        return merge(stack, added)
    };

    const computeRemoved = (stack, removed) => {
        if(isEmpty(removed)) return stack;
        
        const newStack = isArray(stack) ? []: {};

        for(var n in stack){
            if(removed[n] && (isObject(removed[n]))){
                newStack[n] = computeRemoved(stack[n], removed[n]);
            }
            else if(removed[n] && isArray(removed[n])){
                newStack[n] = compact(computeRemoved(stack[n], removed[n]))
            }
            else if (removed[n] === null){
            }
            else if (removed[n] !== stack[n]){
                newStack[n] = stack[n];
            }
        }
        return newStack;
    };

    const update = (item) => (added, removed) => {
        baseupdate({[item]: added}, removed && {[item]: removed})
    };

    const refresh = () => {
        if(!stackId){
            return Promise.reject("path not set");
        }
        return api.get('stacks/' + stackId + '/compose').then((res) => {
          try {
            const parsed = yaml.load(res.data);
            setStack(parsed);
            setOriginalStack(parsed);
          } catch (e) {
            console.log(e);
          }
        });
    }

    const save = (message: string) => {
        if(!stackId){
            return Promise.reject("path not set");
        }
        if(!stack){
            return Promise.reject("no stack to save");
        }
        return api.put('stacks/' + stackId + '/compose', {message, content: btoa(yaml.dump(stack))})
    }
    const clear = () => {
        setOriginalStack(null);
        setStack(null);
    }
    return (
        <StackContext.Provider
          value={{
            update,
            refresh,
            save,
            stackId,
            serviceId,
            networkId,
            secretId,
            configId,
            stack,
            originalStack
          }}
        >
          {children}
        </StackContext.Provider>
    );
}