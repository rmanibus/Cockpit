import React from 'react';
import { VolumesListView } from './VolumesListView';
import { ServicesListView } from './ServicesListView';
import { NetworksListView } from './NetworksListView';
import { ConfigListView } from './ConfigListView';
import { SecretListView } from './SecretListView';

export const StackView: React.FC = () => {

  return (
    <>
      <ServicesListView />
      <VolumesListView />
      <NetworksListView />
      <ConfigListView />
      <SecretListView />
    </>
  );
};
