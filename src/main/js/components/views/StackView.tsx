import React from 'react';
import { VolumesListView } from './VolumesListView';
import { ServicesListView } from './ServicesListView';
import { NetworksListView } from './NetworksListView';
import { ConfigsListView } from './ConfigsListView';
import { SecretsListView } from './SecretsListView';

export const StackView: React.FC = () => {

  return (
    <>
      <ServicesListView />
      <VolumesListView />
      <NetworksListView />
      <ConfigsListView />
      <SecretsListView />
    </>
  );
};
