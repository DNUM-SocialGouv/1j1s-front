import { AsyncMessage } from './AsyncMessage';
import { Category } from './Category';
import { Combobox as BaseComponent } from './Combobox';
import { filterOnValueAndLabel } from './filterStrategies/filterOnValueAndLabel';
import { noFilter } from './filterStrategies/noFilter';
import { Option } from './Option';

export const Combobox = Object.assign(BaseComponent, {
	AsyncMessage,
	Category,
	Option,
	filterOnValueAndLabel,
	noFilter,
});
