import * as React from 'react';
import classes from './WithDialog.module.scss';

export const withDialog = (WrapperComponent: React.ComponentType<any>) => {
  return (props: any) => (
    <div className={classes.Dialog}>
      <WrapperComponent {...props} ></WrapperComponent>
    </div>
  )
}

