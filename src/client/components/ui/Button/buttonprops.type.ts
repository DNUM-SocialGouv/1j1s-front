import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<unknown> {
  icon?: React.ReactNode
  iconPosition?: 'right' | 'left'
  idForTest?: string
  disableStyle?: boolean
}
