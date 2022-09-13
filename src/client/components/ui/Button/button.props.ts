import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<unknown> {
  buttonType: 'primary' | 'link' | 'linkWithRightIcon' | 'withLeftIcon' | 'withRightIcon' | 'withTopIcon' | 'linkWithLeftIcon'
  icon?: React.ReactNode
  buttonOnDarkBackground?: boolean
}
