import { AsyncMessage } from './AsyncMessage';
import { Category } from './Category';
import { Combobox as BaseComponent } from './Combobox';
import { Option } from './Option';

export const Combobox = Object.assign(BaseComponent, { AsyncMessage, Category, Option });
