// jest requires this syntax;
import * as utilities from './util';
const {
  makeTypes,
  qdHash36,
  formatPrice,
  getFullCart,
  getCartTotal
} = utilities;

describe('./util.js', () => {
  describe('makeTypes', () => {
    it('creates unique namespaces for react', () => {
      const nametypes = makeTypes('test', 'FIRST', 'SECOND', 'THIRD');
      expect(nametypes).toEqual({
        FIRST: 'test.FIRST',
        SECOND: 'test.SECOND',
        THIRD: 'test.THIRD'
      });
    });
  });
  describe('qdHash36', () => {
    it('creates a short hash out of a long string', () => {
      const gettysburgAddress = `Four score and seven years ago our 
      fathers brought forth on this continent, a new nation, conceived 
      in Liberty, and dedicated to the proposition that all men are 
      created equal.

      Now we are engaged in a great civil war, testing whether that 
      nation, or any nation so conceived and so dedicated, can long 
      endure. We are met on a great battle-field of that war. 
      We have come to dedicate a portion of that field, as a final 
      resting place for those who here gave their lives that that 
      nation might live. It is altogether fitting and proper that 
      we should do this.
      
      But, in a larger sense, we can not dedicate -- we can not 
      consecrate -- we can not hallow -- this ground. The brave men, 
      living and dead, who struggled here, have consecrated it, far 
      above our poor power to add or detract. The world will little 
      note, nor long remember what we say here, but it can never 
      forget what they did here. It is for us the living, rather, 
      to be dedicated here to the unfinished work which they who 
      fought here have thus far so nobly advanced. It is rather 
      for us to be here dedicated to the great task remaining 
      before us -- that from these honored dead we take increased 
      devotion to that cause for which they gave the last full measure 
      of devotion -- that we here highly resolve that these dead shall 
      not have died in vain -- that this nation, under God, shall have 
      a new birth of freedom -- and that government of the people, by 
      the people, for the people, shall not perish from the earth.`;
      expect(qdHash36(gettysburgAddress)).toBe('zhn6ae0');
    });
    it('creates a short hash out of a short string', () => {
      const georgeDubyaBush = 'They misunderestimated me.';
      expect(qdHash36(georgeDubyaBush)).toBe('rxk42h');
    });
  });
  describe('formatPrice', () => {
    it('formats the price to US currency', () => {
      expect(formatPrice(23)).toBe('$23.00');
      expect(formatPrice(9.993)).toBe('$9.99');
      expect(formatPrice(9.997)).toBe('$10.00');
      expect(formatPrice(0)).toBe('$0.00');
    });
  });
  describe('getFullCart', () => {
    it('merges ids with product records', () => {
      const cart = [
        { productId: 'a', quantity: 1 },
        { productId: 'b', quantity: 2 }
      ];
      const products = {
        a: { title: 'AAA', price: 10 },
        b: { title: 'BBB', price: 15 },
        c: { title: 'CCC', price: 21 }
      };
      expect(getFullCart({ cart, products })).toEqual([
        {
          productId: 'a',
          quantity: 1,
          title: 'AAA',
          price: 10
        },
        {
          productId: 'b',
          quantity: 2,
          title: 'BBB',
          price: 15
        }
      ]);
    });
  });
});
