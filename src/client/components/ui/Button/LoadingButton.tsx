import { SpinnerIcon } from '../Icon/spinner.icon';
import { ButtonComponent } from './ButtonComponent';

interface LoadingButtonProps {
	label?: string
	className?: string
}
export const LoadingButton = ({ label = 'Envoi en cours', className } : LoadingButtonProps) => {
	return (
		<ButtonComponent
			disabled
			icon={<SpinnerIcon />}
			iconPosition="left"
			label={label}
			className={className} />
	);
};
