'use strict'

/**
 * Método que determina si una variable ha sido declarado e instanciada
 * @param {any} args
 * @returns {boolean}
 */
function isset(...args) {
	//  discuss at: http://locutus.io/php/isset/
	// original by: Kevin van Zonneveld (http://kvz.io)
	// improved by: FremyCompany
	// improved by: Onno Marsman (https://twitter.com/onnomarsman)
	// improved by: Rafał Kukawski (http://blog.kukawski.pl)
	//   example 1: isset( undefined, true)
	//   returns 1: false
	//   example 2: isset( 'Kevin van Zonneveld' )
	//   returns 2: true

	const a = args;
	const l = a.length;
	let i = 0;
	let undef;

	if (l === 0) {
		throw new Error('Empty isset');
	}

	while (i !== l) {
		if (a[i] === undef || a[i] === null) {
			return false;
		}
		i++;
	}

	return true;
}

/**
 * 
 * @param {any} mixedVar
 * @returns {boolean}
 */
function empty(mixedVar) {
	//  discuss at: http://locutus.io/php/empty/
	// original by: Philippe Baumann
	//    input by: Onno Marsman (https://twitter.com/onnomarsman)
	//    input by: LH
	//    input by: Stoyan Kyosev (http://www.svest.org/)
	// bugfixed by: Kevin van Zonneveld (http://kvz.io)
	// improved by: Onno Marsman (https://twitter.com/onnomarsman)
	// improved by: Francesco
	// improved by: Marc Jansen
	// improved by: Rafał Kukawski (http://blog.kukawski.pl)
	//   example 1: empty(null)
	//   returns 1: true
	//   example 2: empty(undefined)
	//   returns 2: true
	//   example 3: empty([])
	//   returns 3: true
	//   example 4: empty({})
	//   returns 4: true
	//   example 5: empty({'aFunc' : function () { alert('humpty'); } })
	//   returns 5: false

	let undef;
	let key;
	let i;
	let len;
	const emptyValues = [undef, null, false, 0, '', '0'];

	for (i = 0, len = emptyValues.length; i < len; i++) {
		if (mixedVar === emptyValues[i]) {
			return true
		}
	}

	if (typeof mixedVar === 'object') {
		for (key in mixedVar) {
			if (mixedVar.hasOwnProperty(key)) {
				return false
			}
		}
		return true
	}

	return false
}

/**
 * 
 * @param {any} mixedVar
 * @returns {boolean}
 */
function is_numeric (mixedVar) { // eslint-disable-line camelcase
	//  discuss at: http://locutus.io/php/is_numeric/
	// original by: Kevin van Zonneveld (http://kvz.io)
	// improved by: David
	// improved by: taith
	// bugfixed by: Tim de Koning
	// bugfixed by: WebDevHobo (http://webdevhobo.blogspot.com/)
	// bugfixed by: Brett Zamir (http://brett-zamir.me)
	// bugfixed by: Denis Chenu (http://shnoulle.net)
	//   example 1: is_numeric(186.31)
	//   returns 1: true
	//   example 2: is_numeric('Kevin van Zonneveld')
	//   returns 2: false
	//   example 3: is_numeric(' +186.31e2')
	//   returns 3: true
	//   example 4: is_numeric('')
	//   returns 4: false
	//   example 5: is_numeric([])
	//   returns 5: false
	//   example 6: is_numeric('1 ')
	//   returns 6: false
  
	const whitespace = [
	  ' ',
	  '\n',
	  '\r',
	  '\t',
	  '\f',
	  '\x0b',
	  '\xa0',
	  '\u2000',
	  '\u2001',
	  '\u2002',
	  '\u2003',
	  '\u2004',
	  '\u2005',
	  '\u2006',
	  '\u2007',
	  '\u2008',
	  '\u2009',
	  '\u200a',
	  '\u200b',
	  '\u2028',
	  '\u2029',
	  '\u3000'
	].join('')
  
	// @todo: Break this up using many single conditions with early returns
	return (typeof mixedVar === 'number' ||
	  (typeof mixedVar === 'string' &&
	  whitespace.indexOf(mixedVar.slice(-1)) === -1)) &&
	  mixedVar !== '' &&
	  !isNaN(mixedVar)
  }

module.exports = {
	isset,
	empty,
	is_numeric
}