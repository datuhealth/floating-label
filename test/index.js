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

describe( 'the floating label initial state', function() {
    it( 'should not be floating without a value', function() {
        var noValueContainer = document.querySelector( 'div.initial.no-value' ),
            label = noValueContainer.querySelector( 'label' ),
            input = noValueContainer.querySelector( 'input' );

        expect( input.value ).to.equal( '' );
        expect( label.classList.contains( 'floating' )).to.equal( false );
    });

    it( 'should be floating with an initial value', function() {
        var noValueContainer = document.querySelector( 'div.initial.value' ),
            label = noValueContainer.querySelector( 'label' ),
            input = noValueContainer.querySelector( 'input' );

        expect( input.value ).to.equal( 'With value' );
        expect( label.classList.contains( 'floating' )).to.equal( true );
    });
});
