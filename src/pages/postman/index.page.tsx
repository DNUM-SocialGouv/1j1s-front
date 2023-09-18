import { useState } from 'react';

import { useDependency } from '../../client/context/dependenciesContainer.context';
import { PostmanService } from '../../client/services/postman/postman.service';

export default function Postman() {
	const postmanService = useDependency<PostmanService>('postmanService');

	const [url, setUrl] = useState('');
	const [body, setBody] = useState('');
	const [ip, setIp] = useState('');
	const [password, setPassword] = useState('');

	const [result, setResult] = useState('');

	async function sendRequest() {
		const result = await postmanService.sendRequest(url, body, ip, password);
		if (result.instance === 'success') {
			setResult(result.result);
		} else {
			setResult('Erreur');
		}
	}

	return <>
		<p>Url :</p>
		<input
			type="text"
			name="url"
			onChange={(event) => setUrl(event.currentTarget.value)}
		/>
		<p>Body :</p>
		<textarea
			name="body"
			onChange={(event) => setBody(event.currentTarget.value)}
		/>
		<p>Ip (Header) :</p>
		<input
			type="text"
			name="ip"
			onChange={(event) => setIp(event.currentTarget.value)}
		/>
		<p>Password :</p>
		<input
			type="text"
			name="password"
			onChange={(event) => setPassword(event.currentTarget.value)}
		/>
		<br/>
		<button onClick={sendRequest}>Send Button</button>
		<p>Result :</p>
		<p>{result}</p>
	</>;
}
