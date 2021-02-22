import React from 'react';
import { useRouter } from 'next/router';

const Stack: React.FC = () => {
    const router = useRouter()
    const { stackId } = router.query;

    return(
        <>
        </>
    );
}
export default Stack;