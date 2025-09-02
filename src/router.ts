//@ts-ignore:
import { routes, routeContents } from "virtual:routes";
import { join } from "@bearz/path";
console.log(routes, routeContents)
const app = document.getElementById('app')!;
if (!app) throw 'no app!';

export async function loadPage(pageName: string) {
	const route = routes.find(([routePath]) =>
		routePath == pageName ||
		routePath == pageName+'index.html' ||
		routePath == '/'+pageName ||
		routePath == '/'+pageName+'index.html'
	);
	console.log(route)
	if (!route)
		return routeContents['/404.html'];
	return routeContents[route[0]]
}

export let currentRoute = '';

export async function goto(page: string) {
	console.log('goto', page)
	currentRoute = page;
	const pageContents = await loadPage(page);
	console.log(pageContents)
	app.innerHTML = pageContents;
	// run all <script>s
	app.querySelectorAll("script").forEach(oldScript => {
		const newScript = document.createElement("script");
		if (oldScript.src) {
			newScript.src = oldScript.src;
		} else {
			newScript.textContent = oldScript.textContent;
		}
		// copy attributes if needed
		for (const attr of oldScript.attributes) {
			newScript.setAttribute(attr.name, attr.value);
		}
		oldScript.replaceWith(newScript);
	});
}

// try to make <a> work,
const observer = new MutationObserver((mutations, observer) => {
	console.log(mutations)
	for (const mutation of mutations) {
		for (const node of mutation.addedNodes) {
			if (node.nodeName != 'A')
				continue;
			node.addEventListener('click', function (this: HTMLAnchorElement, e) {
				if (this.href.match(/^[a-z]+:\/\//))
					return;
				let url = this.href;
				if (!url.startsWith('/'))
					url = join(currentRoute, url);
				e.preventDefault();
				goto(url)
			})
		}
	}
})

observer.observe(document, {
	childList: true,
	subtree: true
})
