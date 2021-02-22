import React from 'react';
import { useRouter } from 'next/router';

const EditService: React.FC = () => {
    const router = useRouter();
    const { stackId, serviceId } = router.query;
    
    return(
        <>
        </>
    );
}
export default EditService;