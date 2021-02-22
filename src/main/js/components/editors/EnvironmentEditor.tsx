import React from 'react';
import { ListProps, ListEditor } from './ListEditor'
import { Environment } from '../../types/DockerStack';


export const EnvironmentEditor: React.FC<ListProps<Environment>> = ({ list, update }) => {
    return (
      <>
        <ListEditor name="environments" list={list} update={update} />
      </>
    );
  };