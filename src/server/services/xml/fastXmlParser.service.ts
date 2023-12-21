import { X2jOptionsOptional, XMLParser } from 'fast-xml-parser';

import { XmlService } from './xml.service';

export class FastXmlParserService implements XmlService {
	parse<T>(xml?: string, options?: X2jOptionsOptional): T | undefined {
		if (xml === undefined) {
			return undefined;
		}
		const parser = new XMLParser(options);
		return parser.parse(xml) as T;
	}
}
