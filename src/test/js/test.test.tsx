import {StackContextProvider} from 'contexts/StackContext';
import {DataContextProvider} from 'contexts/DataContext';
import {render, mount, cleanup} from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock("next/router");

test('test if jest is working', () => {

    useRouter.mockReturnValue({
        query: 
            {stackId: undefined, 
            serviceId: undefined, 
            networkId: undefined}
    });
    render(
    <DataContextProvider>
        <StackContextProvider>
        </StackContextProvider>
    </DataContextProvider>);
    expect(3).toBe(3);
});