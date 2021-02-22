import React from 'react';
import { ListProps, ListEditor } from './ListEditor'
import { Label } from '../types/DockerStack';


export const LabelsEditor: React.FC<ListProps<Label>> = ({ list, update }) => {
    return (
      <>
        <h3>Labels</h3>
        <ListEditor name="labels" list={list} update={update} />
      </>
    );
  };