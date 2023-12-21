import { X2jOptionsOptional } from 'fast-xml-parser';

export interface XmlService {
	parse<T>(xml?: string, options?: X2jOptionsOptional): T | undefined;
}
