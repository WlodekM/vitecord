import './style.css'
import { goto } from "./router.ts";
import { redirUrl } from './stores.ts';
window.process = {
	versions: {
		node: '23.5.0'
	}
}

// goto(document.location.pathname)
redirUrl.set(document.location.pathname)
goto('/login.html')
