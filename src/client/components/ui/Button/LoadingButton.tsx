import { SpinnerIcon } from '../Icon/spinner.icon';
import { ButtonComponent } from './ButtonComponent';

interface LoadingButtonProps {
	label: string
}
export const LoadingButton = ({ label } : LoadingButtonProps) => {
	return <ButtonComponent
		disabled
		icon={<SpinnerIcon/>}
		iconPosition="left"
		label={label}/>;
};
