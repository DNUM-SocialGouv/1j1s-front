import { XMLParser } from 'fast-xml-parser';

import { XmlService } from './xml.service';

export class FastXmlParserService implements XmlService {
	parse<T>(xml?: string): T | undefined {
		if (xml === undefined) {
			return undefined;
		}
		const parser = new XMLParser();
		return parser.parse(xml) as T;
	}
}
