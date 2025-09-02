import client from "../client.ts";
import { goto } from "../router.ts";
import { redirUrl } from "../stores.ts";
const test: string = 'a'
console.log('im here', test, client)
document.querySelector('form').addEventListener('submit', e => e.preventDefault())
async function doTokenLogin(token: string) {
	console.log("uh", token)
	console.log(await client.login(token));
	console.log('ye')
	localStorage.setItem('token', token)
}
document.getElementById('login').addEventListener('click', () => {
	const token = (document.getElementById('token') as HTMLInputElement).value
	console.log('login', token)
	localStorage.setItem('token', token);
	doTokenLogin(token);
	goto('/index.html')
})
if (localStorage.getItem('token')) {
	console.log('do haz token', redirUrl.get())
	await doTokenLogin(localStorage.getItem('token'))
	if (redirUrl.get() && redirUrl.get() != '/login.html')
		goto(redirUrl.get())
	else
		goto('/index.html')
}
// export default 'uh';