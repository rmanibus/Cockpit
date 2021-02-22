import React from 'react';
import { useRouter } from 'next/router';
import api from '../../api'

const Stacks: React.FC = () => {

    const [stack, setStack] = React.useState();

    React.useEffect(() => {
        //api.get('stacks');
    }, []);

    return(
        <>
        </>
    );
}
export default Stacks;