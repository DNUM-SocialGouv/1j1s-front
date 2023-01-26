function useSessionStorage(key: string): [string | null, (key: string) => void] {

	const value = sessionStorage.getItem(key);

	function setValue(newValue: string) {
		sessionStorage.setItem(key, newValue);
	}

	return [value, setValue];
};

export default useSessionStorage;
