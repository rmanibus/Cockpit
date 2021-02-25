import React from 'react';
import { ListProps, ListOrDictEditor } from './ListOrDictEditor'
import { Environment } from '../../types/DockerStack';


export const EnvironmentEditor: React.FC<ListProps<Environment>> = ({ list, update }) => {
    return (
      <>
        <ListOrDictEditor name="environments" list={list} update={update} />
      </>
    );
  };