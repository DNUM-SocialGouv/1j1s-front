import classNames from 'classnames';
import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useState,
} from 'react';

import styles from '~/client/components/ui/Tab/Tab.module.scss';
import { useSynchronizedRef } from '~/client/hooks/useSynchronizedRef';

import { KeyBoard } from '../../keyboard/keyboard.enum';

interface TabContext {
	indexTabActive: number,
	onTabChange: Dispatch<SetStateAction<number>>,
}

const TabContext = createContext<TabContext | null>(null);

const useTabContext = () => {
	const tabContext = useContext(TabContext);
	if (!tabContext) {
		throw new Error(
			'tabContext has to be used within <CurrentUserContext.Provider>',
		);
	}
	return tabContext;
};

type TabsProps = React.ComponentPropsWithoutRef<'div'>
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(function Tabs(props, ref) {
	const {
		className,
		children,
		...rest
	} = props;
	const [indexTabActive, setIndexTabActive] = useState<number>(0);

	const childrenArray = React.Children.toArray(children);
	const [tabLabel, ...tabPanels] = childrenArray;


	return (
		<div className={classNames(styles.tabList, className)} aria-labelledby="liste d'onglets" ref={ref} {...rest}>
			<TabContext.Provider value={{ indexTabActive, onTabChange: setIndexTabActive }}>
				{tabLabel}
				<div className={styles.tabPanelContainer}>
					{tabPanels[indexTabActive]}
				</div>
			</TabContext.Provider>
		</div>
	);
});

type TabProps = React.ComponentPropsWithoutRef<'button'>;
export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(function Tab(props, ref) {
	const {
		children,
		...rest
	} = props;

	return <button
		ref={ref}
		className={styles.tabLabel}
		role="tab"
		{...rest}
	>
		{children}
	</button>;
});

type TabPanelProps = React.ComponentPropsWithoutRef<'div'>
export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel(props, ref) {
	const {
		children,
		className,
		...rest
	} = props;
	const { indexTabActive } = useTabContext();

	return <div
		className={classNames(className, styles.tabPanel)}
		ref={ref}
		role="tabpanel"
		aria-labelledby={`tab-${indexTabActive}`}
		id={`panel-${indexTabActive}`}
		{...rest}>
		{children}
	</div>;
});

function getHtmlElement(element: Element | null | undefined) {
	return element instanceof HTMLElement ? element : null;
}

export const TabsLabel = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(function TabsLabel(props, outerRef) {
	const {
		children,
		...rest
	} = props;
	const tabsLabelRef = useSynchronizedRef(outerRef);
	const { indexTabActive, onTabChange } = useTabContext();

	function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
		const currentLabel = getHtmlElement(event.currentTarget);
		const previousElement = getHtmlElement(currentLabel?.previousElementSibling);
		const nextElement = getHtmlElement(currentLabel?.nextElementSibling);
		const parentLabel = tabsLabelRef.current;
		if (!parentLabel) {
			return;
		}

		const allTabsLabel = parentLabel.querySelectorAll('[role="tab"]');

		switch (event.key) {
			case KeyBoard.ARROW_LEFT:
				if (previousElement) previousElement.focus();
				else {
					const lastElement = getHtmlElement(allTabsLabel[allTabsLabel.length - 1]);
					lastElement?.focus();
				}
				break;
			case KeyBoard.ARROW_RIGHT:
				if (nextElement) nextElement.focus();
				else {
					const firstElement = getHtmlElement(allTabsLabel[0]);
					firstElement?.focus();
				}
				break;
			case KeyBoard.HOME:
				getHtmlElement(allTabsLabel[0])?.focus();
				break;
			case KeyBoard.END:
				getHtmlElement(allTabsLabel[allTabsLabel.length - 1])?.focus();
				break;
		}
	}

	return (
		<div className={styles.tabLabelContainer} role="tablist" ref={tabsLabelRef} {...rest}>
			{
				React.Children.map(children, (child, indexTab) => {
					if (React.isValidElement<TabProps>(child)) {
						let ariaControls = `panel-${indexTab}`;
						if (child.props['aria-controls']) {
							ariaControls += ` ${child.props['aria-controls']}`;
						}
						return React.cloneElement(child, {
							'aria-controls': ariaControls,
							'aria-selected': indexTabActive === indexTab,
							onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
								if (child.props.onClick) {
									child.props.onClick(event);
								}
								onTabChange(indexTab);
							},
							onKeyDown: handleKeyDown,
							tabIndex: indexTabActive === indexTab ? 0 : -1,
						});
					}
					return child;
				})
			}
		</div>
	);
});
