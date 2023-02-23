function useSessionStorage(key: string): [string | null, (key: string) => void, () => void] {

	const value = sessionStorage.getItem(key);

	function setValue(newValue: string) {
		sessionStorage.setItem(key, newValue);
	}

	function removeKey() {
		sessionStorage.removeItem(key);
	}

	return [value, setValue,removeKey];
};

export default useSessionStorage;
