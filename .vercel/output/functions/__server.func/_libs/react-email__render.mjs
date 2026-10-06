import { P as Pu, h as html } from "./prettier.mjs";
import { c as convert } from "./html-to-text.mjs";
import { c as decodeHTML, g as decodeHTMLAttribute } from "./entities.mjs";
import { p as parse, S as SyntaxKind } from "./html5parser.mjs";
import { j as jsxRuntimeExports, r as reactExports, R as React } from "./react.mjs";
import { Writable } from "node:stream";
import "./deepmerge.mjs";
function getHtmlNode(path) {
  const topNode = path.node;
  if (topNode) return topNode;
  return path.stack?.[path.stack.length - 1];
}
function recursivelyMapDoc(doc, callback) {
  if (Array.isArray(doc)) return doc.map((innerDoc) => recursivelyMapDoc(innerDoc, callback));
  if (typeof doc === "object") {
    if (doc.type === "line") return callback(doc.soft ? "" : " ");
    if (doc.type === "group") return {
      ...doc,
      contents: recursivelyMapDoc(doc.contents, callback),
      expandedStates: recursivelyMapDoc(doc.expandedStates, callback)
    };
    if ("contents" in doc) return {
      ...doc,
      contents: recursivelyMapDoc(doc.contents, callback)
    };
    if ("parts" in doc) return {
      ...doc,
      parts: recursivelyMapDoc(doc.parts, callback)
    };
    if (doc.type === "if-break") return {
      ...doc,
      breakContents: recursivelyMapDoc(doc.breakContents, callback),
      flatContents: recursivelyMapDoc(doc.flatContents, callback)
    };
    const nextDoc = { ...doc };
    for (const [key, value] of Object.entries(nextDoc)) if (value && typeof value === "object") nextDoc[key] = recursivelyMapDoc(value, callback);
    return nextDoc;
  }
  return callback(doc);
}
const modifiedHtml = { ...html };
if (modifiedHtml.printers) {
  const previousPrint = modifiedHtml.printers.html.print;
  modifiedHtml.printers.html.print = (path, options, print, args) => {
    const node = getHtmlNode(path);
    const rawPrintingResult = previousPrint(path, options, print, args);
    if (node?.type === "ieConditionalComment" || node?.kind === "ieConditionalComment") return recursivelyMapDoc(rawPrintingResult, (doc) => {
      if (typeof doc === "object" && doc.type === "line") return doc.soft ? "" : " ";
      return doc;
    });
    return rawPrintingResult;
  };
}
const defaults = {
  endOfLine: "lf",
  tabWidth: 2,
  plugins: [modifiedHtml],
  bracketSameLine: true,
  parser: "html"
};
const pretty = (str, options = {}) => {
  return Pu(str.replaceAll("\0", ""), {
    ...defaults,
    ...options
  });
};
const plainTextSelectors = [
  {
    selector: "img",
    format: "skip"
  },
  {
    selector: "[data-skip-in-text=true]",
    format: "skip"
  },
  {
    selector: "a",
    options: {
      linkBrackets: false,
      hideLinkHrefIfSameAsText: true
    }
  },
  {
    selector: '[data-text-format="dataTable"]',
    format: "dataTable"
  }
];
function toPlainText(html2, options) {
  return convert(html2, {
    wordwrap: false,
    ...options,
    selectors: [...plainTextSelectors, ...options?.selectors ?? []]
  });
}
const SKIPPED_TAGS = /* @__PURE__ */ new Set([
  "img",
  "noscript",
  "script",
  "style",
  "template"
]);
const WHITESPACE_RUN = /([ \t\n\r\f\u200b]+)/;
const TAG_BLOCKS = {
  article: {
    open: 2,
    close: 2
  },
  aside: {
    open: 2,
    close: 2
  },
  blockquote: {
    open: 2,
    close: 2,
    prefix: {
      first: "> ",
      rest: "> "
    }
  },
  div: {
    open: 2,
    close: 2
  },
  footer: {
    open: 2,
    close: 2
  },
  form: {
    open: 2,
    close: 2
  },
  h1: {
    open: 3,
    close: 2
  },
  h2: {
    open: 3,
    close: 2
  },
  h3: {
    open: 3,
    close: 2
  },
  h4: {
    open: 3,
    close: 2
  },
  h5: {
    open: 3,
    close: 2
  },
  h6: {
    open: 3,
    close: 2
  },
  header: {
    open: 2,
    close: 2
  },
  hr: {
    open: 2,
    close: 2
  },
  main: {
    open: 2,
    close: 2
  },
  nav: {
    open: 2,
    close: 2
  },
  p: {
    open: 2,
    close: 2
  },
  pre: {
    open: 2,
    close: 2
  },
  section: {
    open: 2,
    close: 2
  },
  table: {
    open: 2,
    close: 2
  }
};
function unstableToPlainText(html2) {
  const tree = parse(html2, { setAttributeMap: true });
  const body = findBody(tree);
  const blocks = [{
    block: {
      open: 0,
      close: 0
    },
    text: [],
    leading: 0,
    stash: 0,
    space: false
  }];
  const stack = [{
    parent: body,
    children: body?.body ?? tree,
    index: 0,
    pre: false,
    opened: false,
    textFrom: 0,
    orderedList: void 0
  }];
  while (stack.length > 0) {
    const frame = stack[stack.length - 1];
    const node = frame.children[frame.index];
    if (node === void 0) {
      stack.pop();
      exitElement(frame.parent, frame);
      continue;
    }
    frame.index += 1;
    enterNode(node, frame);
  }
  function top() {
    return blocks[blocks.length - 1];
  }
  function writeWord(value) {
    const block = top();
    if (block.stash > 0) block.text.push("\n".repeat(block.stash));
    else if (block.space && block.text.length > 0) block.text.push(" ");
    block.stash = 0;
    block.space = false;
    block.text.push(value);
  }
  function enterNode(node, frame) {
    if (node.type === SyntaxKind.Text) {
      const value = decodeHTML(node.value);
      if (frame.pre) {
        if (value.length > 0) writeWord(value);
      } else {
        const segments = value.split(WHITESPACE_RUN);
        for (let i = 0; i < segments.length; i++) {
          const segment = segments[i];
          if (segment.length === 0) continue;
          if (i % 2 === 1) top().space = true;
          else writeWord(segment);
        }
      }
      return;
    }
    if (SKIPPED_TAGS.has(node.name) || decodeHTMLAttribute(node.attributeMap?.["data-skip-in-text"]?.value?.value ?? "") === "true") return;
    const parentTag = frame.parent?.name;
    let block = TAG_BLOCKS[node.name];
    let orderedList;
    if (node.name === "ul") {
      const breaks = parentTag === "li" ? 1 : 2;
      block = {
        open: breaks,
        close: breaks
      };
    } else if (node.name === "li" && parentTag === "ul") block = {
      open: 1,
      close: 1,
      prefix: stack[stack.length - 2]?.parent?.name === "li" ? {
        first: "* ",
        rest: "  "
      } : {
        first: " * ",
        rest: "   "
      }
    };
    else if (node.name === "ol") {
      const nested = parentTag === "li";
      const parsedStart = Number.parseInt(decodeHTMLAttribute(node.attributeMap?.start?.value?.value ?? "1"), 10);
      const start = Number.isNaN(parsedStart) ? 1 : parsedStart;
      const itemCount = node.body?.filter((child) => child.type === SyntaxKind.Tag && child.name === "li").length ?? 0;
      let prefixLength = 0;
      for (let index = start; index < start + itemCount; index++) {
        const prefix = `${nested ? "" : " "}${index}. `;
        prefixLength = Math.max(prefixLength, prefix.length);
      }
      const breaks = nested ? 1 : 2;
      block = {
        open: breaks,
        close: breaks
      };
      orderedList = {
        next: start,
        prefixLength,
        nested
      };
    } else if (node.name === "li" && parentTag === "ol" && frame.orderedList) {
      const list = frame.orderedList;
      block = {
        open: 1,
        close: 1,
        prefix: {
          first: `${list.nested ? "" : " "}${list.next++}. `.padEnd(list.prefixLength),
          rest: " ".repeat(list.prefixLength)
        }
      };
    }
    if (block) blocks.push({
      block,
      text: [],
      leading: block.open,
      stash: 0,
      space: false
    });
    if (node.name === "hr") writeWord("-".repeat(40));
    else if (node.name === "br") {
      top().space = false;
      top().text.push("\n");
    }
    stack.push({
      parent: node,
      children: node.body ?? [],
      index: 0,
      pre: frame.pre || node.name === "pre",
      opened: block !== void 0,
      textFrom: top().text.length,
      orderedList
    });
  }
  function exitElement(element, frame) {
    if (element === void 0) return;
    if (element.name === "a") {
      const href = decodeHTMLAttribute(element.attributeMap?.href?.value?.value ?? "").replace(/^mailto:/, "");
      if (href.length > 0 && !href.startsWith("#")) {
        const anchorText = top().text.slice(frame.textFrom).join("");
        if (anchorText !== href) {
          if (anchorText.length > 0) top().space = true;
          writeWord(href);
        }
      }
    }
    if (frame.opened) closeBlock();
  }
  function closeBlock() {
    const child = blocks.pop();
    if (child === void 0) return;
    const parent = blocks[blocks.length - 1];
    let content = child.text.join("");
    const prefix = child.block.prefix;
    if (prefix !== void 0) {
      const trimmed = content.replace(/^\n+|\n+$/g, "");
      content = prefix.first + trimmed.replaceAll("\n", `
${prefix.rest}`);
    }
    const breaks = Math.max(parent.stash, child.leading);
    if (parent.text.length > 0) {
      parent.text.push("\n".repeat(breaks));
      if (content.length > 0) parent.text.push(content);
    } else {
      if (content.length > 0) parent.text.push(content);
      parent.leading = breaks;
    }
    parent.stash = Math.max(child.stash, child.block.close);
  }
  return blocks[0].text.join("");
}
function findBody(tree) {
  for (const child of tree) {
    if (child.type !== SyntaxKind.Tag || child.name !== "html") continue;
    for (const inner of child.body ?? []) if (inner.type === SyntaxKind.Tag && inner.name === "body") return inner;
  }
}
function createErrorBoundary(reject) {
  if (!React.Component) return (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: props.children });
  return class ErrorBoundary extends React.Component {
    componentDidCatch(error) {
      reject(error);
    }
    render() {
      return this.props.children;
    }
  };
}
const stripImagePreloadLinks = (html2) => {
  return html2.replace(/<link\b[^>]*\/?>/gi, (tag) => isImagePreloadLink(tag) ? "" : tag);
};
const isImagePreloadLink = (tag) => {
  const attributes = parseAttributes(tag);
  return attributes.rel === "preload" && attributes.as === "image";
};
const ATTRIBUTE_PATTERN = /([a-z][a-z0-9-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/gi;
const parseAttributes = (tag) => {
  const attributeSection = tag.replace(/^<[a-z][a-z0-9-]*/i, "");
  const attributes = {};
  for (const [, name, doubleQuoted, singleQuoted, unquoted] of attributeSection.matchAll(ATTRIBUTE_PATTERN)) attributes[name.toLowerCase()] = doubleQuoted ?? singleQuoted ?? unquoted ?? "";
  return attributes;
};
const readStream = async (stream) => {
  let result = "";
  const decoder = new TextDecoder("utf-8");
  if ("pipeTo" in stream) {
    const writableStream = new WritableStream({
      write(chunk) {
        result += decoder.decode(chunk, { stream: true });
      },
      close() {
        result += decoder.decode();
      }
    });
    await stream.pipeTo(writableStream);
  } else {
    const writable = new Writable({
      write(chunk, _encoding, callback) {
        result += decoder.decode(chunk, { stream: true });
        callback();
      },
      final(callback) {
        result += decoder.decode();
        callback();
      }
    });
    await new Promise((resolve, reject) => {
      writable.on("pipe", (source) => {
        source.on("error", (err) => {
          writable.destroy(err);
        });
      });
      writable.on("error", reject);
      writable.on("close", () => {
        resolve();
      });
      stream.pipe(writable);
    });
  }
  return result;
};
const render = async (node, options) => {
  const reactDOMServer = await import("./react-dom.mjs").then(function(n) {
    return n.s;
  }).then((m) => {
    if ("default" in m) return m.default;
    return m;
  });
  let html2;
  await new Promise((resolve, reject) => {
    if (Object.hasOwn(reactDOMServer, "renderToReadableStream") && typeof WritableStream !== "undefined") {
      const ErrorBoundary = createErrorBoundary(reject);
      reactDOMServer.renderToReadableStream(/* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { children: node }) }), {
        progressiveChunkSize: Number.POSITIVE_INFINITY,
        onError(error) {
          reject(error);
        }
      }).then(async (stream) => {
        await stream.allReady;
        return readStream(stream);
      }).then((result) => {
        html2 = result;
        resolve();
      }).catch(reject);
    } else {
      const ErrorBoundary = createErrorBoundary(reject);
      const stream = reactDOMServer.renderToPipeableStream(/* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { children: node }) }), {
        async onAllReady() {
          html2 = await readStream(stream).then((s) => {
            return s.replaceAll("\0", "");
          });
          resolve();
        },
        onError(error) {
          reject(error);
        },
        progressiveChunkSize: Number.POSITIVE_INFINITY
      });
    }
  });
  html2 = stripImagePreloadLinks(html2);
  if (options?.plainText) return options.unstableTextConversion ? unstableToPlainText(html2) : toPlainText(html2, options.htmlToTextOptions);
  const document = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">${html2.replace(/<!DOCTYPE.*?>/, "")}`;
  if (options?.pretty) return pretty(document);
  return document;
};
export {
  render as r
};
