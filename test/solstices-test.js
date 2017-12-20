require('mocha');
const expect = require('chai').expect;
const solstices = require('../app/solstices');

describe('Calculating solstices', () => {
    it('gets the previous summer solstice before winter solstice', (done) => {
        const now = new Date(1513812610204);
        const res = solstices.getPreviousSolstice(now);
        expect(res).to.be.ok;
        expect(res.getTime()).to.equal(1498011840000);
        done();
    });

    it('gets the previous winter solstice just after winter solstice', (done) => {
        const now = new Date(1513900080000);
        const res = solstices.getPreviousSolstice(now);
        expect(res).to.be.ok;
        expect(res.getTime()).to.equal(1513870080000);
        done();
    });

    it('gets the next solstice', (done) => {
        const now = new Date(1513900080000);
        const res = solstices.getNextSolstice(now);
        expect(res).to.be.ok;
        expect(res.getTime()).to.equal(1532160420000);
        done();
    });
});
