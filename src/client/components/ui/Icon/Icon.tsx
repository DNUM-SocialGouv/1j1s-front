import Image from 'next/image';

export type IconType =
  'angle-down' |
  'angle-up' |
  'arrow-right' |
  'book' |
  'briefcase' |
  'compass' |
  'home' |
  'inside-redirection' |
  'magnifying-glass' |
  'trophy'

export interface IconProps {
  type: IconType
}

export function Icon({ type }: IconProps) {

}
