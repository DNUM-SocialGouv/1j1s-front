import { SpinnerIcon } from '../Icon/spinner.icon';
import { ButtonComponent, ButtonComponentProps } from './ButtonComponent';

interface LoadingButtonProps extends ButtonComponentProps {
	label: string
}
export const LoadingButton = ({ label, ...rest } : LoadingButtonProps) => {
	return <ButtonComponent
		disabled
		icon={<SpinnerIcon/>}
		iconPosition="left"
		label={label}
		{...rest}
	/>;
};
