import { SyncMessagePasDeResultat } from '~/client/components/ui/Form/Combobox/SyncMessagePasDeResultat';

import { AsyncMessage } from './AsyncMessage';
import { Category } from './Category';
import { Combobox as BaseComponent } from './Combobox';
import { filterValueOrLabelStartsWith } from './filterStrategies/filterValueOrLabelStartsWith';
import { noFilter } from './filterStrategies/noFilter';
import { Option } from './Option';

export const Combobox = Object.assign(BaseComponent, {
	AsyncMessage,
	Category,
	Option,
	SyncMessagePasDeResultat,
	filterValueOrLabelStartsWith,
	noFilter,
});
