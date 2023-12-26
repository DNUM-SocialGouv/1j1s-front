import { ElementWithTextNode } from '~/server/services/xml/fastXmlParser.service';

export interface XmlService {
	parse<T>(xml?: string): T | undefined;

	getTextValue<T>(element: ElementWithTextNode<T>): T
}
