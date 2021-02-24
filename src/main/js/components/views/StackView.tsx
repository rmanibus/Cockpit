import React from 'react';
import { VolumesListView } from './VolumesListView';
import { ServicesListView } from './ServicesListView';
import { NetworksListView } from './NetworksListView';
export const StackView: React.FC = () => {

  return (
    <>
      <ServicesListView />
      <VolumesListView />
      <NetworksListView />
    </>
  );
};
