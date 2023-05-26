import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { PageWrapper } from 'app/components/PageWrapper';
import { VmList } from '../VmList';

export function HomePage() {
    return (
        <>
            <Helmet>
                <title>Home Page</title>
            </Helmet>
            <NavBar />
            <PageWrapper>
                <VmList />
            </PageWrapper>
        </>
    );
}
