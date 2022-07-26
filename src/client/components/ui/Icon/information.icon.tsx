import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function InformationIcon({ color = 'currentColor', className }: SvgProps) {
  return (
    <svg className={className} width="25" height="24" viewBox="0 0 25 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12.5 21.9995C6.977 21.9995 2.5 17.5225 2.5 11.9995C2.5 6.47651 6.977 1.99951 12.5 1.99951C18.023 1.99951 22.5 6.47651 22.5 11.9995C22.5 17.5225 18.023 21.9995 12.5 21.9995ZM11.5 10.9995V16.9995H13.5V10.9995H11.5ZM11.5 6.99951V8.99951H13.5V6.99951H11.5Z" />
    </svg>
  );
}
