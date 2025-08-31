import './style.css'
import { goto } from "./router.ts";
import { redirUrl } from './stores.ts';

// goto(document.location.pathname)
redirUrl.set(document.location.pathname)
goto('login')
