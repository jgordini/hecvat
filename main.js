(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$init = function (_v0) {
	return _Utils_Tuple2(
		{collapsed: $elm$core$Set$empty, reportOpen: false, responses: $elm$core$Dict$empty},
		$elm$core$Platform$Cmd$none);
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$json$Json$Encode$dict = F3(
	function (toKey, toValue, dictionary) {
		return _Json_wrap(
			A3(
				$elm$core$Dict$foldl,
				F3(
					function (key, value, obj) {
						return A3(
							_Json_addField,
							toKey(key),
							toValue(value),
							obj);
					}),
				_Json_emptyObject(_Utils_Tuple0),
				dictionary));
	});
var $author$project$Main$generateDocx = _Platform_outgoingPort('generateDocx', $elm$core$Basics$identity);
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return A2($elm$core$Dict$member, key, dict);
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Set$remove = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A2($elm$core$Dict$remove, key, dict));
	});
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'SetResponse':
				var qid = msg.a;
				var val = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							responses: A3($elm$core$Dict$insert, qid, val, model.responses)
						}),
					$elm$core$Platform$Cmd$none);
			case 'ToggleSection':
				var code = msg.a;
				var collapsed = A2($elm$core$Set$member, code, model.collapsed) ? A2($elm$core$Set$remove, code, model.collapsed) : A2($elm$core$Set$insert, code, model.collapsed);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{collapsed: collapsed}),
					$elm$core$Platform$Cmd$none);
			case 'OpenReport':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{reportOpen: true}),
					$elm$core$Platform$Cmd$none);
			case 'CloseReport':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{reportOpen: false}),
					$elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					model,
					$author$project$Main$generateDocx(
						A3($elm$json$Json$Encode$dict, $elm$core$Basics$identity, $elm$json$Json$Encode$string, model.responses)));
		}
	});
var $author$project$Main$ExportDocx = {$: 'ExportDocx'};
var $author$project$Main$OpenReport = {$: 'OpenReport'};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Basics$not = _Basics_not;
var $author$project$Questions$Critical = {$: 'Critical'};
var $author$project$Questions$EmailInput = {$: 'EmailInput'};
var $author$project$Questions$Minor = {$: 'Minor'};
var $author$project$Questions$RadioYesNo = {$: 'RadioYesNo'};
var $author$project$Questions$Standard = {$: 'Standard'};
var $author$project$Questions$TelInput = {$: 'TelInput'};
var $author$project$Questions$TextArea = {$: 'TextArea'};
var $author$project$Questions$TextInput = {$: 'TextInput'};
var $author$project$Questions$Unscored = {$: 'Unscored'};
var $author$project$Questions$questions = _List_fromArray(
	[
		{compliantResponse: $elm$core$Maybe$Nothing, guidance: $elm$core$Maybe$Nothing, hasAdditional: false, id: 'GNRL-01', importance: $author$project$Questions$Unscored, inputType: $author$project$Questions$TextInput, isCritical: false, isScored: false, label: 'Solution Provider Name', section: 'GNRL', weight: 0},
		{compliantResponse: $elm$core$Maybe$Nothing, guidance: $elm$core$Maybe$Nothing, hasAdditional: false, id: 'GNRL-02', importance: $author$project$Questions$Unscored, inputType: $author$project$Questions$TextInput, isCritical: false, isScored: false, label: 'Solution Name', section: 'GNRL', weight: 0},
		{compliantResponse: $elm$core$Maybe$Nothing, guidance: $elm$core$Maybe$Nothing, hasAdditional: false, id: 'GNRL-03', importance: $author$project$Questions$Unscored, inputType: $author$project$Questions$TextArea, isCritical: false, isScored: false, label: 'Solution Description', section: 'GNRL', weight: 0},
		{compliantResponse: $elm$core$Maybe$Nothing, guidance: $elm$core$Maybe$Nothing, hasAdditional: false, id: 'GNRL-04', importance: $author$project$Questions$Unscored, inputType: $author$project$Questions$TextInput, isCritical: false, isScored: false, label: 'Solution Provider Contact Name', section: 'GNRL', weight: 0},
		{compliantResponse: $elm$core$Maybe$Nothing, guidance: $elm$core$Maybe$Nothing, hasAdditional: false, id: 'GNRL-05', importance: $author$project$Questions$Unscored, inputType: $author$project$Questions$TextInput, isCritical: false, isScored: false, label: 'Solution Provider Contact Title', section: 'GNRL', weight: 0},
		{compliantResponse: $elm$core$Maybe$Nothing, guidance: $elm$core$Maybe$Nothing, hasAdditional: false, id: 'GNRL-06', importance: $author$project$Questions$Unscored, inputType: $author$project$Questions$EmailInput, isCritical: false, isScored: false, label: 'Solution Provider Contact Email', section: 'GNRL', weight: 0},
		{compliantResponse: $elm$core$Maybe$Nothing, guidance: $elm$core$Maybe$Nothing, hasAdditional: false, id: 'GNRL-07', importance: $author$project$Questions$Unscored, inputType: $author$project$Questions$TelInput, isCritical: false, isScored: false, label: 'Solution Provider Contact Phone Number', section: 'GNRL', weight: 0},
		{compliantResponse: $elm$core$Maybe$Nothing, guidance: $elm$core$Maybe$Nothing, hasAdditional: false, id: 'GNRL-08', importance: $author$project$Questions$Unscored, inputType: $author$project$Questions$TextInput, isCritical: false, isScored: false, label: 'Country of Company Headquarters', section: 'GNRL', weight: 0},
		{compliantResponse: $elm$core$Maybe$Nothing, guidance: $elm$core$Maybe$Nothing, hasAdditional: false, id: 'GNRL-09', importance: $author$project$Questions$Unscored, inputType: $author$project$Questions$TextInput, isCritical: false, isScored: false, label: 'Employee Work Locations (all)', section: 'GNRL', weight: 0},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'COMP-01',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you have a dedicated software and system development team(s) (e.g., customer support, implementation, product management, etc.)?',
		section: 'COMP',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('Include circumstances that may involve offshoring or multinational agreements.'),
		hasAdditional: false,
		id: 'COMP-02',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: false,
		label: 'Describe your organization’s business background and ownership structure, including all parent and subsidiary relationships.',
		section: 'COMP',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'COMP-03',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Have you operated without unplanned disruptions to this solution in the past 12 months?',
		section: 'COMP',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'COMP-04',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a dedicated information security staff or office?',
		section: 'COMP',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('Share any details that would help information security analysts assess your solution.'),
		hasAdditional: false,
		id: 'COMP-05',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: false,
		label: 'Use this area to share information about your environment that will assist those who are assessing your company\'s data security program.',
		section: 'COMP',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('If you are only offering a service, or are offering a product that is not cloud-based, answer \"no\".'),
		hasAdditional: false,
		id: 'REQU-01',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: false,
		label: 'Are you offering a cloud-based product?',
		section: 'REQU',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('This includes any interface for end users and interfaces used by administrators at the institution.'),
		hasAdditional: false,
		id: 'REQU-02',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: false,
		label: 'Does your product or service have an interface?',
		section: 'REQU',
		weight: 0
	},
		{compliantResponse: $elm$core$Maybe$Nothing, guidance: $elm$core$Maybe$Nothing, hasAdditional: false, id: 'REQU-03', importance: $author$project$Questions$Unscored, inputType: $author$project$Questions$RadioYesNo, isCritical: false, isScored: false, label: 'Are you providing consulting services?', section: 'REQU', weight: 0},
		{compliantResponse: $elm$core$Maybe$Nothing, guidance: $elm$core$Maybe$Nothing, hasAdditional: false, id: 'REQU-04', importance: $author$project$Questions$Unscored, inputType: $author$project$Questions$RadioYesNo, isCritical: false, isScored: false, label: 'Does your solution have AI features, or are there plans to implement AI features in the next 12 months?', section: 'REQU', weight: 0},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('Answer \"yes\" if your solution handles personal health information (PHI), either directly or via a third party.'),
		hasAdditional: false,
		id: 'REQU-05',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: false,
		label: 'Does your solution process protected health information (PHI) or any data covered by the Health Insurance Portability and Accountability Act (HIPAA)?',
		section: 'REQU',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('Answer yes if your solution handles PCI (credit card) information, either directly or via a third party.'),
		hasAdditional: false,
		id: 'REQU-06',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: false,
		label: 'Is the solution designed to process, store, or transmit credit card information?',
		section: 'REQU',
		weight: 0
	},
		{compliantResponse: $elm$core$Maybe$Nothing, guidance: $elm$core$Maybe$Nothing, hasAdditional: false, id: 'REQU-07', importance: $author$project$Questions$Unscored, inputType: $author$project$Questions$TextArea, isCritical: false, isScored: false, label: 'Does operating your solution require the institution to operate a physical or virtual appliance in their own environment or to provide inbound firewall exceptions to allow your employees to remotely administer systems in the institution\'s environment?', section: 'REQU', weight: 0},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('This includes patient data, student data, employment data, human research data, financial data, etc.'),
		hasAdditional: false,
		id: 'REQU-08',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: false,
		label: 'Does your solution have access to personal or institutional data?',
		section: 'REQU',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DOCU-01',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you have a well-documented business continuity plan (BCP), with a clear owner, that is tested annually?',
		section: 'DOCU',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DOCU-02',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you have a well-documented disaster recovery plan (DRP), with a clear owner, that is tested annually?',
		section: 'DOCU',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: true,
		id: 'DOCU-03',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Have you undergone a SSAE 18/SOC 2 audit?',
		section: 'DOCU',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: true,
		id: 'DOCU-04',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you conform with a specific industry standard security framework (e.g., NIST Cybersecurity Framework, CIS Controls, ISO 27001, etc.)?',
		section: 'DOCU',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: true,
		id: 'DOCU-05',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Can you provide overall system and/or application architecture diagrams, including a full description of the data flow for all components of the system?',
		section: 'DOCU',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: true,
		id: 'DOCU-06',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does your organization have a data privacy policy?',
		section: 'DOCU',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: true,
		id: 'DOCU-07',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a documented, and currently implemented, employee onboarding and offboarding policy?',
		section: 'DOCU',
		weight: 10
	},
		{compliantResponse: $elm$core$Maybe$Nothing, guidance: $elm$core$Maybe$Nothing, hasAdditional: false, id: 'ITAC-01', importance: $author$project$Questions$Unscored, inputType: $author$project$Questions$TextInput, isCritical: false, isScored: false, label: 'Solution Provider Accessibility Contact Name', section: 'ITAC', weight: 0},
		{compliantResponse: $elm$core$Maybe$Nothing, guidance: $elm$core$Maybe$Nothing, hasAdditional: false, id: 'ITAC-02', importance: $author$project$Questions$Unscored, inputType: $author$project$Questions$TextInput, isCritical: false, isScored: false, label: 'Solution Provider Accessibility Contact Title', section: 'ITAC', weight: 0},
		{compliantResponse: $elm$core$Maybe$Nothing, guidance: $elm$core$Maybe$Nothing, hasAdditional: false, id: 'ITAC-03', importance: $author$project$Questions$Unscored, inputType: $author$project$Questions$EmailInput, isCritical: false, isScored: false, label: 'Solution Provider Accessibility Contact Email', section: 'ITAC', weight: 0},
		{compliantResponse: $elm$core$Maybe$Nothing, guidance: $elm$core$Maybe$Nothing, hasAdditional: false, id: 'ITAC-04', importance: $author$project$Questions$Unscored, inputType: $author$project$Questions$TelInput, isCritical: false, isScored: false, label: 'Solution Provider Accessibility Contact Phone Number', section: 'ITAC', weight: 0},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('VPAT can also be added as an attachment'),
		hasAdditional: false,
		id: 'ITAC-05',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: false,
		label: 'Web Link to Accessibility Statement or VPAT',
		section: 'ITAC',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('If your answer is “I do not know,” select “no.” If the VPAT/ACR is for an older version of the product or has not been updated, its information does not accurately reflect the accessibility of the product under consideration and the response should be \"no.\" Provide a link or attachment to the most recent VPAT/ACR.'),
		hasAdditional: true,
		id: 'ITAC-06',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Has a VPAT or ACR been created or updated for the solution and version under consideration within the past 12 months?',
		section: 'ITAC',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'ITAC-07',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Will your company agree to meet your stated accessibility standard or WCAG 2.1 AA as part of your contractual agreement for the solution?',
		section: 'ITAC',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Solutions \"substantially conform\" if they entirely meet WCAG 2.1 AA or if almost all user and administrator features conform. Documentation about limitations and/or workarounds should be provided where WCAG conformance is not presently achieved. If the solution substantially conforms to a newer standard such as WCAG 2.2 AA, answer \"yes.\"'),
		hasAdditional: false,
		id: 'ITAC-08',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Does the solution substantially conform to WCAG 2.1 AA?',
		section: 'ITAC',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Reporting and fixing accessibility issues is critical to a mature process. If the process for this question is merely a \"feature request\" and tracker, the answer to this question should be \"no.\"'),
		hasAdditional: false,
		id: 'ITAC-09',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you have a documented and implemented process for reporting and tracking accessibility issues?',
		section: 'ITAC',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('If specific configurations, settings, themes, author guides, or instructions are needed to ensure accessibility, are instructions on how to do so provided for administrators and end users?'),
		hasAdditional: true,
		id: 'ITAC-10',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have documentation to support the accessibility features of your solution?',
		section: 'ITAC',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Audit results, including VPAT/ACRs, are voluntary reports often generated by the creator of the product. Audits conducted and reports generated by expert third parties give greater confidence to customers.'),
		hasAdditional: false,
		id: 'ITAC-11',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Has a third-party expert conducted an audit of the most recent version of your solution?',
		section: 'ITAC',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'ITAC-12',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a documented and implemented process for verifying accessibility conformance?',
		section: 'ITAC',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Various federal and state governments in the United States and around the world have mandated accessibility technical requirements that should be considered and may be required when selling solutions to institutions in these jurisdictions.'),
		hasAdditional: false,
		id: 'ITAC-13',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Have you adopted a technical or legal standard of conformance for the solution?',
		section: 'ITAC',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('A detailed accessibility roadmap should reference improvements and progress on known accessibility issues as appropriate but does not necessarily need to list unreleased product features.'),
		hasAdditional: false,
		id: 'ITAC-14',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Can you provide a current, detailed accessibility roadmap with delivery timelines?',
		section: 'ITAC',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('How do you ensure that your professional staff keeps current with digital accessibility laws and best practices? Is your staff able to evaluate and test this product with assistive technologies such as a screen reader or alternative input devices? Examples of staff certification may include IAAP certifications <https://www.accessibilityassociation.org/s/professional-certifications> or §508 Trusted Tester <https://www.dhs.gov/trusted-tester>.'),
		hasAdditional: false,
		id: 'ITAC-15',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you expect your staff to maintain a current skill set in IT accessibility?',
		section: 'ITAC',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Describe where accessibility falls in the development and product lifecycle. Is it at the beginning of your project development or after the product is otherwise complete before launch? Do you incorporate accessibility in your development methods, such as Agile scrums? Does your customer-facing accessibility reporting match your development processes (i.e., Agile methods are best represented using a roadmap and timeline; revised VPAT/ACRs provide a snapshot in time of a given release)?'),
		hasAdditional: false,
		id: 'ITAC-16',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have documented processes and procedures for implementing accessibility into your development lifecycle?',
		section: 'ITAC',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'ITAC-17',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Can all functions of the application or service be performed using only the keyboard?',
		section: 'ITAC',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Just('Third-party overlays or add-ons are not sufficient for products to conform with accessibility standards. If there is an accessibility mode, does it address a specific accessibility need? Are plans in place to remove the accessible version, and are these distinctions delineated on your roadmap and timeline?'),
		hasAdditional: false,
		id: 'ITAC-18',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does your product rely on activating a special \"accessibility mode,\" a \"lite version,\" or using an alternate interface (including “overlay” or AI-based alternates)  for accessibility purposes?',
		section: 'ITAC',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'THRD-01',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$TextArea,
		isCritical: true,
		isScored: true,
		label: 'Do you perform security assessments of third-party companies with which you share data (e.g., hosting providers, cloud services, PaaS, IaaS, SaaS)?',
		section: 'THRD',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('List each third party and why institutional data is shared with them. Format example: [Third Party Name] - Reason'),
		hasAdditional: false,
		id: 'THRD-02',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you have contractual language in place with third parties governing access to institutional data?',
		section: 'THRD',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'THRD-03',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do the contracts in place with these third parties address liability in the event of a data breach?',
		section: 'THRD',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Robust answers from the solution provider improve the quality and efficiency of the security assessment process.'),
		hasAdditional: false,
		id: 'THRD-04',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you have an implemented third-party management strategy?',
		section: 'THRD',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Make sure you address any national or regional regulations.'),
		hasAdditional: false,
		id: 'THRD-05',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a process and implemented procedures for managing your hardware supply chain (e.g., telecommunications equipment, export licensing, computing devices)?',
		section: 'THRD',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'CONS-01',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Will the consultant require access to the institution\'s network resources?',
		section: 'CONS',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'CONS-02',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Has the consultant received training on (sensitive, HIPAA, PCI, etc.) data handling?',
		section: 'CONS',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'CONS-03',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Is the data encrypted (at rest) while in the consultant\'s possession?',
		section: 'CONS',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'CONS-04',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Can access be restricted based on source IP address?',
		section: 'CONS',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'CONS-05',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Will the consulting take place on-premises?',
		section: 'CONS',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'CONS-06',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Will the consultant require access to hardware in the institution\'s data centers?',
		section: 'CONS',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'CONS-07',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Will the consultant require an account within the institution\'s domain (@*.edu)?',
		section: 'CONS',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'CONS-08',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Will any data be transferred to the consultant\'s possession?',
		section: 'CONS',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'CONS-09',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Will the consultant need remote access to the institution\'s network or systems?',
		section: 'CONS',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('This includes end users, administrators, service accounts, etc. PBAC would include various dynamic controls such as conditional access, risk-based access, location-based access, or system activity–based access.'),
		hasAdditional: false,
		id: 'APPL-01',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Are access controls for institutional accounts based on structured rules, such as role-based access control (RBAC), attribute-based access control (ABAC), or policy-based access control (PBAC)?',
		section: 'APPL',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'APPL-02',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Are you using a web application firewall (WAF)?',
		section: 'APPL',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('If the web application only works with a subset of modern supported browsers, please indicate that here.'),
		hasAdditional: false,
		id: 'APPL-03',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Are only currently supported operating system(s), software, and libraries leveraged by the system(s)/application(s) that will have access to institution\'s data?',
		section: 'APPL',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'APPL-04',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Does your application require access to location or GPS data?',
		section: 'APPL',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'APPL-05',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$TextArea,
		isCritical: true,
		isScored: true,
		label: 'Does your application provide separation of duties between security administration, system administration, and standard user functions?',
		section: 'APPL',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'APPL-06',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you subject your code to static code analysis and/or static application security testing prior to release?',
		section: 'APPL',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'APPL-07',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you have software testing processes (dynamic or static) that are established and followed?',
		section: 'APPL',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('This includes system administrators and third-party personnel with access to the system. PBAC would include various dynamic controls such as conditional access, risk-based access, location-based access, or system activity–based access.'),
		hasAdditional: false,
		id: 'APPL-08',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Are access controls for staff within your organization based on structured rules, such as RBAC, ABAC, or PBAC?',
		section: 'APPL',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'APPL-09',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Does the system provide data input validation and error messages?',
		section: 'APPL',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Include any in-house developed or contract development.'),
		hasAdditional: false,
		id: 'APPL-10',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a process and implemented procedures for managing your software supply chain (e.g., libraries, repositories, frameworks, etc.)',
		section: 'APPL',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'APPL-11',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Have your developers been trained in secure coding techniques?',
		section: 'APPL',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'APPL-12',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Was your application developed using secure coding techniques?',
		section: 'APPL',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Select N/A if there is no mobile version of your app.'),
		hasAdditional: false,
		id: 'APPL-13',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'If mobile, is the application available from a trusted source (e.g., App Store, Google Play Store)?',
		section: 'APPL',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'APPL-14',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a fully implemented policy or procedure that details how your employees obtain administrator access to institutional instance of the application?',
		section: 'APPL',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Answer \"yes\" only if user AND administrator authentication is supported. If partially supported, answer \"no.\" Ensure you respond to any guidance in the Additional Information column.'),
		hasAdditional: false,
		id: 'AAAI-01',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Does your solution support single sign-on (SSO) protocols for user and administrator authentication?',
		section: 'AAAI',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AAAI-02',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'For customers not using SSO, does your solution support local authentication protocols for user and administrator authentication?',
		section: 'AAAI',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AAAI-03',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$TextArea,
		isCritical: true,
		isScored: true,
		label: 'For customers not using SSO, can you enforce password/passphrase complexity requirements (provided by the institution)?',
		section: 'AAAI',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Just('Answer \"yes\" if your solution has internal limits to password complexity (max langth, certain special characters unsupported, etc.).'),
		hasAdditional: false,
		id: 'AAAI-04',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'For customers not using SSO, does the system have password complexity or length limitations and/or restrictions?',
		section: 'AAAI',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AAAI-05',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'For customers not using SSO, do you have documented password/passphrase reset procedures that are currently implemented in the system and/or customer support?',
		section: 'AAAI',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AAAI-06',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Does your organization participate in InCommon or another eduGAIN-affiliated trust federation?',
		section: 'AAAI',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AAAI-07',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Are there any passwords/passphrases hard-coded into your systems or solutions?',
		section: 'AAAI',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AAAI-08',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Are you storing any passwords in plaintext?',
		section: 'AAAI',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AAAI-09',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Are audit logs available that include AT LEAST all of the following: login, logout, actions performed, and source IP address?',
		section: 'AAAI',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('Ensure that all elements of AAAI-10 are clearly stated in your response.'),
		hasAdditional: false,
		id: 'AAAI-10',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$TextArea,
		isCritical: true,
		isScored: false,
		label: 'Describe or provide a reference to the (a) system capability to log security/authorization changes, as well as user and administrator security events (i.e., physical or electronic), such as login failures, access denied, changes accepted; and (b) all requirements necessary to implement logging and monitoring on the system. Include (c) information about SIEM/log collector usage.',
		section: 'AAAI',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Ensure that all elements of AAAI-11 are clearly stated in your response.'),
		hasAdditional: false,
		id: 'AAAI-11',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$TextArea,
		isCritical: true,
		isScored: true,
		label: 'Can you provide the institution documentation regarding the retention period for those logs, how logs are protected, and whether they are accessible to the customer (and if so, how)?',
		section: 'AAAI',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AAAI-12',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'For customers not using SSO, does your application support integration with other authentication and authorization systems?',
		section: 'AAAI',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AAAI-13',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you allow the customer to specify attribute mappings for any needed information beyond a user identifier? (e.g., Reference eduPerson, ePPA/ePPN/ePE)',
		section: 'AAAI',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AAAI-14',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'For customers not using SSO, does your application support directory integration for user accounts?',
		section: 'AAAI',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('An answer of \"yes\" should be well-supported in the Additional Information column, and all elements of interest should be sufficiently addressed.'),
		hasAdditional: false,
		id: 'AAAI-15',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does your solution support any of the following web SSO standards: SAML2 (with redirect flow), OIDC, CAS, or other?',
		section: 'AAAI',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AAAI-16',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$EmailInput,
		isCritical: false,
		isScored: true,
		label: 'Do you support differentiation between email address and user identifier?',
		section: 'AAAI',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AAAI-17',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'For customers not using SSO, does your application and/or user frontend/portal support multifactor authentication (e.g., Duo, Google Authenticator, OTP, etc.)?',
		section: 'AAAI',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AAAI-18',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does your application automatically lock the session or log out an account after a period of inactivity?',
		section: 'AAAI',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'CHNG-01',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Will the institution be notified of major changes to your environment that could impact the institution\'s security posture?',
		section: 'CHNG',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Ensure that all relevant details pertaining to CHNG-06 are clearly stated in your response.'),
		hasAdditional: false,
		id: 'CHNG-02',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Does the system support client customizations from one release to another?',
		section: 'CHNG',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'CHNG-03',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you have an implemented system configuration management process (e.g.,secure \"gold\" images, etc.)?',
		section: 'CHNG',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: true,
		id: 'CHNG-04',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a documented change management process?',
		section: 'CHNG',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'CHNG-05',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does your change management process minimally include authorization, impact analysis, testing, and validation before moving changes to production?',
		section: 'CHNG',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'CHNG-06',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does your change management process verify that all required third-party libraries and dependencies are still supported with each major change?',
		section: 'CHNG',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'CHNG-07',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have policy and procedure, currently implemented, managing how critical patches are applied to all systems and applications?',
		section: 'CHNG',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'CHNG-08',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Have you implemented policies and procedures that guide how security risks are mitigated until patches can be applied?',
		section: 'CHNG',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'CHNG-09',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do clients have the option to not participate in or postpone an upgrade to a new release?',
		section: 'CHNG',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('List the current version you support and what percentage of customers are utilizing that version.'),
		hasAdditional: false,
		id: 'CHNG-10',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a fully implemented solution support strategy that defines how many concurrent versions you support?',
		section: 'CHNG',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'CHNG-11',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a release schedule for product updates?',
		section: 'CHNG',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'CHNG-12',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Do you have a technology roadmap, for at least the next two years, for enhancements and bug fixes for the solution being assessed?',
		section: 'CHNG',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'CHNG-13',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Can solution updates be completed without institutional involvement (i.e., technically or organizationally)?',
		section: 'CHNG',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'CHNG-14',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Are upgrades or system changes installed during off-peak hours or in a manner that does not impact the customer?',
		section: 'CHNG',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'CHNG-15',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Do procedures exist to provide that emergency changes are documented and authorized (including after-the-fact approval)?',
		section: 'CHNG',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'CHNG-16',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a systems management and configuration strategy that encompasses servers, appliances, cloud services, applications, and mobile devices (company and employee owned)?',
		section: 'CHNG',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DATA-01',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Will the institution\'s data be stored on any devices (database servers, file servers, SAN, NAS, etc.) configured with non-RFC 1918/4193 (i.e., publicly routable) IP addresses?',
		section: 'DATA',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DATA-02',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Is the transport of sensitive data encrypted using security protocols/algorithms (e.g., system-to-client)?',
		section: 'DATA',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DATA-03',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Is the storage of sensitive data encrypted using security protocols/algorithms (e.g., disk encryption, at-rest, files, and within a running database)?',
		section: 'DATA',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DATA-04',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do all cryptographic modules in use in your solution conform to the Federal Information Processing Standards (FIPS PUB 140-2 or 140-3)?',
		section: 'DATA',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DATA-05',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Will the institution\'s data be available within the system for a period of time at the completion of this contract?',
		section: 'DATA',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DATA-06',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$TextArea,
		isCritical: true,
		isScored: true,
		label: 'Are ownership rights to all data, inputs, outputs, and metadata retained even through a provider acquisition or bankruptcy event?',
		section: 'DATA',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DATA-07',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do backups containing the institution\'s data ever leave the institution\'s data zone either physically or via network routing?',
		section: 'DATA',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DATA-08',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Is media used for long-term retention of business data and archival purposes stored in a secure, environmentally protected area?',
		section: 'DATA',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Please specify if it will be returned, deleted, or both.'),
		hasAdditional: false,
		id: 'DATA-09',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'At the completion of this contract, will data be returned to the institution and/or deleted from all your systems and archives?',
		section: 'DATA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DATA-10',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Can the institution extract a full or partial backup of data?',
		section: 'DATA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DATA-11',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do current backups include all operating system software, utilities, security software, application software, and data files necessary for recovery?',
		section: 'DATA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DATA-12',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Are you performing off-site backups (i.e., digitally moved off site)?',
		section: 'DATA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DATA-13',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Are physical backups taken off-site (i.e., physically moved off site)?',
		section: 'DATA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DATA-14',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Are data backups encrypted?',
		section: 'DATA',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DATA-15',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a media handling process that is documented and currently implemented that meets established business needs and regulatory requirements, including end-of-life, repurposing, and data-sanitization procedures?',
		section: 'DATA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DATA-16',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Does the process described in DATA-15 adhere to DoD 5220.22-M and/or NIST SP 800-88 standards?',
		section: 'DATA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DATA-17',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does your staff (or third party) have access to institutional data (e.g., financial, PHI, or other sensitive information) through any means?',
		section: 'DATA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DATA-18',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a documented and currently implemented strategy for securing employee workstations when they work remotely (i.e., not in a trusted computing environment)?',
		section: 'DATA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DATA-19',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Does the environment provide for dedicated single-tenant capabilities? If not, describe how your solution or environment separates data from different customers (e.g., logically, physically, single tenancy, multi-tenancy).',
		section: 'DATA',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DATA-20',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Are ownership rights to all data, inputs, outputs, and metadata retained by the institution?',
		section: 'DATA',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DATA-21',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'In the event of imminent bankruptcy, closing of business, or retirement of service, will you provide 90 days for customers to get their data out of the system and migrate applications?',
		section: 'DATA',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Ensure that response addresses involatile storage and lists retention periods.'),
		hasAdditional: false,
		id: 'DATA-22',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Are involatile backup copies made according to predefined schedules and securely stored and protected?',
		section: 'DATA',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Summarize your cryptographic key management process.'),
		hasAdditional: false,
		id: 'DATA-23',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a cryptographic key management process (generation, exchange, storage, safeguards, use, vetting, and replacement) that is documented and currently implemented, for all system components (e.g., database, system, web, etc.)?',
		section: 'DATA',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('If you are using an option not listed, or a combination of options, select \"Other.\" Your selection here will determine which questions below are required.'),
		hasAdditional: false,
		id: 'DCTR-01',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: false,
		label: 'Select your hosting option.',
		section: 'DCTR',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DCTR-02',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Is a SOC 2 Type 2 report available for the hosting environment?',
		section: 'DCTR',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Please indicate which geographic regions you can provide storage in the Additional Info column.'),
		hasAdditional: false,
		id: 'DCTR-03',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Are you generally able to accommodate storing each institution\'s data within its geographic region?',
		section: 'DCTR',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DCTR-04',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Are the data centers staffed 24 hours a day, seven days a week (i.e., 24 x 7 x 365)?',
		section: 'DCTR',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DCTR-05',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Are your servers separated from other companies via a physical barrier, such as a cage or hard walls?',
		section: 'DCTR',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DCTR-06',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Does a physical barrier fully enclose the physical space, preventing unauthorized physical contact with any of your devices?',
		section: 'DCTR',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DCTR-07',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Are your primary and secondary data centers geographically diverse?',
		section: 'DCTR',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DCTR-08',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Is the service hosted in a high-availability environment?',
		section: 'DCTR',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DCTR-09',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Is redundant power available for all data centers where institutional data will reside?',
		section: 'DCTR',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DCTR-10',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Are redundant power strategies tested?',
		section: 'DCTR',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DCTR-11',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does the center where the data will reside have cooling and fire-suppression systems that are active and regularly tested?',
		section: 'DCTR',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('State the ISP provider(s) in addition to the number of ISPs that provide connectivity.'),
		hasAdditional: false,
		id: 'DCTR-12',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Do you have Internet Service Provider (ISP) redundancy?',
		section: 'DCTR',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DCTR-13',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$TelInput,
		isCritical: false,
		isScored: true,
		label: 'Does every data center where the institution\'s data will reside have multiple telephone company or network provider entrances to the facility?',
		section: 'DCTR',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DCTR-14',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you require multifactor authentication for all administrative accounts in your environment?',
		section: 'DCTR',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DCTR-15',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Are you using your cloud provider\'s available hardening tools or pre-hardened images?',
		section: 'DCTR',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Just('Describe your key management practices.'),
		hasAdditional: false,
		id: 'DCTR-16',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Does your cloud solution provider have access to your encryption keys?',
		section: 'DCTR',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'FIDP-01',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Are you utilizing a stateful packet inspection (SPI) firewall?',
		section: 'FIDP',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'FIDP-02',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you have a documented policy for firewall change requests?',
		section: 'FIDP',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'FIDP-03',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Have you implemented an intrusion detection system (network-based)?',
		section: 'FIDP',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'FIDP-04',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you employ host-based intrusion detection?',
		section: 'FIDP',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'FIDP-05',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Are audit logs available for all changes to the network, firewall, IDS, and IPS systems?',
		section: 'FIDP',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'FIDP-06',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Is authority for firewall change approval documented? Please list approver names or titles in Additional Info.',
		section: 'FIDP',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'FIDP-07',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Have you implemented an intrusion prevention system (network-based)?',
		section: 'FIDP',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'FIDP-08',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you employ host-based intrusion prevention?',
		section: 'FIDP',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'FIDP-09',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Are you employing any next-generation persistent threat (NGPT) monitoring?',
		section: 'FIDP',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('In addition to stating your intrusion monitoring strategy, provide a brief summary of its implementation.'),
		hasAdditional: false,
		id: 'FIDP-10',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: false,
		label: 'Is intrusion monitoring performed internally or by a third-party service?',
		section: 'FIDP',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'FIDP-11',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you monitor for intrusions on a 24 x 7 x 365 basis?',
		section: 'FIDP',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PPPR-01',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you have a documented patch management process?',
		section: 'PPPR',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PPPR-02',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Can your organization comply with institutional policies on privacy and data protection with regard to users of institutional systems, if required?',
		section: 'PPPR',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('State the country that governs and regulates your company.'),
		hasAdditional: false,
		id: 'PPPR-03',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Is your company subject to the institution\'s geographic region\'s laws and regulations?',
		section: 'PPPR',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PPPR-04',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Can you accommodate encryption requirements using open standards?',
		section: 'PPPR',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PPPR-05',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a documented systems development life cycle (SDLC)?',
		section: 'PPPR',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PPPR-06',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Do you perform background screenings or multi-state background checks on all employees prior to their first day of work?',
		section: 'PPPR',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PPPR-07',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you require new employees to fill out agreements and review policies?',
		section: 'PPPR',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PPPR-08',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a documented information security policy?',
		section: 'PPPR',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PPPR-09',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Are information security principles designed into the product lifecycle?',
		section: 'PPPR',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PPPR-10',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Will you comply with applicable breach notification laws?',
		section: 'PPPR',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PPPR-11',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have an information security awareness program?',
		section: 'PPPR',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PPPR-12',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Is security awareness training mandatory for all employees?',
		section: 'PPPR',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PPPR-13',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have process and procedure(s) documented, and currently followed, that require a review and update of the access list(s) for privileged accounts?',
		section: 'PPPR',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PPPR-14',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have documented, and currently implemented, internal audit processes and procedures?',
		section: 'PPPR',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PPPR-15',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does your organization have physical security controls and policies in place?',
		section: 'PPPR',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'HFIH-01',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a formal incident response plan?',
		section: 'HFIH',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'HFIH-02',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you either have an internal incident response team or retain an external team?',
		section: 'HFIH',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'HFIH-03',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have the capability to respond to incidents on a 24 x 7 x 365 basis?',
		section: 'HFIH',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'HFIH-04',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you carry cyber-risk insurance to protect against unforeseen service outages, data that is lost or stolen, and security incidents?',
		section: 'HFIH',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'VULN-01',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Are your systems and applications scanned with an authenticated user account for vulnerabilities (that are remediated) prior to new releases?',
		section: 'VULN',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'VULN-02',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$TextArea,
		isCritical: true,
		isScored: true,
		label: 'Will you provide results of application and system vulnerability scans to the institution?',
		section: 'VULN',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'VULN-03',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$TextArea,
		isCritical: true,
		isScored: true,
		label: 'Will you allow the institution to perform its own vulnerability testing and/or scanning of your systems and/or application, provided that testing is performed at a mutually agreed upon time and date?',
		section: 'VULN',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'VULN-04',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Have your systems and applications had a third-party security assessment completed in the last year?',
		section: 'VULN',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Ensure that all elements of VULN-05 are clearly stated in your response.'),
		hasAdditional: false,
		id: 'VULN-05',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you regularly scan for common web application security vulnerabilities (e.g., SQL injection, XSS, XSRF, etc.)?',
		section: 'VULN',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'VULN-06',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Are your systems and applications regularly scanned externally for vulnerabilities?',
		section: 'VULN',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-01',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do your workforce members receive regular training related to the Health Insurance Portability and Accountability Act (HIPAA) Privacy and Security Rules and the HITECH Act?',
		section: 'HIPA',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-02',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Have you identified areas of risk?',
		section: 'HIPA',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-03',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Have the relevant policies/plans been tested?',
		section: 'HIPA',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-04',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Have you entered into a Business Associate Agreements with all subcontractors who may have access to protected health information (PHI)?',
		section: 'HIPA',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-05',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you monitor or receive information regarding changes in HIPAA regulations?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-06',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Has your organization designated HIPAA Privacy and Security officers as required by the rules?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-07',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you comply with the requirements of the Health Information Technology for Economic and Clinical Health Act (HITECH)?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-08',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Have you conducted a risk analysis as required under the HIPAA Security Rule?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-09',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Have you taken actions to mitigate the identified risks?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-10',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does your application require user and system administrator password changes at a frequency no greater than 90 days?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-11',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does your application require users to set their own password after an administrator reset or on first use of the account?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-12',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does your application lock out an account after a number of failed login attempts?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-13',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does your application automatically lock or log-out an account after a period of inactivity?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-14',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Are passwords visible in plain text, whether when stored or entered, including service level accounts (i.e., database accounts, etc.)?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-15',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'If the application is institution-hosted, can all service level and administrative account passwords be changed by the institution?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-16',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Does your application provide the ability to define user access levels?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-17',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does your application support varying levels of access to administrative tasks defined individually per user?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-18',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does your application support varying levels of access to records based on user ID?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-19',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Is there a limit to the number of groups to which a user can be assigned?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-20',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Do accounts used for solution provider-supplied remote support abide by the same authentication policies and access logging as the rest of the system?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-21',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does the application log record access including specific user, date/time of access, and originating IP or device?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-22',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does the application log administrative activity, such as user account access changes and password changes, including specific user, date/time of changes, and originating IP or device?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-23',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you retain logs for at least as long as required by HIPAA regulations?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-24',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Can the application logs be archived?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-25',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Can the application logs be saved externally?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-26',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a disaster recovery plan and emergency mode operation plan?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-27',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Can you provide a HIPAA compliance attestation document?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-28',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Are you willing to enter into a Business Associate Agreement (BAA)?',
		section: 'HIPA',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to HIPAA regulations documentation for supplemental guidance in this section.'),
		hasAdditional: false,
		id: 'HIPA-29',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do your data backup and retention policies and practices meet HIPAA requirements?',
		section: 'HIPA',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to PCI DSS Security Standards for supplemental guidance in this section'),
		hasAdditional: false,
		id: 'PCID-01',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you have a current, executed within the past year, Attestation of Compliance (AoC) or Report on Compliance (RoC)?',
		section: 'PCID',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Just('Refer to PCI DSS Security Standards for supplemental guidance in this section'),
		hasAdditional: false,
		id: 'PCID-02',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Is the application listed as an approved Payment Application Data Security Standard (PA-DSS) application?',
		section: 'PCID',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Just('Refer to PCI DSS Security Standards for supplemental guidance in this section'),
		hasAdditional: false,
		id: 'PCID-03',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Does the system or solutions use a third party to collect, store, process, or transmit cardholder (payment/credit/debt card) data?',
		section: 'PCID',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to PCI DSS Security Standards for supplemental guidance in this section'),
		hasAdditional: false,
		id: 'PCID-04',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do your systems or solutions store, process, or transmit cardholder (payment/credit/debt card) data?',
		section: 'PCID',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to PCI DSS Security Standards for supplemental guidance in this section'),
		hasAdditional: false,
		id: 'PCID-05',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Are you compliant with the Payment Card Industry Data Security Standard (PCI DSS)?',
		section: 'PCID',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to PCI DSS Security Standards for supplemental guidance in this section'),
		hasAdditional: false,
		id: 'PCID-06',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Are you classified as a service provider?',
		section: 'PCID',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to PCI DSS Security Standards for supplemental guidance in this section'),
		hasAdditional: false,
		id: 'PCID-07',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Are you on the list of Visa approved service providers?',
		section: 'PCID',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to PCI DSS Security Standards for supplemental guidance in this section'),
		hasAdditional: false,
		id: 'PCID-08',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Are you classified as a merchant? If so, what level (1, 2, 3, 4)?',
		section: 'PCID',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('Refer to PCI DSS Security Standards for supplemental guidance in this section'),
		hasAdditional: false,
		id: 'PCID-09',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: false,
		label: 'Describe the architecture employed by the system to verify and authorize credit card transactions.',
		section: 'PCID',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('Refer to PCI DSS Security Standards for supplemental guidance in this section'),
		hasAdditional: false,
		id: 'PCID-10',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: false,
		label: 'What payment processors/gateways does the system support?',
		section: 'PCID',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Refer to PCI DSS Security Standards for supplemental guidance in this section'),
		hasAdditional: false,
		id: 'PCID-11',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Can the application be installed in a PCI DSS–compliant manner?',
		section: 'PCID',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('Refer to PCI DSS Security Standards for supplemental guidance in this section'),
		hasAdditional: false,
		id: 'PCID-12',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: false,
		label: 'Include documentation describing the system\'s abilities to comply with the PCI DSS and any features or capabilities of the system that must be added or changed in order to operate in compliance with the standards.',
		section: 'PCID',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'OPEM-01',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you support role-based access control (RBAC) for system administrators?',
		section: 'OPEM',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'OPEM-02',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Can your employees access customer systems remotely?',
		section: 'OPEM',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'OPEM-03',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Can you provide overall system and/or application architecture diagrams including a full description of the data communications architecture for all components of the system?',
		section: 'OPEM',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'OPEM-04',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you require remote management of the system?',
		section: 'OPEM',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'OPEM-05',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'If you answered \"yes\" to OPEM-04, are your remote actions and changes logged or otherwise visible to the campus?',
		section: 'OPEM',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'OPEM-06',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'If you maintain remote access to the system, will you handle data in a FERPA-compliant manner?',
		section: 'OPEM',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'OPEM-07',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you support campus status monitoring through SNMPv3 or other means?',
		section: 'OPEM',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('Please detail your monitoring strategy'),
		hasAdditional: false,
		id: 'OPEM-08',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: false,
		label: 'Describe or provide a reference to any other safeguards used to monitor for malicious activity.',
		section: 'OPEM',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('Include the number of years and in what capacity.'),
		hasAdditional: false,
		id: 'OPEM-09',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: false,
		label: 'Describe how long your organization has conducted business in this area.',
		section: 'OPEM',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'OPEM-10',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have existing higher education customers?',
		section: 'OPEM',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('FERPA-related data includes any data maintained by (or on behalf of) the institution that is directly related to an identifiable student.'),
		hasAdditional: false,
		id: 'PRGN-01',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: false,
		label: 'Does your solution process FERPA-related data?',
		section: 'PRGN',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('GDPR data includes any data related to an identified or identifiable natural person physically located in the European Economic Area (EEA).'),
		hasAdditional: false,
		id: 'PRGN-02',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: false,
		label: 'Does your solution process GDPR-related or PIPL-related data?',
		section: 'PRGN',
		weight: 0
	},
		{compliantResponse: $elm$core$Maybe$Nothing, guidance: $elm$core$Maybe$Nothing, hasAdditional: false, id: 'PRGN-03', importance: $author$project$Questions$Unscored, inputType: $author$project$Questions$RadioYesNo, isCritical: false, isScored: false, label: 'Does your solution process personal data regulated by state law(s) (e.g., CCPA)?', section: 'PRGN', weight: 0},
		{compliantResponse: $elm$core$Maybe$Nothing, guidance: $elm$core$Maybe$Nothing, hasAdditional: false, id: 'PRGN-04', importance: $author$project$Questions$Unscored, inputType: $author$project$Questions$TextArea, isCritical: false, isScored: false, label: 'Does your solution process user-provided data that may contain regulated information?', section: 'PRGN', weight: 0},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('If multiple notices are implicated, provide all that apply. If any other documents are incorporated by reference, provide them as well.'),
		hasAdditional: false,
		id: 'PRGN-05',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: false,
		label: 'Web Link to Product/Service Privacy Notice',
		section: 'PRGN',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PCOM-01',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Have you had a personal data breach in the past three years that involved reporting to a governmental agency, notice to individuals (including voluntary notice), or notice to another organization or institution?',
		section: 'PCOM',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('Share any additional details that would help data privacy analysts assess your solution.'),
		hasAdditional: false,
		id: 'PCOM-02',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$TextArea,
		isCritical: true,
		isScored: false,
		label: 'Use this area to share information about your privacy practices that will assist those who are assessing your company data privacy program.',
		section: 'PCOM',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PCOM-03',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Have you had any violations of your internal privacy policies or violations of applicable privacy law in the past 36 months?',
		section: 'PCOM',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('This can include another office, such as information security, dedicated to privacy protection.'),
		hasAdditional: false,
		id: 'PCOM-04',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a dedicated data privacy staff or office?',
		section: 'PCOM',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('SOC 2 Type II audits can be conducted for any or all of five trust principles (confidentiality, integrity, availability, security, and privacy). Answer \"yes\" if your audit included the privacy principle.'),
		hasAdditional: false,
		id: 'PDOC-01',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: false,
		label: 'If you have completed a SOC 2 audit, does it include the Privacy Trust Service Principle?',
		section: 'PDOC',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('Standard privacy frameworks help organizations enhance data protection, mitigate privacy risks, and demonstrate compliance with appropriate industry and regulatory standards. This is particularly important when providing services in different jurisdictions.'),
		hasAdditional: false,
		id: 'PDOC-02',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: false,
		label: 'Do you conform with a specific industry-standard privacy framework (e.g., NIST Privacy Framework, GDPR, ISO 27701)?',
		section: 'PDOC',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PDOC-03',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does your employee onboarding and offboarding policy include training of employees on information security and data privacy?',
		section: 'PDOC',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Inclusion of language in contractual agreements ensures third parties are aware of and have agreed to their obligations to maintain standards and comply with all regulatory requirements in regards to protection of personal data they handle on behalf of your organization.'),
		hasAdditional: false,
		id: 'PTHP-01',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you have contractual agreements with third parties that require them to maintain standards and to comply with all regulatory requirements?',
		section: 'PTHP',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Privacy impact assessments ensure that third-party collection, processing, or access to personal data aligns with and supports your organization\'s own efforts and commitments to clients. This is particularly important when a specific third party operates from or is subject to a jurisdiction different from that of your organization.'),
		hasAdditional: false,
		id: 'PTHP-02',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you perform privacy impact assesments of third parties that collect, process, or have access to personal data to ensure they meet industry and regulatory standards and to mitigate harmful, unethical, or discriminatory impacts on data subjects?',
		section: 'PTHP',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('The change management process minimizes disruption and maximizes benefits and should contain a privacy review process.'),
		hasAdditional: false,
		id: 'PCHG-01',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does your change management process include privacy review and approval?',
		section: 'PCHG',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Policy and procedure should include specific steps to take in the process of mitigating privacy risks.'),
		hasAdditional: false,
		id: 'PCHG-02',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have policy and procedure, currently implemented, guiding how privacy risks are mitigated until they can be resolved?',
		section: 'PCHG',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Just('Demographic information is generally defined as the statistical characteristics of a population used to study and understand certain aspects of that population. It can include characteristics such as age, gender, ethnicity, education, religion, geolocation, and occupation. If the information being collected, processed, or stored falls under a particular regulation (or law), check that regulation for a specific definition of demographic information.'),
		hasAdditional: false,
		id: 'PDAT-01',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you collect, process, or store demographic information?',
		section: 'PDAT',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Just('Genetic information would include information about genetic tests, genetic tests of family members, actual manifestations of diseases, and family medical records. Biometric information includes elements such as facial recognition, fingerprints, and voice recognition.'),
		hasAdditional: false,
		id: 'PDAT-02',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you capture or create genetic, biometric, or behaviometric information (e.g., facial recognition or fingerprints)?',
		section: 'PDAT',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Just('Institutional data is created, collected, maintained, transmitted, or stored by or for a college or university to conduct operations. Many institutions have their own specific definitions. Institutional data would include data such as financial information, student education records, faculty/staff/alumni data, research data, and data collected for government reporting purposes.'),
		hasAdditional: false,
		id: 'PDAT-03',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you combine institutional data (including \"de-identified,\" \"anonymized,\" or otherwise masked data) with personal data from any other sources?',
		section: 'PDAT',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Just('Given the vast number of privacy regulations and laws throughout the world, it is important to know when, where, why, and how institutional data is being shared outside the United States. This information is necessary to ensure compliance and to protect the institutional data.'),
		hasAdditional: false,
		id: 'PDAT-04',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Is institutional data coming into or going out of the United States at any point during collection, processing, storage, or archiving?',
		section: 'PDAT',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Just('Device information can be captured for a variety of reasons, from analytics to marketing to network management and security. It is important to know the details in order to be clear on the privacy implications.'),
		hasAdditional: false,
		id: 'PDAT-05',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you capture device information (e.g., IP address, MAC address)?',
		section: 'PDAT',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Just('Web tracking can be used to identify users via their IP address, login information, browser information, etc.'),
		hasAdditional: false,
		id: 'PDAT-06',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does any part of this service/project involve a web/app tracking component (e.g., use of web-tracking pixels, cookies)?',
		section: 'PDAT',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Just('Accessing institutional data may be necessary for legitimate business purposes.'),
		hasAdditional: false,
		id: 'PDAT-07',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does your staff (or a third party) have access to institutional data (e.g., financial, PHI, or other sensitive information) through any means?',
		section: 'PDAT',
		weight: 5
	},
		{compliantResponse: $elm$core$Maybe$Nothing, guidance: $elm$core$Maybe$Nothing, hasAdditional: false, id: 'PDAT-08', importance: $author$project$Questions$Unscored, inputType: $author$project$Questions$RadioYesNo, isCritical: false, isScored: false, label: 'Will you handle personal data in a manner compliant with all relevant laws, regulations, and applicable institution policies?', section: 'PDAT', weight: 0},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PRPO-01',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a documented privacy management process?',
		section: 'PRPO',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('The question is assessing your compliance with Privacy by Design (PbD) principles. This concept, embedded in regulations such as GDPR (Article 25) and other global privacy laws, requires that privacy is not an afterthought—it must be part of the design and architecture of systems and processes from the outset.'),
		hasAdditional: false,
		id: 'PRPO-02',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Are privacy principles designed into the product lifecycle (i.e., privacy-by-design)?',
		section: 'PRPO',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PRPO-03',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Will you comply with applicable breach notification laws?',
		section: 'PRPO',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('These policies may include specific user consent practices, data classification standards, and handling of sensitive information.'),
		hasAdditional: false,
		id: 'PRPO-04',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Will you comply with the institution\'s policies regarding user privacy and data protection?',
		section: 'PRPO',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Indicates whether your organization is legally bound by state, federal, or local laws where the institution operates.'),
		hasAdditional: false,
		id: 'PRPO-05',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Is your company subject to the laws and regulations of the institution\'s geographic region?',
		section: 'PRPO',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Privacy awareness/training refers to the ongoing education provided to individuals who handle sensitive data to ensure they understand privacy obligations, data protection principles, and regulatory requirements (e.g., FERPA, HIPAA, GDPR).'),
		hasAdditional: false,
		id: 'PRPO-06',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you have a privacy awareness/training program?',
		section: 'PRPO',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PRPO-07',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Is privacy awareness training mandatory for all employees?',
		section: 'PRPO',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PRPO-08',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Is AI privacy and ethics awareness/training required for all employees who work with AI?',
		section: 'PRPO',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Just('Examples of such automated decisions could include automatically denying or approving user access requests, flagging or blocking transactions based on risk scores, or AI-driven decisions that affect user outcomes (e.g., eligibility, grading, pricing).'),
		hasAdditional: false,
		id: 'PRPO-09',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have any decision-making processes that are completely automated (i.e., there is no human involvement)?',
		section: 'PRPO',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PRPO-10',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a documented process for managing automated processing, including validations, monitoring, and data subject requests?',
		section: 'PRPO',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PRPO-11',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a documented policy for sharing information with law enforcement?',
		section: 'PRPO',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'PRPO-12',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$TextArea,
		isCritical: true,
		isScored: true,
		label: 'Do you share any institutional data with law enforcement without a valid warrant or subpoena?',
		section: 'PRPO',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Provide an overview of your incident response team membership and its charge, highlighting the privacy analyst/officer.'),
		hasAdditional: false,
		id: 'PRPO-13',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does your incident response team include a privacy analyst/officer?',
		section: 'PRPO',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Just('See GDPR Chapter 1, Art. 4, for definitions.'),
		hasAdditional: false,
		id: 'INTL-01',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Will data be collected from or processed in or stored in the European Economic Area (EEA)?',
		section: 'INTL',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('See GDPR Chapter 4, Section 4, for DPO information.'),
		hasAdditional: false,
		id: 'INTL-02',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a data protection officer (DPO)?',
		section: 'INTL',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('See GDPR Chapter 5, Art. 46, for SCC information.'),
		hasAdditional: false,
		id: 'INTL-03',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Will you sign appropriate GDPR Standard Contractual Clauses (SCCs) with the institution?',
		section: 'INTL',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Just('See PIPL Chapter 1 for definitions.'),
		hasAdditional: false,
		id: 'INTL-04',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Will data be collected from or processed in or stored in China?',
		section: 'INTL',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('See PIPL Chapter 5 for requirements.'),
		hasAdditional: false,
		id: 'INTL-05',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you comply with PIPL security, privacy, and data localization requirements?',
		section: 'INTL',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DRPV-01',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Have you performed a Data Privacy Impact Assesssment for the solution/project?',
		section: 'DRPV',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DRPV-02',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Do you provide an end-user privacy notice about privacy policies and procedures that identify the purpose(s) for which personal information is collected, used, retained, and disclosed?',
		section: 'DRPV',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DRPV-03',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Do you describe the choices available to the individual and obtain implicit or explicit consent with respect to the collection, use, and disclosure of personal information?',
		section: 'DRPV',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('This includes quality assurance, marketing and advertising, etc.'),
		hasAdditional: false,
		id: 'DRPV-04',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you collect personal information only for the purpose(s) identified in the agreement with an institution or, if there is none, the purpose(s) identified in the privacy notice?',
		section: 'DRPV',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DRPV-05',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a documented list of personal data your service maintains?',
		section: 'DRPV',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DRPV-06',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you retain personal information for only as long as necessary to fulfill the stated purpose(s) or as required by law or regulation and thereafter appropriately dispose of such information?',
		section: 'DRPV',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Such processes would include descriptions of request processes individuals can follow to review thier information and written processes a data subject may use to ask for changes or corrections to data held about them.'),
		hasAdditional: false,
		id: 'DRPV-07',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Do you provide individuals with access to their personal information for review and update (i.e., data subject rights)?',
		section: 'DRPV',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DRPV-08',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you disclose personal information to third parties only for the purpose(s) identified in the privacy notice or with the implicit or explicit consent of the individual?',
		section: 'DRPV',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DRPV-09',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you protect personal information against unauthorized access (both physical and logical)?',
		section: 'DRPV',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DRPV-10',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you maintain accurate, complete, and relevant personal information for the purposes identified in the privacy notice?',
		section: 'DRPV',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DRPV-11',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have procedures to address privacy-related noncompliance complaints and disputes?',
		section: 'DRPV',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DRPV-12',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you \"anonymize,\" \"de-identify,\" or otherwise mask personal data?',
		section: 'DRPV',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DRPV-13',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Do you or your subprocessors use or disclose \"anonymized,\" \"de-identified,\" or otherwise masked data for any purpose other than those identified in the agreement with an institution (e.g., sharing with ad networks or data brokers, marketing, creation of profiles, analytics unrelated to services provided to institution)?',
		section: 'DRPV',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Provide evidence of existing processes or policies. The internal privacy policy should explain your organization\'s policies and practices regarding the collection of personal information and other data about individuals.'),
		hasAdditional: false,
		id: 'DRPV-14',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you certify stop-processing requests, including any data that is processed by a third party on your behalf?',
		section: 'DRPV',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DRPV-15',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have a process to review code for ethical considerations?',
		section: 'DRPV',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DPAI-01',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does your service use AI for the processing of institutional data?',
		section: 'DPAI',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DPAI-02',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Is any institutional data retained in AI processing?',
		section: 'DPAI',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DPAI-03',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you have agreements in place with third parties or subprocessors regarding the protection of customer data and use of AI?',
		section: 'DPAI',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DPAI-04',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Will institutional data be processed through a third party or subprocessor that also uses AI?',
		section: 'DPAI',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DPAI-05',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Is AI processing limited to fully licensed commercial enterprise AI services?',
		section: 'DPAI',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Just('Provide detailed response to the type of data needed for the AI service to function appropriately, the sources of the data, and whether any data shared with the AI service comes from data sources outside the institution.'),
		hasAdditional: false,
		id: 'DPAI-06',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Will institutional data be used or processed by any shared AI services?',
		section: 'DPAI',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DPAI-07',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you have safeguards in place to protect institutional data and data privacy from unintended AI queries or processing?',
		section: 'DPAI',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'DPAI-08',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Do you provide choice to the user to opt out of AI use?',
		section: 'DPAI',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('Answer \"yes\" even if you do not create your own machine learning solutions, and answer the questions as they apply to your contractual relationship with the third party you utilize.'),
		hasAdditional: false,
		id: 'AIQU-01',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: false,
		label: 'Does your solution leverage machine learning (ML) or do you plan to do so in the next 12 months?',
		section: 'AIQU',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('Answer \"yes\" even if you do not train your own LLM models, and answer the questions as they apply to your contractual relationship with the third party you utilize.'),
		hasAdditional: false,
		id: 'AIQU-02',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: false,
		label: 'Does your solution leverage a large language model (LLM) or do you plan to do so in the next 12 months?',
		section: 'AIQU',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Examples include NIST AI RMF, OWASP Top 10, RAFT, and MITRE ATLAS.'),
		hasAdditional: false,
		id: 'AIGN-01',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Does your solution have an AI risk model when developing or implementing your solution\'s AI model?',
		section: 'AIGN',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AIGN-02',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Can your solution\'s AI features be disabled by tenant and/or user?',
		section: 'AIGN',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AIGN-03',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Have your staff completed responsible AI training?',
		section: 'AIGN',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('Describe capabilities such as content (text, image, audio, speech, video, or code) generation, visual interpretation, and predictive analytics. This encompasses all AI implementations, including third-party AI geatures. Clarify use cases or limits of the model.'),
		hasAdditional: false,
		id: 'AIGN-04',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: false,
		label: 'Please describe the capabilities of your solution\'s AI features.',
		section: 'AIGN',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AIGN-05',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Does your solution support business rules to protect sensitive data from being ingested by the AI model?',
		section: 'AIGN',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AIPL-01',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Are your AI developer\'s policies, processes, procedures, and practices across the organization related to the mapping, measuring, and managing of AI risks conspicuously posted, unambiguous, and implemented effectively?',
		section: 'AIPL',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AIPL-02',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Have you identified and measured AI risks?',
		section: 'AIPL',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AIPL-03',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'In the event of an incident, can your solution\'s AI features be disabled in a timely manner?',
		section: 'AIPL',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AIPL-04',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'If disabled because of an incident, can your solution\'s AI features be re-enabled in a timely manner?',
		section: 'AIPL',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Responsible AI development per NIST AI RMF, page 25.'),
		hasAdditional: false,
		id: 'AIPL-05',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: true,
		label: 'Do you have documented technical and procedural processes to address potential negative impacts of AI as described by the AI Risk Management Framework (RMF)?',
		section: 'AIPL',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Please answer based on whether your AI model supports the removal or unlearning of sensitive data, whether it is introduced intentionally or unintentionally. Consider whether data can be traced and deleted from training sets, vector stores, memory, or other components of the AI system. This includes data removal in compliance with privacy regulations and customer requests.'),
		hasAdditional: false,
		id: 'AISC-01',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'If sensitive data is introduced to your solution\'s AI model, can the data be removed from the AI model by request?',
		section: 'AISC',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('No'),
		guidance: $elm$core$Maybe$Just('Please answer based on whether your solution uses user input data (e.g., prompts, uploads, queries) to fine-tune, train, or otherwise influence the behavior of your AI model. Consider any use of user data for model improvement, personalization, or aggregated learning.'),
		hasAdditional: false,
		id: 'AISC-02',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Is user input data used to influence your solution\'s AI model?',
		section: 'AISC',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Please answer based on whether your AI features generate audit logs that record user identity, timestamp, and actions taken. Include log retention, immutability, access for administrators or auditors, and how logs support compliance and incident response.'),
		hasAdditional: false,
		id: 'AISC-03',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$TextArea,
		isCritical: true,
		isScored: true,
		label: 'Do you provide logging for your solution\'s AI feature(s) that includes user, date, and action taken?',
		section: 'AISC',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Nothing,
		guidance: $elm$core$Maybe$Just('Please describe how your solution validates user inputs, including detection of anomalies, malicious inputs, and sensitive data. Indicate where validation occurs and how it supports security and compliance.'),
		hasAdditional: false,
		id: 'AISC-04',
		importance: $author$project$Questions$Unscored,
		inputType: $author$project$Questions$TextArea,
		isCritical: false,
		isScored: false,
		label: 'Please describe how you validate user inputs.',
		section: 'AISC',
		weight: 0
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AISC-05',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you plan for and mitigate supply-chain risk related to your AI features?',
		section: 'AISC',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Please answer based on whether training data is kept separate from production data to protect institutional information. Include how organizational data is segregated, anonymized, or excluded from training, and state whether institutions can opt out of data use for model improvement.'),
		hasAdditional: false,
		id: 'AIML-01',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you separate ML training data from your ML solution data?',
		section: 'AIML',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AIML-02',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you authenticate and verify your ML model\'s feedback?',
		section: 'AIML',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AIML-03',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Is your ML training data vetted, validated, and verified before training the solution\'s AI model?',
		section: 'AIML',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AIML-04',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Is your ML training data monitored and audited?',
		section: 'AIML',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AIML-05',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Have you limited access to your ML training data to only staff with an explicit business need?',
		section: 'AIML',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AIML-06',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Have you implemented adversarial training or other model defense mechanisms to protect your ML-related features?',
		section: 'AIML',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AIML-07',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you make your ML model transparent through documentation and log inputs and outputs?',
		section: 'AIML',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AIML-08',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you watermark your ML training data?',
		section: 'AIML',
		weight: 5
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AILM-01',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you limit your solution\'s LLM privileges by default?',
		section: 'AILM',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AILM-02',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Is your LLM training data vetted, validated, and verified before training the solution\'s AI model?',
		section: 'AILM',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AILM-03',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do any actions taken by your solution\'s LLM features or plugins require human intervention?',
		section: 'AILM',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AILM-04',
		importance: $author$project$Questions$Critical,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: true,
		isScored: true,
		label: 'Do you limit multiple LLM model plugins being called as part of a single input?',
		section: 'AILM',
		weight: 20
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AILM-05',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you limit your solution\'s LLM resource use per request, per step, and per action?',
		section: 'AILM',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Nothing,
		hasAdditional: false,
		id: 'AILM-06',
		importance: $author$project$Questions$Standard,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you leverage LLM model tuning or other model validation mechanisms?',
		section: 'AILM',
		weight: 10
	},
		{
		compliantResponse: $elm$core$Maybe$Just('Yes'),
		guidance: $elm$core$Maybe$Just('Looking for taint tracing or tracking of LLM plugins to mitigate malicious inputs tuning and prompt engineering.'),
		hasAdditional: false,
		id: 'AILM-07',
		importance: $author$project$Questions$Minor,
		inputType: $author$project$Questions$RadioYesNo,
		isCritical: false,
		isScored: true,
		label: 'Do you perform taint tracing or tracking on all plugin content related to the LLM?',
		section: 'AILM',
		weight: 5
	}
	]);
var $elm$core$Basics$round = _Basics_round;
var $author$project$Questions$sectionName = function (code) {
	switch (code) {
		case 'GNRL':
			return 'General Information';
		case 'COMP':
			return 'Company Information';
		case 'REQU':
			return 'Required Questions';
		case 'DOCU':
			return 'Documentation';
		case 'ITAC':
			return 'IT Accessibility';
		case 'THRD':
			return 'Assessment of Third Parties';
		case 'CONS':
			return 'Consulting Services';
		case 'APPL':
			return 'Application/Service Security';
		case 'AAAI':
			return 'Authentication, Authorization & Account Management';
		case 'CHNG':
			return 'Change Management';
		case 'DATA':
			return 'Data';
		case 'DCTR':
			return 'Datacenter';
		case 'FIDP':
			return 'Firewalls, IDS, IPS & Networking';
		case 'PPPR':
			return 'Policies, Processes & Procedures';
		case 'HFIH':
			return 'Incident Handling';
		case 'VULN':
			return 'Vulnerability Management';
		case 'HIPA':
			return 'HIPAA Compliance';
		case 'PCID':
			return 'PCI DSS';
		case 'OPEM':
			return 'On-Premises Data Solutions';
		case 'PRGN':
			return 'General Privacy';
		case 'PCOM':
			return 'Privacy Company Details';
		case 'PDOC':
			return 'Privacy Documentation';
		case 'PTHP':
			return 'Privacy of Third Parties';
		case 'PCHG':
			return 'Privacy Change Management';
		case 'PDAT':
			return 'Privacy of Sensitive Data';
		case 'PRPO':
			return 'Privacy Policies & Procedures';
		case 'INTL':
			return 'International Privacy';
		case 'DRPV':
			return 'Data Retention & Privacy';
		case 'DPAI':
			return 'Data Privacy AI';
		case 'AIQU':
			return 'AI Required Questions';
		case 'AIGN':
			return 'AI General';
		case 'AIPL':
			return 'AI Planning';
		case 'AISC':
			return 'AI Security';
		case 'AIML':
			return 'AI Machine Learning';
		case 'AILM':
			return 'AI Large Language Models';
		default:
			return code;
	}
};
var $author$project$Questions$sections = _List_fromArray(
	[
		_Utils_Tuple2('GNRL', 'General Information'),
		_Utils_Tuple2('COMP', 'Company Information'),
		_Utils_Tuple2('REQU', 'Required Questions'),
		_Utils_Tuple2('DOCU', 'Documentation'),
		_Utils_Tuple2('ITAC', 'IT Accessibility'),
		_Utils_Tuple2('THRD', 'Assessment of Third Parties'),
		_Utils_Tuple2('CONS', 'Consulting Services'),
		_Utils_Tuple2('APPL', 'Application/Service Security'),
		_Utils_Tuple2('AAAI', 'Authentication, Authorization & Account Management'),
		_Utils_Tuple2('CHNG', 'Change Management'),
		_Utils_Tuple2('DATA', 'Data'),
		_Utils_Tuple2('DCTR', 'Datacenter'),
		_Utils_Tuple2('FIDP', 'Firewalls, IDS, IPS & Networking'),
		_Utils_Tuple2('PPPR', 'Policies, Processes & Procedures'),
		_Utils_Tuple2('HFIH', 'Incident Handling'),
		_Utils_Tuple2('VULN', 'Vulnerability Management'),
		_Utils_Tuple2('HIPA', 'HIPAA Compliance'),
		_Utils_Tuple2('PCID', 'PCI DSS'),
		_Utils_Tuple2('OPEM', 'On-Premises Data Solutions'),
		_Utils_Tuple2('PRGN', 'General Privacy'),
		_Utils_Tuple2('PCOM', 'Privacy Company Details'),
		_Utils_Tuple2('PDOC', 'Privacy Documentation'),
		_Utils_Tuple2('PTHP', 'Privacy of Third Parties'),
		_Utils_Tuple2('PCHG', 'Privacy Change Management'),
		_Utils_Tuple2('PDAT', 'Privacy of Sensitive Data'),
		_Utils_Tuple2('PRPO', 'Privacy Policies & Procedures'),
		_Utils_Tuple2('INTL', 'International Privacy'),
		_Utils_Tuple2('DRPV', 'Data Retention & Privacy'),
		_Utils_Tuple2('DPAI', 'Data Privacy AI'),
		_Utils_Tuple2('AIQU', 'AI Required Questions'),
		_Utils_Tuple2('AIGN', 'AI General'),
		_Utils_Tuple2('AIPL', 'AI Planning'),
		_Utils_Tuple2('AISC', 'AI Security'),
		_Utils_Tuple2('AIML', 'AI Machine Learning'),
		_Utils_Tuple2('AILM', 'AI Large Language Models')
	]);
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $elm$core$String$toLower = _String_toLower;
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Main$computeScores = function (responses) {
	var toResult = function (q) {
		var answer = A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Dict$get, q.id, responses));
		var isAnswered = answer !== '';
		var isCompliant = function () {
			var _v1 = q.compliantResponse;
			if (_v1.$ === 'Just') {
				var cr = _v1.a;
				return _Utils_eq(
					$elm$core$String$toLower(answer),
					$elm$core$String$toLower(cr));
			} else {
				return false;
			}
		}();
		var isNA = $elm$core$String$toLower(answer) === 'n/a';
		var points = (isCompliant && (!isNA)) ? q.weight : 0;
		var potential = isNA ? 0 : q.weight;
		return {answer: answer, isAnswered: isAnswered, isCompliant: isCompliant, isNA: isNA, points: points, potential: potential, q: q};
	};
	var toFinding = function (r) {
		return {
			answer: r.answer,
			expected: A2($elm$core$Maybe$withDefault, '', r.q.compliantResponse),
			id: r.q.id,
			importance: r.q.importance,
			label: r.q.label
		};
	};
	var scored = A2(
		$elm$core$List$filter,
		function ($) {
			return $.isScored;
		},
		$author$project$Questions$questions);
	var results = A2($elm$core$List$map, toResult, scored);
	var totalActual = $elm$core$List$sum(
		A2(
			$elm$core$List$map,
			function ($) {
				return $.points;
			},
			results));
	var totalPotential = $elm$core$List$sum(
		A2(
			$elm$core$List$map,
			function ($) {
				return $.potential;
			},
			results));
	var unansweredCritical = A2(
		$elm$core$List$map,
		A2(
			$elm$core$Basics$composeL,
			function ($) {
				return $.id;
			},
			function ($) {
				return $.q;
			}),
		A2(
			$elm$core$List$filter,
			function (r) {
				return r.q.isCritical && (!r.isAnswered);
			},
			results));
	var overallPct = (!totalPotential) ? 0 : $elm$core$Basics$round((totalActual / totalPotential) * 100);
	var nonCompliant = A2(
		$elm$core$List$map,
		toFinding,
		A2(
			$elm$core$List$filter,
			function (r) {
				return r.isAnswered && ((!r.isCompliant) && (!r.isNA));
			},
			results));
	var critResults = A2(
		$elm$core$List$filter,
		A2(
			$elm$core$Basics$composeL,
			function ($) {
				return $.isCritical;
			},
			function ($) {
				return $.q;
			}),
		results);
	var critPotential = $elm$core$List$sum(
		A2(
			$elm$core$List$map,
			function ($) {
				return $.potential;
			},
			critResults));
	var critActual = $elm$core$List$sum(
		A2(
			$elm$core$List$map,
			function ($) {
				return $.points;
			},
			critResults));
	var critPct = (!critPotential) ? 0 : $elm$core$Basics$round((critActual / critPotential) * 100);
	var buildSectionScore = function (code) {
		var sectionResults = A2(
			$elm$core$List$filter,
			function (r) {
				return _Utils_eq(r.q.section, code);
			},
			results);
		var sUnanswered = $elm$core$List$length(
			A2(
				$elm$core$List$filter,
				function (r) {
					return r.q.isCritical && (!r.isAnswered);
				},
				sectionResults));
		var sPot = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.potential;
				},
				sectionResults));
		var sNonCompliant = A2(
			$elm$core$List$map,
			toFinding,
			A2(
				$elm$core$List$filter,
				function (r) {
					return r.isAnswered && ((!r.isCompliant) && (!r.isNA));
				},
				sectionResults));
		var sAct = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.points;
				},
				sectionResults));
		return {
			actual: sAct,
			name: $author$project$Questions$sectionName(code),
			nonCompliant: sNonCompliant,
			potential: sPot,
			unanswered: sUnanswered
		};
	};
	var bySection = A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, acc) {
				var code = _v0.a;
				return A3(
					$elm$core$Dict$insert,
					code,
					buildSectionScore(code),
					acc);
			}),
		$elm$core$Dict$empty,
		$author$project$Questions$sections);
	var answeredCount = $elm$core$List$length(
		A2(
			$elm$core$List$filter,
			function (q) {
				return A2($elm$core$Dict$member, q.id, responses);
			},
			$author$project$Questions$questions));
	return {answeredCount: answeredCount, bySection: bySection, critActual: critActual, critPct: critPct, critPotential: critPotential, nonCompliant: nonCompliant, overallPct: overallPct, totalActual: totalActual, totalPotential: totalPotential, unansweredCritical: unansweredCritical};
};
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$header = _VirtualDom_node('header');
var $elm$html$Html$nav = _VirtualDom_node('nav');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$Main$pctStr = function (pct) {
	return $elm$core$String$fromInt(pct) + '%';
};
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$Main$scoreClass = function (pct) {
	return (pct >= 80) ? 'good' : ((pct >= 50) ? 'warn' : 'bad');
};
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Main$CloseReport = {$: 'CloseReport'};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Main$questionLabel = function (qid) {
	return A2(
		$elm$core$Maybe$withDefault,
		qid,
		A2(
			$elm$core$Maybe$map,
			function ($) {
				return $.label;
			},
			$elm$core$List$head(
				A2(
					$elm$core$List$filter,
					function (q) {
						return _Utils_eq(q.id, qid);
					},
					$author$project$Questions$questions))));
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $author$project$Main$viewFinding = function (f) {
	var tagText = function () {
		var _v1 = f.importance;
		switch (_v1.$) {
			case 'Critical':
				return 'Critical';
			case 'Standard':
				return 'Standard';
			case 'Minor':
				return 'Minor';
			default:
				return '';
		}
	}();
	var tagCls = function () {
		var _v0 = f.importance;
		if (_v0.$ === 'Critical') {
			return 'finding-tag critical';
		} else {
			return 'finding-tag';
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('finding fail')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('finding-id')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(f.id)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('finding-text')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(f.label),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class(tagCls)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(tagText)
							]))
					]))
			]));
};
var $author$project$Main$viewReport = F2(
	function (model, scores) {
		var vendorName = A2(
			$elm$core$Maybe$withDefault,
			'Untitled Assessment',
			A2($elm$core$Dict$get, 'GNRL-01', model.responses));
		var unansweredEls = A2(
			$elm$core$List$map,
			function (qid) {
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('finding warn')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('finding-id')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(qid)
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('finding-text')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									$author$project$Main$questionLabel(qid))
								]))
						]));
			},
			scores.unansweredCritical);
		var unansweredEl = $elm$core$List$isEmpty(unansweredEls) ? A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('empty-findings')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('All critical questions answered')
				])) : A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('findings-list')
				]),
			unansweredEls);
		var sectionScoreCards = A2(
			$elm$core$List$filterMap,
			function (_v0) {
				var code = _v0.a;
				var name = _v0.b;
				return A2(
					$elm$core$Maybe$andThen,
					function (ss) {
						if (!ss.potential) {
							return $elm$core$Maybe$Nothing;
						} else {
							var pct = $elm$core$Basics$round((ss.actual / ss.potential) * 100);
							var fillCls = 'score-card-fill ' + $author$project$Main$scoreClass(pct);
							return $elm$core$Maybe$Just(
								A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('score-card')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('score-card-name')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(name)
												])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('score-card-bar')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class(fillCls),
															A2(
															$elm$html$Html$Attributes$style,
															'width',
															$author$project$Main$pctStr(pct))
														]),
													_List_Nil)
												])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('score-card-pct')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(
													$author$project$Main$pctStr(pct))
												]))
										])));
						}
					},
					A2($elm$core$Dict$get, code, scores.bySection));
			},
			$author$project$Questions$sections);
		var otherFindings = A2(
			$elm$core$List$take,
			40,
			A2(
				$elm$core$List$filter,
				function (f) {
					return !_Utils_eq(f.importance, $author$project$Questions$Critical);
				},
				scores.nonCompliant));
		var otherEl = $elm$core$List$isEmpty(otherFindings) ? A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('empty-findings')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('No other non-compliant answers')
				])) : A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('findings-list')
				]),
			A2($elm$core$List$map, $author$project$Main$viewFinding, otherFindings));
		var critFindings = A2(
			$elm$core$List$filter,
			function (f) {
				return _Utils_eq(f.importance, $author$project$Questions$Critical);
			},
			scores.nonCompliant);
		var findingsEl = $elm$core$List$isEmpty(critFindings) ? A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('empty-findings')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('No critical findings')
				])) : A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('findings-list')
				]),
			A2($elm$core$List$map, $author$project$Main$viewFinding, critFindings));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('modal-backdrop visible'),
					$elm$html$Html$Events$onClick($author$project$Main$CloseReport)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('report-modal'),
							A2(
							$elm$html$Html$Events$stopPropagationOn,
							'click',
							$elm$json$Json$Decode$succeed(
								_Utils_Tuple2($author$project$Main$CloseReport, false)))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('report-header')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('report-header-top')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$div,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$elm$html$Html$h2,
													_List_Nil,
													_List_fromArray(
														[
															$elm$html$Html$text('Security Assessment Report')
														])),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('report-sub')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(vendorName)
														]))
												])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('report-header-btns')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$button,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('btn-ghost-inv'),
															$elm$html$Html$Events$onClick($author$project$Main$CloseReport)
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Close')
														])),
													A2(
													$elm$html$Html$button,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('btn-ghost-inv'),
															$elm$html$Html$Events$onClick($author$project$Main$ExportDocx)
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('⬇ .docx')
														]))
												]))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('report-meta')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('report-meta-item')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('val')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															$author$project$Main$pctStr(scores.overallPct))
														])),
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('lbl')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Overall')
														]))
												])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('report-meta-item')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('val')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															$author$project$Main$pctStr(scores.critPct))
														])),
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('lbl')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Critical')
														]))
												])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('report-meta-item')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('val')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															$elm$core$String$fromInt(scores.totalActual))
														])),
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('lbl')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Points Earned')
														]))
												])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('report-meta-item')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('val')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															$elm$core$String$fromInt(scores.totalPotential))
														])),
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('lbl')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Points Possible')
														]))
												])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('report-meta-item')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('val')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															$elm$core$String$fromInt(
																$elm$core$List$length(scores.nonCompliant)))
														])),
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('lbl')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Non-Compliant')
														]))
												])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('report-meta-item')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('val')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															$elm$core$String$fromInt(
																$elm$core$List$length(scores.unansweredCritical)))
														])),
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('lbl')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Unanswered Critical')
														]))
												]))
										]))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('report-body')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('report-section-title')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Section Scores')
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('score-grid')
										]),
									sectionScoreCards),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('report-section-title')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Critical Findings')
										])),
									findingsEl,
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('report-section-title')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Unanswered Critical Questions')
										])),
									unansweredEl,
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('report-section-title')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Other Non-Compliant')
										])),
									otherEl
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('report-footer')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('btn btn-ghost'),
											$elm$html$Html$Events$onClick($author$project$Main$CloseReport)
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Close')
										])),
									A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('btn btn-accent'),
											$elm$html$Html$Events$onClick($author$project$Main$ExportDocx)
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('⬇ Export .docx')
										]))
								]))
						]))
				]));
	});
var $author$project$Main$ToggleSection = function (a) {
	return {$: 'ToggleSection', a: a};
};
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $author$project$Main$SetResponse = F2(
	function (a, b) {
		return {$: 'SetResponse', a: a, b: b};
	});
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$checked = $elm$html$Html$Attributes$boolProperty('checked');
var $author$project$Main$importanceBadge = function (imp) {
	switch (imp.$) {
		case 'Critical':
			return A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('badge badge-critical')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Critical')
					]));
		case 'Standard':
			return A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('badge badge-standard')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Standard')
					]));
		case 'Minor':
			return A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('badge badge-minor')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Minor')
					]));
		default:
			return $elm$html$Html$text('');
	}
};
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$label = _VirtualDom_node('label');
var $elm$html$Html$Attributes$name = $elm$html$Html$Attributes$stringProperty('name');
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$html$Html$Attributes$rows = function (n) {
	return A2(
		_VirtualDom_attribute,
		'rows',
		$elm$core$String$fromInt(n));
};
var $elm$html$Html$textarea = _VirtualDom_node('textarea');
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$Main$viewQuestion = F2(
	function (responses, q) {
		var guidanceEl = function () {
			var _v2 = q.guidance;
			if (_v2.$ === 'Just') {
				var g = _v2.a;
				return A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('guidance')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(g)
						]));
			} else {
				return $elm$html$Html$text('');
			}
		}();
		var critStar = q.isCritical ? A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('crit-star')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(' ★')
				])) : $elm$html$Html$text('');
		var answer = A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Dict$get, q.id, responses));
		var inputEl = function () {
			var _v1 = q.inputType;
			switch (_v1.$) {
				case 'RadioYesNo':
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('radio-group')
							]),
						A2(
							$elm$core$List$map,
							function (opt) {
								return A2(
									$elm$html$Html$label,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('radio-label')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$input,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$type_('radio'),
													$elm$html$Html$Attributes$name(q.id),
													$elm$html$Html$Attributes$value(opt),
													$elm$html$Html$Attributes$checked(
													_Utils_eq(answer, opt)),
													$elm$html$Html$Events$onInput(
													$author$project$Main$SetResponse(q.id))
												]),
											_List_Nil),
											$elm$html$Html$text(opt)
										]));
							},
							_List_fromArray(
								['Yes', 'No', 'N/A'])));
				case 'TextInput':
					return A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('text'),
								$elm$html$Html$Attributes$value(answer),
								$elm$html$Html$Events$onInput(
								$author$project$Main$SetResponse(q.id))
							]),
						_List_Nil);
				case 'EmailInput':
					return A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('email'),
								$elm$html$Html$Attributes$value(answer),
								$elm$html$Html$Events$onInput(
								$author$project$Main$SetResponse(q.id))
							]),
						_List_Nil);
				case 'TelInput':
					return A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('tel'),
								$elm$html$Html$Attributes$value(answer),
								$elm$html$Html$Events$onInput(
								$author$project$Main$SetResponse(q.id))
							]),
						_List_Nil);
				default:
					return A2(
						$elm$html$Html$textarea,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$rows(3),
								$elm$html$Html$Attributes$value(answer),
								$elm$html$Html$Events$onInput(
								$author$project$Main$SetResponse(q.id))
							]),
						_List_Nil);
			}
		}();
		var isCompliant = function () {
			var _v0 = q.compliantResponse;
			if (_v0.$ === 'Just') {
				var cr = _v0.a;
				return _Utils_eq(
					$elm$core$String$toLower(answer),
					$elm$core$String$toLower(cr)) && (answer !== '');
			} else {
				return false;
			}
		}();
		var isNonCompliant = (answer !== '') && ((!isCompliant) && ($elm$core$String$toLower(answer) !== 'n/a'));
		var cardClass = isCompliant ? 'question-card compliant' : (isNonCompliant ? 'question-card non-compliant' : 'question-card');
		var complianceDot = isCompliant ? A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('compliance-dot yes')
				]),
			_List_Nil) : (isNonCompliant ? A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('compliance-dot no')
				]),
			_List_Nil) : $elm$html$Html$text(''));
		var additionalEl = function () {
			if (q.hasAdditional) {
				var addId = q.id + '_add';
				var addAnswer = A2(
					$elm$core$Maybe$withDefault,
					'',
					A2($elm$core$Dict$get, addId, responses));
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('additional-info')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$label,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Additional Information')
								])),
							A2(
							$elm$html$Html$textarea,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$rows(2),
									$elm$html$Html$Attributes$value(addAnswer),
									$elm$html$Html$Events$onInput(
									$author$project$Main$SetResponse(addId))
								]),
							_List_Nil)
						]));
			} else {
				return $elm$html$Html$text('');
			}
		}();
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(cardClass),
					$elm$html$Html$Attributes$id('q-' + q.id)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('question-header')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('question-id')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(q.id)
								])),
							$author$project$Main$importanceBadge(q.importance),
							critStar,
							complianceDot
						])),
					A2(
					$elm$html$Html$label,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('question-label')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(q.label)
						])),
					guidanceEl,
					inputEl,
					additionalEl
				]));
	});
var $author$project$Main$viewSection = F3(
	function (model, scores, _v0) {
		var code = _v0.a;
		var name = _v0.b;
		var ss = A2($elm$core$Dict$get, code, scores.bySection);
		var sectionQs = A2(
			$elm$core$List$filter,
			function (q) {
				return _Utils_eq(q.section, code);
			},
			$author$project$Questions$questions);
		var scoreBadge = function () {
			if (ss.$ === 'Just') {
				var s = ss.a;
				if (!s.potential) {
					return A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('section-score-badge na')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('N/A')
							]));
				} else {
					var pct = $elm$core$Basics$round((s.actual / s.potential) * 100);
					var cls = 'section-score-badge ' + $author$project$Main$scoreClass(pct);
					return A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class(cls)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								$author$project$Main$pctStr(pct))
							]));
				}
			} else {
				return $elm$html$Html$text('');
			}
		}();
		var isCollapsed = A2($elm$core$Set$member, code, model.collapsed);
		var headerClass = isCollapsed ? 'section-header collapsed' : 'section-header';
		var bodyClass = isCollapsed ? 'section-body hidden' : 'section-body';
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('form-section'),
					$elm$html$Html$Attributes$id('section-' + code)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(headerClass),
							$elm$html$Html$Events$onClick(
							$author$project$Main$ToggleSection(code))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('section-title-row')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('section-code')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(code)
										])),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('section-title')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(name)
										])),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('section-count')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											' · ' + ($elm$core$String$fromInt(
												$elm$core$List$length(sectionQs)) + ' questions'))
										])),
									scoreBadge
								])),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('section-chevron')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('▾')
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(bodyClass)
						]),
					A2(
						$elm$core$List$map,
						$author$project$Main$viewQuestion(model.responses),
						sectionQs))
				]));
	});
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $author$project$Main$viewSidebarItem = F3(
	function (model, scores, _v0) {
		var code = _v0.a;
		var name = _v0.b;
		var ss = A2($elm$core$Dict$get, code, scores.bySection);
		var scoreEl = function () {
			if (ss.$ === 'Just') {
				var s = ss.a;
				if (!s.potential) {
					return $elm$html$Html$text('');
				} else {
					var pct = $elm$core$Basics$round((s.actual / s.potential) * 100);
					var cls = 'nav-score ' + $author$project$Main$scoreClass(pct);
					return A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class(cls)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								$author$project$Main$pctStr(pct))
							]));
				}
			} else {
				return $elm$html$Html$text('');
			}
		}();
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('nav-item'),
					$elm$html$Html$Events$onClick(
					$author$project$Main$ToggleSection(code)),
					A2($elm$html$Html$Attributes$attribute, 'data-section', code)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('nav-code')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(code)
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('nav-label')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(name)
						])),
					scoreEl
				]));
	});
var $author$project$Main$view = function (model) {
	var vendorName = A2(
		$elm$core$Maybe$withDefault,
		'Untitled Assessment',
		A2($elm$core$Dict$get, 'GNRL-01', model.responses));
	var totalQs = $elm$core$List$length($author$project$Questions$questions);
	var scores = $author$project$Main$computeScores(model.responses);
	var showReport = scores.answeredCount > 0;
	var overallPct = scores.overallPct;
	var scoreBarClass = 'score-bar-fill ' + $author$project$Main$scoreClass(overallPct);
	var critPct = scores.critPct;
	var answeredCount = scores.answeredCount;
	var progressPct = (!totalQs) ? 0 : $elm$core$Basics$round((answeredCount / totalQs) * 100);
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$header,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('page-header')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('header-top')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('header-left')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('header-meta')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('EDUCAUSE · HECVAT 4.14 · Solution Provider Assessment')
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('header-title')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(vendorName)
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('score-summary')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('score-pill overall')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$span,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('score-value')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(
														(!scores.totalPotential) ? '--%' : $author$project$Main$pctStr(overallPct))
													])),
												A2(
												$elm$html$Html$span,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('score-label')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Overall')
													]))
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('score-pill')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$span,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('score-value')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(
														(!scores.critPotential) ? '--%' : $author$project$Main$pctStr(critPct))
													])),
												A2(
												$elm$html$Html$span,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('score-label')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Critical')
													]))
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('score-pill')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$span,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('score-value')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(
														$elm$core$String$fromInt(answeredCount))
													])),
												A2(
												$elm$html$Html$span,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('score-label')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Answered')
													]))
											])),
										showReport ? A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('btn-report-header'),
												$elm$html$Html$Events$onClick($author$project$Main$OpenReport)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('⎷ View Report')
											])) : $elm$html$Html$text('')
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('score-bar-wrap')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class(scoreBarClass),
										A2(
										$elm$html$Html$Attributes$style,
										'width',
										$author$project$Main$pctStr(overallPct))
									]),
								_List_Nil)
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('progress-wrap')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('progress-fill'),
										A2(
										$elm$html$Html$Attributes$style,
										'width',
										$author$project$Main$pctStr(progressPct))
									]),
								_List_Nil)
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('header-stats')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(
										$elm$core$String$fromInt(answeredCount) + (' of ' + ($elm$core$String$fromInt(totalQs) + ' answered')))
									])),
								A2(
								$elm$html$Html$span,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(
										'Score: ' + ($elm$core$String$fromInt(scores.totalActual) + (' / ' + $elm$core$String$fromInt(scores.totalPotential))))
									])),
								A2(
								$elm$html$Html$span,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(
										'Critical: ' + ($elm$core$String$fromInt(scores.critActual) + (' / ' + $elm$core$String$fromInt(scores.critPotential))))
									])),
								A2(
								$elm$html$Html$span,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(
										$elm$core$String$fromInt(
											$elm$core$List$length(scores.nonCompliant)) + ' non-compliant')
									]))
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('layout')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$nav,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('sidebar')
							]),
						_Utils_ap(
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('sidebar-title')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Sections')
										]))
								]),
							A2(
								$elm$core$List$map,
								A2($author$project$Main$viewSidebarItem, model, scores),
								$author$project$Questions$sections))),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('form-area')
							]),
						_Utils_ap(
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('action-bar')
										]),
									_List_fromArray(
										[
											A2($elm$html$Html$div, _List_Nil, _List_Nil),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('action-group')
												]),
											_List_fromArray(
												[
													showReport ? A2(
													$elm$html$Html$button,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('btn btn-accent'),
															$elm$html$Html$Events$onClick($author$project$Main$OpenReport)
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('⎷ View Report')
														])) : $elm$html$Html$text(''),
													A2(
													$elm$html$Html$button,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('btn btn-ghost'),
															$elm$html$Html$Events$onClick($author$project$Main$ExportDocx)
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('⬇ Export .docx')
														]))
												]))
										]))
								]),
							A2(
								$elm$core$List$map,
								A2($author$project$Main$viewSection, model, scores),
								$author$project$Questions$sections)))
					])),
				model.reportOpen ? A2($author$project$Main$viewReport, model, scores) : $elm$html$Html$text('')
			]));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{
		init: $author$project$Main$init,
		subscriptions: function (_v0) {
			return $elm$core$Platform$Sub$none;
		},
		update: $author$project$Main$update,
		view: $author$project$Main$view
	});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));