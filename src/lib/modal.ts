import { NS } from "@ns";
import { ReactDOM } from "/lib/react";

const makeClosable = (container: HTMLElement, closer: HTMLElement) => {
	const state: {
		isClosed: boolean;
		onClose: null | (() => unknown);
	} = {
		isClosed: false,
		onClose: null,
	};

	const onClose = (listener: null | (() => unknown)) => {
		state.onClose = listener;
	};

	const close = () => {
		if (state.isClosed) {
			return;
		}
		state.isClosed = true;
		container.remove();
		if (state.onClose !== null) {
			state.onClose();
		}
	};

	closer.onclick = (ev) => {
		ev.preventDefault();
		close();
	};

	return {
		onClose,
		close,
	};
};

const makeDraggable = (
	Document: Document,
	container: HTMLElement,
	knob: HTMLElement,
) => {
	let x = 0;
	let y = 0;

	container.style.userSelect = "none";

	knob.onmousedown = (ev) => {
		const x0 = x;
		const y0 = y;
		const x1 = ev.pageX;
		const y1 = ev.pageY;
		const onMousemove = (ev: MouseEvent) => {
			const dx = ev.pageX - x1;
			const dy = ev.pageY - y1;
			x = x0 + dx;
			y = y0 + dy;
			container.style.transform = `translate(${x}px, ${y}px)`;
		};

		Document.addEventListener("mousemove", onMousemove);

		knob.onmouseup = () => {
			Document.removeEventListener("mousemove", onMousemove);
			knob.onmouseup = null;
		};
	};
};

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

	makeDraggable(Document, container, headerEl);
	const { onClose, close } = makeClosable(container, closeEl);

	const setTitle = (title: string) => {
		titleEl.innerText = title;
	};

	return {
		setTitle,
		onClose,
		close,
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
	const { setTitle, onClose, close } = createHeader(Document, container);
	const { render } = createBody(Document, container);

	const hookExit = (ns: NS) => {
		onClose(() => {
			ns.exit();
		});
		ns.atExit(() => {
			close();
		});
	};

	return {
		setTitle,
		render,
		hookExit,
	};
};
