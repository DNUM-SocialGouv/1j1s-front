import React from 'react';

export function getTextFromChildren(node: React.ReactNode): string {
	if (typeof node === 'string' || typeof node === 'number') {
		return node.toString();
	}
	if (Array.isArray(node)) {
		return React.Children.map(node, getTextFromChildren)?.filter(Boolean).join(' ') ?? '';
	}
	if (React.isValidElement(node) && node.props.children != null) {

		return React.Children.map(node.props.children, getTextFromChildren)?.filter(Boolean).join(' ') ?? '';
	}
	return '';
}
