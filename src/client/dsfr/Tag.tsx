import classNames from 'classnames';

interface TagProps {
	label: string
	className?: string
}

export function Tag({ label, className }: TagProps) {
	return (
		<p className={classNames('fr-tag', className)}>{label}</p>
	);
}
