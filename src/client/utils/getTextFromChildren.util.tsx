export function getTextFromChildren(node: unknown): string {
	if (typeof node === 'string') {
		return node;
	}
	if (typeof node === 'number') {
		return node.toString();
	}
	if (node instanceof Array) {
		return node.map(getTextFromChildren).filter(Boolean).join(' ');
	}
	if (typeof node === 'object' && node) {
		const objNode = node as { props?: { children: unknown } };
		return getTextFromChildren(objNode.props?.children);
	}
	return '';
}
