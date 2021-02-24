
import React from 'react';
import { isObject } from 'lodash';
import { Alert } from 'antd';
import { StackContext, StackContextValue } from '../../contexts/StackContext';


export const ChangesView: React.FC = () => {

    const { changeSet } = React.useContext<StackContextValue>(StackContext);
    const display = (changeset) => {
        
        const changes = {};
        const walk = (obj, path="", type) => {
            for(var n in obj ){
                const newPath = path ?  path + "."+ n : n ;
                if(obj[n] && (isObject(obj[n]))){
                    walk(obj[n], newPath, type);
                }else{
                    changes[newPath] = {...changes[newPath], [type]: obj[n]};
                }
            }
        }
        walk(changeset.added, "", "added");
        walk(changeset.removed, "", "removed");
        console.log(changeset.added, changes);
        return changes;
    }

    return(
        <>
        {Object.entries(display(changeSet)).map(([key, value]) => 
            <>
                {key}
                {value.added && <Alert message={value.added} type="success" />}
                {value.removed && <Alert message={value.removed} type="error" />}
            </>
        )}
        </>
    );
}