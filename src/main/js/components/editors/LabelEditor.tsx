import React from 'react';
import { ListProps, ListOrDictEditor } from './ListOrDictEditor'
import { Labels } from '../../types/DockerStack';


export const LabelsEditor: React.FC<ListProps<Labels>> = ({ list, update }) => {
    return (
      <>
        <ListOrDictEditor name="labels" list={list} update={update} />
      </>
    );
  };