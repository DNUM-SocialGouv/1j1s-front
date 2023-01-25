function useLocalStorage(key: string): [string | null, (key: string) => void] {

	const value = localStorage.getItem(key);

	function setValue(newValue: string) {
		localStorage.setItem(key, newValue);
	}

	return [value, setValue];
};

export default useLocalStorage;
