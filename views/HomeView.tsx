import React from 'react';
import { CategoryTabs } from '../components/CategoryTabs';
import { NavigateTo } from '../types';

interface HomeViewProps {
    navigateTo: NavigateTo;
}

export const HomeView: React.FC<HomeViewProps> = ({ navigateTo }) => {
    return (
        <CategoryTabs navigateTo={navigateTo} />
    );
};
