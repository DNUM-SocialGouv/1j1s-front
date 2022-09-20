import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<unknown> {
  buttonType: 'primary' | 'link' | 'linkWithRightIcon' | 'withLeftIcon' | 'withRightIcon' | 'withTopIcon' | 'secondary'
  icon?: React.ReactNode
  buttonOnDarkBackground?: boolean
}
