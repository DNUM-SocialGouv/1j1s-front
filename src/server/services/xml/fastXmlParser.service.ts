import { XMLParser } from 'fast-xml-parser';

import { XmlService } from './xml.service';

export const TEXT_NODE_NAME = 'textContent';
export type ElementWithTextNode<T> = { 'textContent': T }

export class FastXmlParserService implements XmlService {

	private OPTIONS = {
		alwaysCreateTextNode: true,
		attributeNamePrefix: '',
		attributesGroupName: 'attributs',
		ignoreAttributes: false,
		textNodeName: TEXT_NODE_NAME,
	};

	public parse<T>(xml?: string): T | undefined {
		if (xml === undefined) {
			return undefined;
		}
		const parser = new XMLParser(this.OPTIONS);
		return parser.parse(xml) as T;
	}

	public getTextValue<T>(element: ElementWithTextNode<T>): T {
		return element[TEXT_NODE_NAME];
	}
}
