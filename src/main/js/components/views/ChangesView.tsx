
import React from 'react';
import diff  from 'deep-diff';
import { Alert } from 'antd';
import { StackContext, StackContextValue } from 'contexts/StackContext';


export const ChangesView: React.FC = () => {

    const { originalStack, stack } = React.useContext<StackContextValue>(StackContext);
    const [diffs, setDiffs] = React.useState([]);

    React.useEffect(() => {
        setDiffs(diff(originalStack, stack));
    }, [originalStack, stack]);

    const displayDiff = (diffItem) => {
        switch(diffItem.kind){
            case 'N': 
            return (
                <>
                    {diffItem.path.join('.')}
                    <Alert type="success" message={diffItem.rhs }/>
                </>)
            case 'D': 
            return (
                <>
                    {diffItem.path.join('.')}
                    <Alert type="error" message={diffItem.lhs }/>
                </>)
            case 'E': 
            return (
            <>
                {diffItem.path.join('.')}
                <Alert type="success" message={diffItem.lhs }/>
                <Alert type="error" message={diffItem.rhs }/>
            </>)
            case 'A': 
            return (
                <>
                    {diffItem.path.join('.') + '[' + diffItem.index + ']'}
                    {displayDiff(diffItem.item)}
                </>)
        }
        return <></>;
    }
    return(
        <>
        {diffs && diffs.map(displayDiff)}
        </>
    );
}