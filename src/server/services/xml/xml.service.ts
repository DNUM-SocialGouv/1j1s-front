export interface XmlService {
	parse<T>(xml?: string): T | undefined;
}
