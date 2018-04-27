export const environment = {
	production: true
};

/* monkey patch log in prod */
window.console.log = () => null;
