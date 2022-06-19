import React, { memo } from 'react';
import './style/index.less';

export interface <%= name %>Props {}

export const <%= name %>: React.FC<<%= name %>Props> = () => {

  return (
    <div className='<%= name %>'>
      <%= name %>
    </div>
  );
};

export default memo(<%= name %>);
