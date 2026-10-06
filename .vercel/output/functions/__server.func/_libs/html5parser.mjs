var SyntaxKind = /* @__PURE__ */ ((SyntaxKind2) => {
  SyntaxKind2["Text"] = "Text";
  SyntaxKind2["Tag"] = "Tag";
  return SyntaxKind2;
})(SyntaxKind || {});
var selfCloseTags = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "bgsound",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "image",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
  "!doctype",
  "",
  "!",
  "!--"
]);
var noNestedTags = /* @__PURE__ */ new Set(["li", "option", "select", "textarea"]);
var rcDataTags = /* @__PURE__ */ new Set(["title", "textarea"]);
var rawTextTags = /* @__PURE__ */ new Set(["style", "xmp", "iframe", "noembed", "noframes"]);
var scriptDataTags = /* @__PURE__ */ new Set(["script"]);
var scriptingRawTextTags = /* @__PURE__ */ new Set(["noscript"]);
var plainTextTags = /* @__PURE__ */ new Set(["plaintext"]);
var state;
var buffer;
var bufSize;
var sectionStart;
var index;
var tokens;
var char;
var offset;
var textMode;
var textEndTag;
var pendingTextMode;
var pendingTextTag;
var tokenizeOptions;
function makeCodePoints(input) {
  return {
    lower: input.toLowerCase().split("").map((c) => c.charCodeAt(0)),
    upper: input.toUpperCase().split("").map((c) => c.charCodeAt(0)),
    length: input.length
  };
}
var doctype = makeCodePoints("!doctype");
function isWhiteSpace() {
  return char === 32 || char === 10 || char === 9 || char === 9 || char === 13 || char === 12;
}
function init(input, options) {
  state = 0;
  buffer = input;
  bufSize = input.length;
  sectionStart = 0;
  index = 0;
  tokens = [];
  offset = 0;
  textMode = 0;
  textEndTag = void 0;
  pendingTextMode = 0;
  pendingTextTag = "";
  tokenizeOptions = options;
}
function getTextMode(tagName) {
  if (rcDataTags.has(tagName)) {
    return 1;
  }
  if (rawTextTags.has(tagName)) {
    return 2;
  }
  if (scriptDataTags.has(tagName)) {
    return 3;
  }
  if (plainTextTags.has(tagName)) {
    return 4;
  }
  if (tokenizeOptions.scriptingEnabled && scriptingRawTextTags.has(tagName)) {
    return 2;
  }
  return 0;
}
function setPendingTextMode(tagName) {
  pendingTextTag = tagName;
  pendingTextMode = getTextMode(tagName);
}
function activatePendingTextMode(openTagEnd) {
  if (openTagEnd !== "/" && pendingTextMode !== 0) {
    textMode = pendingTextMode;
    textEndTag = makeCodePoints(pendingTextTag);
    if (pendingTextTag === "textarea" && buffer.charCodeAt(sectionStart) === 10) {
      sectionStart++;
      index++;
    }
  }
  pendingTextMode = 0;
  pendingTextTag = "";
}
function resetTextMode() {
  textMode = 0;
  textEndTag = void 0;
}
function resetTextClosingTag() {
  sectionStart -= 2;
  state = 0;
}
function tokenize(input, options = {}) {
  init(input, {
    scriptingEnabled: options.scriptingEnabled !== false
  });
  while (index < bufSize) {
    char = buffer.charCodeAt(index);
    switch (state) {
      case 0:
        parseLiteral();
        break;
      case 1:
        parseBeforeOpenTag();
        break;
      case 2:
        parseOpeningTag();
        break;
      case 3:
        parseAfterOpenTag();
        break;
      case 4:
        parseInValueNq();
        break;
      case 5:
        parseInValueSq();
        break;
      case 6:
        parseInValueDq();
        break;
      case 7:
        parseClosingOpenTag();
        break;
      case 8:
        parseOpeningSpecial();
        break;
      case 9:
        parseOpeningDoctype();
        break;
      case 10:
        parseOpeningNormalComment();
        break;
      case 11:
        parseNormalComment();
        break;
      case 12:
        parseShortComment();
        break;
      case 13:
        parseClosingNormalComment();
        break;
      case 14:
        parseClosingTag();
        break;
      default:
        unexpected();
    }
    index++;
  }
  switch (state) {
    case 0:
    case 1:
    case 4:
    case 5:
    case 6:
    case 7:
    case 11:
    case 12:
    case 13:
      emitToken(
        0
        /* Literal */
      );
      break;
    case 2:
      emitToken(
        1
        /* OpenTag */
      );
      break;
    case 3:
      break;
    case 8:
      emitToken(
        1,
        12
        /* InShortComment */
      );
      break;
    case 9:
      if (index - sectionStart === doctype.length) {
        emitToken(
          1
          /* OpenTag */
        );
      } else {
        emitToken(1, void 0, sectionStart + 1);
        emitToken(
          0
          /* Literal */
        );
      }
      break;
    case 10:
      if (index - sectionStart === 2) {
        emitToken(
          1
          /* OpenTag */
        );
      } else {
        emitToken(1, void 0, sectionStart + 1);
        emitToken(
          0
          /* Literal */
        );
      }
      break;
    case 14:
      emitToken(
        3
        /* CloseTag */
      );
      break;
  }
  const _tokens = tokens;
  init("", tokenizeOptions);
  return _tokens;
}
function emitToken(kind, newState = state, end = index) {
  let value = buffer.substring(sectionStart, end);
  if (kind === 1 || kind === 3) {
    value = value.toLowerCase();
  }
  if (kind === 1) {
    setPendingTextMode(value);
  }
  if (kind === 3) {
    resetTextMode();
  }
  if (!((kind === 0 || kind === 4) && end === sectionStart)) {
    tokens.push({ type: kind, start: sectionStart, end, value });
  }
  if (kind === 2 || kind === 3) {
    sectionStart = end + 1;
    state = 0;
    if (kind === 2) {
      activatePendingTextMode(value);
    }
  } else {
    sectionStart = end;
    state = newState;
  }
}
function parseLiteral() {
  if (textMode === 4) {
    return;
  }
  if (char === 60) {
    emitToken(
      0,
      1
      /* BeforeOpenTag */
    );
  }
}
function parseBeforeOpenTag() {
  if (textMode !== 0) {
    if (char === 47) {
      state = 14;
      sectionStart = index + 1;
    } else {
      state = 0;
    }
    return;
  }
  if (char >= 97 && char <= 122 || char >= 65 && char <= 90) {
    state = 2;
    sectionStart = index;
  } else if (char === 47) {
    state = 14;
    sectionStart = index + 1;
  } else if (char === 60) {
    emitToken(
      0
      /* Literal */
    );
  } else if (char === 33) {
    state = 8;
    sectionStart = index;
  } else if (char === 63) {
    sectionStart = index;
    emitToken(
      1,
      12
      /* InShortComment */
    );
  } else {
    state = 0;
  }
}
function parseOpeningTag() {
  if (isWhiteSpace()) {
    emitToken(
      1,
      3
      /* AfterOpenTag */
    );
  } else if (char === 62) {
    emitToken(
      1
      /* OpenTag */
    );
    emitToken(
      2
      /* OpenTagEnd */
    );
  } else if (char === 47) {
    emitToken(
      1,
      7
      /* ClosingOpenTag */
    );
  }
}
function parseAfterOpenTag() {
  if (char === 62) {
    emitToken(
      4
      /* Whitespace */
    );
    emitToken(
      2
      /* OpenTagEnd */
    );
  } else if (char === 47) {
    emitToken(
      4,
      7
      /* ClosingOpenTag */
    );
  } else if (char === 61) {
    emitToken(
      4
      /* Whitespace */
    );
    emitToken(5, void 0, index + 1);
  } else if (char === 39) {
    emitToken(
      4,
      5
      /* InValueSq */
    );
  } else if (char === 34) {
    emitToken(
      4,
      6
      /* InValueDq */
    );
  } else if (!isWhiteSpace()) {
    emitToken(
      4,
      4
      /* InValueNq */
    );
  }
}
function parseInValueNq() {
  if (char === 62) {
    emitToken(
      6
      /* AttrValueNq */
    );
    emitToken(
      2
      /* OpenTagEnd */
    );
  } else if (char === 47) {
    emitToken(
      6,
      7
      /* ClosingOpenTag */
    );
  } else if (char === 61) {
    emitToken(
      6
      /* AttrValueNq */
    );
    emitToken(5, 3, index + 1);
  } else if (isWhiteSpace()) {
    emitToken(
      6,
      3
      /* AfterOpenTag */
    );
  }
}
function parseInValueSq() {
  if (char === 39) {
    emitToken(7, 3, index + 1);
  }
}
function parseInValueDq() {
  if (char === 34) {
    emitToken(8, 3, index + 1);
  }
}
function parseClosingOpenTag() {
  if (char === 62) {
    emitToken(
      2
      /* OpenTagEnd */
    );
  } else {
    emitToken(
      6,
      3
      /* AfterOpenTag */
    );
    parseAfterOpenTag();
  }
}
function parseOpeningSpecial() {
  switch (char) {
    case 45:
      state = 10;
      break;
    case 100:
    // <!d
    case 68:
      state = 9;
      break;
    default:
      emitToken(
        1,
        12
        /* InShortComment */
      );
      break;
  }
}
function parseOpeningDoctype() {
  offset = index - sectionStart;
  if (offset === doctype.length) {
    if (isWhiteSpace()) {
      emitToken(
        1,
        3
        /* AfterOpenTag */
      );
    } else {
      unexpected();
    }
  } else if (char === 62) {
    emitToken(1, void 0, sectionStart + 1);
    emitToken(
      0
      /* Literal */
    );
    emitToken(
      2
      /* OpenTagEnd */
    );
  } else if (doctype.lower[offset] !== char && doctype.upper[offset] !== char) {
    emitToken(1, 12, sectionStart + 1);
  }
}
function parseOpeningNormalComment() {
  if (char === 45) {
    emitToken(1, 11, index + 1);
  } else {
    emitToken(1, 12, sectionStart + 1);
  }
}
function parseNormalComment() {
  if (char === 45) {
    emitToken(
      0,
      13
      /* ClosingNormalComment */
    );
  }
}
function parseShortComment() {
  if (char === 62) {
    emitToken(
      0
      /* Literal */
    );
    emitToken(
      2
      /* OpenTagEnd */
    );
  }
}
function parseClosingNormalComment() {
  offset = index - sectionStart;
  if (offset === 2) {
    if (char === 62) {
      emitToken(
        2
        /* OpenTagEnd */
      );
    } else if (char === 45) {
      emitToken(0, void 0, sectionStart + 1);
    } else {
      state = 11;
    }
  } else if (char !== 45) {
    state = 11;
  }
}
function parseClosingTag() {
  offset = index - sectionStart;
  if (textMode !== 0) {
    const endTag = textEndTag;
    if (!endTag) {
      unexpected();
    }
    if (char === 60) {
      resetTextClosingTag();
      emitToken(
        0,
        1
        /* BeforeOpenTag */
      );
    } else if (offset < endTag.length) {
      if (endTag.lower[offset] !== char && endTag.upper[offset] !== char) {
        resetTextClosingTag();
      }
    } else if (char === 62) {
      emitToken(
        3
        /* CloseTag */
      );
    } else if (!isWhiteSpace()) {
      resetTextClosingTag();
    }
  } else if (char === 62) {
    emitToken(
      3
      /* CloseTag */
    );
  }
}
function unexpected() {
  throw new SyntaxError(
    `Unexpected token "${buffer.charAt(index)}" at ${index} when parse ${state}`
  );
}
function getLineRanges(input) {
  return input.split("\n").reduce(
    (arr, line) => {
      arr.push(line.length + 1 + arr[arr.length - 1]);
      return arr;
    },
    [0]
  );
}
function getPosition(ranges, offset2) {
  let line = NaN;
  let column = NaN;
  for (let i = 1; i < ranges.length; i++) {
    if (ranges[i] > offset2) {
      line = i;
      column = offset2 - ranges[i - 1] + 1;
      break;
    }
  }
  return [line, column];
}
function visit(node2, parent, index3, options) {
  options.enter && options.enter(node2, parent, index3);
  if (node2.type === "Tag" && Array.isArray(node2.body)) {
    for (let i = 0; i < node2.body.length; i++) {
      visit(node2.body[i], node2, i, options);
    }
  }
  options.leave && options.leave(node2, parent, index3);
}
function walk(ast, options) {
  for (let i = 0; i < ast.length; i++) {
    visit(ast[i], void 0, i, options);
  }
}
var index2;
var count;
var tokens2;
var tagChain;
var nodes;
var token;
var node;
var buffer2;
var lines;
var parseOptions;
function init2(input, options) {
  if (input === void 0) {
    count = 0;
    tokens2.length = 0;
    buffer2 = "";
  } else {
    tokens2 = tokenize(input, {
      scriptingEnabled: options?.scriptingEnabled
    });
    count = tokens2.length;
    buffer2 = input;
  }
  index2 = 0;
  tagChain = void 0;
  nodes = [];
  token = void 0;
  node = void 0;
  lines = void 0;
  parseOptions = options;
}
function pushNode(_node) {
  if (!tagChain) {
    nodes.push(_node);
  } else if (_node.type === "Tag" && _node.name === tagChain.tag.name && noNestedTags.has(_node.name)) {
    tagChain = tagChain.parent;
    pushNode(_node);
  } else if (tagChain.tag.body) {
    tagChain.tag.end = _node.end;
    tagChain.tag.body.push(_node);
  }
}
function pushTagChain(tag) {
  tagChain = { parent: tagChain, tag };
  node = void 0;
}
function createLiteral(start = token.start, end = token.end, value = token.value) {
  return {
    start,
    end,
    value,
    type: "Text"
    /* Text */
  };
}
function createTag() {
  return {
    start: token.start - 1,
    // include <
    end: token.end,
    type: "Tag",
    open: createLiteral(token.start - 1),
    // not finished
    name: token.value,
    rawName: buffer2.substring(token.start, token.end),
    attributes: [],
    attributeMap: void 0,
    body: null,
    close: null
  };
}
function createAttribute() {
  return {
    start: token.start,
    end: token.end,
    name: createLiteral(),
    value: void 0
  };
}
function createAttributeValue() {
  return {
    start: token.start,
    end: token.end,
    value: token.type === 6 ? token.value : token.value.substr(1, token.value.length - 2),
    quote: token.type === 6 ? void 0 : token.type === 7 ? "'" : '"'
  };
}
function appendLiteral(_node = node) {
  _node.value += token.value;
  _node.end = token.end;
}
function unexpected2() {
  if (lines === void 0) {
    lines = getLineRanges(buffer2);
  }
  const [line, column] = getPosition(lines, token.start);
  throw new Error(
    `Unexpected token "${token.value}(${token.type})" at [${line},${column}]` + (tagChain ? ` when parsing tag: ${JSON.stringify(tagChain.tag.name)}.` : "")
  );
}
function buildAttributeMap(tag) {
  tag.attributeMap = {};
  for (const attr of tag.attributes) {
    tag.attributeMap[attr.name.value] = attr;
  }
}
function parseOpenTag() {
  let state2 = 0;
  let attr = void 0;
  const tag = createTag();
  pushNode(tag);
  if (tag.name === "" || tag.name === "!" || tag.name === "!--") {
    tag.open.value = "<" + tag.open.value;
    if (index2 === count) {
      return;
    } else {
      token = tokens2[++index2];
      if (token.type !== 2) {
        node = createLiteral();
        tag.body = [node];
        while (++index2 < count) {
          token = tokens2[index2];
          if (token.type === 2) {
            node = void 0;
            break;
          }
          appendLiteral();
        }
      }
      tag.close = createLiteral(token.start, token.end + 1, `${token.value}>`);
      tag.end = tag.close.end;
    }
    return;
  }
  while (++index2 < count) {
    token = tokens2[index2];
    if (token.type === 2) {
      tag.end = tag.open.end = token.end + 1;
      tag.open.value = buffer2.substring(tag.open.start, tag.open.end);
      if (token.value === "" && !selfCloseTags.has(tag.name)) {
        tag.body = [];
        pushTagChain(tag);
      } else {
        tag.body = void 0;
      }
      break;
    } else if (state2 === 0) {
      if (token.type !== 4) {
        attr = createAttribute();
        state2 = 1;
        tag.attributes.push(attr);
      }
    } else if (state2 === 1) {
      if (token.type === 4) {
        state2 = 2;
      } else if (token.type === 5) {
        state2 = 3;
      } else {
        appendLiteral(attr.name);
      }
    } else if (state2 === 2) {
      if (token.type !== 4) {
        if (token.type === 5) {
          state2 = 3;
        } else {
          attr = createAttribute();
          state2 = 1;
          tag.attributes.push(attr);
        }
      }
    } else if (state2 === 3) {
      if (token.type !== 4) {
        attr.value = createAttributeValue();
        if (token.type === 6) {
          state2 = 4;
        } else {
          attr.end = attr.value.end;
          state2 = 0;
        }
      }
    } else {
      if (token.type === 4) {
        attr.end = attr.value.end;
        state2 = 0;
      } else {
        appendLiteral(attr.value);
      }
    }
  }
}
function parseCloseTag() {
  let _context = tagChain;
  while (true) {
    if (!_context || token.value.trim() === _context.tag.name) {
      break;
    }
    _context = _context.parent;
  }
  if (!_context) {
    return;
  }
  _context.tag.close = createLiteral(
    token.start - 2,
    token.end + 1,
    buffer2.substring(token.start - 2, token.end + 1)
  );
  _context.tag.end = _context.tag.close.end;
  _context = _context.parent;
  tagChain = _context;
}
function parse(input, options) {
  init2(input, {
    setAttributeMap: false,
    scriptingEnabled: true,
    ...options
  });
  while (index2 < count) {
    token = tokens2[index2];
    switch (token.type) {
      case 0:
        if (!node) {
          node = createLiteral();
          pushNode(node);
        } else {
          appendLiteral(node);
        }
        break;
      case 1:
        node = void 0;
        parseOpenTag();
        break;
      case 3:
        node = void 0;
        parseCloseTag();
        break;
      default:
        unexpected2();
        break;
    }
    index2++;
  }
  const _nodes = nodes;
  if (parseOptions?.setAttributeMap) {
    walk(_nodes, {
      enter(node2) {
        if (node2.type === "Tag") {
          buildAttributeMap(node2);
        }
      }
    });
  }
  init2();
  return _nodes;
}
export {
  SyntaxKind as S,
  parse as p
};
