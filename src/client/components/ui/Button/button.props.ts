import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<unknown> {
  icon?: React.ReactNode
  buttonType: 'primary' | 'link' | 'linkWithRightIcon' | 'withLeftIcon' | 'withRightIcon' | 'withTopIcon'
  buttonOnDarkBackground?: boolean
}
