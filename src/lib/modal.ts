import { ReactDOM } from "/lib/react";

const createContainer = (Document: Document): HTMLDivElement => {
	const root = Document.getElementById("root");

	const container = Document.createElement("div");
	root?.appendChild(container);
	container.style.position = "fixed";
	container.style.top = container.style.right = "0";
	container.style.zIndex = "1500";
	container.style.backgroundColor = "gainsboro";
	container.style.fontFamily =
		'"Lucida Console", "Lucida Sans Unicode", "Fira Mono", Consolas, "Courier New", Courier, monospace, "Times New Roman"';

	return container;
};

const createHeader = (Document: Document, container: HTMLDivElement) => {
	const headerEl = Document.createElement("div");
	container.appendChild(headerEl);
	headerEl.style.padding = "0.5em";
	headerEl.style.borderBottom = "1px solid";
	headerEl.style.display = "flex";
	headerEl.style.gap = "1em";

	const titleEl = Document.createElement("div");
	headerEl.appendChild(titleEl);
	titleEl.style.flex = "1 0 0";

	const closeEl = Document.createElement("div");
	headerEl.appendChild(closeEl);
	closeEl.innerText = "[x]";
	closeEl.onclick = (e) => {
		e.preventDefault();
		container.remove();
	};

	const setTitle = (title: string) => {
		titleEl.innerText = title;
	};

	return {
		setTitle,
	};
};

const createBody = (Document: Document, container: HTMLDivElement) => {
	const body = Document.createElement("div");
	container.appendChild(body);
	body.style.padding = "0.5em";

	const render = (element: React.ReactElement) => {
		ReactDOM.render(element, body);
	};

	return {
		render,
	};
};

export const createModal = () => {
	// biome-ignore lint/complexity/useLiteralKeys:
	const Document = globalThis["document"];

	const container = createContainer(Document);
	const { setTitle } = createHeader(Document, container);
	const { render } = createBody(Document, container);

	return {
		render,
		setTitle,
	};
};
