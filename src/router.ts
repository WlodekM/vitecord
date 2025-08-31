import { routes, routeContents } from "virtual:routes";
console.log(routes, routeContents)
const app = document.getElementById('app')!;
if (!app) throw 'no app!';

export async function loadPage(pageName: string) {
	const route = routes.find(([routePath]) => routePath == pageName || routePath == pageName+'index.html');
	if (!route)
		return routeContents['/404.html']
}
