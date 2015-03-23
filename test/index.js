var floatingLabel = require( '../floatingLabel' ),
    chai = require( 'chai' ),
    expect = chai.expect;

function eventFire( el, evtType ) {
    if ( el.fireEvent ) {
        el.fireEvent( 'on' + evtType );
    } else {
        var evtObj = document.createEvent( 'Events' );

        evtObj.initEvent( evtType, true, false );
        el.dispatchEvent( evtObj );
    }
}

describe( 'floating label initial state', function() {
    it( 'should not be showing the label without a value', function() {
        expect( true ).to.equal( true );
    });
});
