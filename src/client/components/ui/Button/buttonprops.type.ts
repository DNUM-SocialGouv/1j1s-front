import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<unknown> {
  icon?: React.ReactNode
  iconPosition?: 'right' | 'left'
  dataTestId?: string
  isInvertedStyle?: boolean
}
