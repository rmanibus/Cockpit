import React from 'react';
import { VolumesListView } from './stack/VolumesListView';
import { ServicesListView } from './stack/ServicesListView';
import { NetworksListView } from './stack/NetworksListView';
import { ConfigsListView } from './stack/ConfigsListView';
import { SecretsListView } from './stack/SecretsListView';

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
