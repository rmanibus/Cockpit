import React from 'react';
import { useRouter } from 'next/router';

const Service: React.FC = () => {
    const router = useRouter();
    const { stackId, serviceId } = router.query;

    return(
        <>
        </>
    );
}
export default Service;