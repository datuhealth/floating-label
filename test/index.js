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

describe( 'initialization options', function() {
    it( 'should use a custom class', function() {
        floatingLabel.init({
            floatingClassName: 'custom-float'
        });

        floatingLabel.evaluateInputs();

        var noValueContainer = document.querySelector( 'div.initial.no-value' ),
            label = noValueContainer.querySelector( 'label' ),
            input = noValueContainer.querySelector( 'input' );

        expect( input.value ).to.equal( '' );
        expect( label.classList.contains( 'custom-float' )).to.equal( false );

        input.value = 'With value';

        eventFire( input, 'keypress' );

        expect( input.value ).to.equal( 'With value' );
        expect( label.classList.contains( 'custom-float' )).to.equal( true );
    });

    // We skip this test because mocking delegated events is hard
    // If you have a good way to do it, let us know!
    // it( 'should delegate events', function() {
    //     floatingLabel.init({
    //         floatingClassName: 'custom-float',
    //         delegateEvents: true
    //     });
    //
    //     var noValueContainer = document.querySelector( 'div.initial.no-value' ),
    //         label = noValueContainer.querySelector( 'label' ),
    //         input = noValueContainer.querySelector( 'input' );
    //
    //     input.value = '';
    //
    //     floatingLabel.evaluateInputs();
    //
    //     expect( input.value ).to.equal( '' );
    //     expect( label.classList.contains( 'custom-float' )).to.equal( false );
    //
    //     input.value = 'With value';
    //
    //     eventFire( document.body, 'keypress' );
    //
    //     expect( input.value ).to.equal( 'With value' );
    //     expect( label.classList.contains( 'custom-float' )).to.equal( true );
    // });
});

describe( 'the floating label initial state', function() {
    it( 'should not be floating without a value on an input', function() {
        floatingLabel.init({
            floatingClassName: 'floating'
        });

        var noValueContainer = document.querySelector( 'div.initial.no-value' ),
            label = noValueContainer.querySelector( 'label' ),
            input = noValueContainer.querySelector( 'input' );

        input.value = '';

        floatingLabel.evaluateInputs();

        expect( input.value ).to.equal( '' );
        expect( label.classList.contains( 'floating' )).to.equal( false );
    });

    it( 'should be floating with an initial value on an input', function() {
        floatingLabel.evaluateInputs();

        var noValueContainer = document.querySelector( 'div.initial.value' ),
            label = noValueContainer.querySelector( 'label' ),
            input = noValueContainer.querySelector( 'input' );

        expect( input.value ).to.equal( 'With value' );
        expect( label.classList.contains( 'floating' )).to.equal( true );
    });

    it( 'should not be floating without a value on a textarea', function() {
        floatingLabel.evaluateInputs();

        var noValueContainer = document.querySelector( 'div.initial.no-value.textarea' ),
            label = noValueContainer.querySelector( 'label' ),
            input = noValueContainer.querySelector( 'textarea' );

        expect( input.value ).to.equal( '' );
        expect( label.classList.contains( 'floating' )).to.equal( false );
    });

    it( 'should be floating with an initial value on a textarea', function() {
        floatingLabel.evaluateInputs();

        var noValueContainer = document.querySelector( 'div.initial.value.textarea' ),
            label = noValueContainer.querySelector( 'label' ),
            input = noValueContainer.querySelector( 'textarea' );

        expect( input.value ).to.equal( 'With value' );
        expect( label.classList.contains( 'floating' )).to.equal( true );
    });
});

describe( 'the label', function() {
    it( 'should float as text is entered via keyboard', function() {
        var noValueContainer = document.querySelector( 'div.initial.no-value' ),
            label = noValueContainer.querySelector( 'label' ),
            input = noValueContainer.querySelector( 'input' );

        input.value = '';

        floatingLabel.evaluateInputs();

        expect( input.value ).to.equal( '' );
        expect( label.classList.contains( 'floating' )).to.equal( false );

        input.value = 'New value entered';

        eventFire( input, 'keypress' );

        expect( input.value ).to.equal( 'New value entered' );
        expect( label.classList.contains( 'floating' )).to.equal( true );
    });

    // We skip this event because mocking the 'input' event is hard
    // If you have a good way to do it, let us know!
    // it( 'should float as text is entered via paste', function() {
    //     floatingLabel.evaluateInputs();
    //
    //     var noValueContainer = document.querySelector( 'div.initial.no-value' ),
    //         label = noValueContainer.querySelector( 'label' ),
    //         input = noValueContainer.querySelector( 'input' );
    //
    //     input.value = '';
    //     expect( input.value ).to.equal( '' );
    //     expect( label.classList.contains( 'floating' )).to.equal( false );
    //
    //     input.value = 'New value entered';
    //
    //     eventFire( input, 'input' );
    //
    //     expect( input.value ).to.equal( 'New value entered' );
    //     expect( label.classList.contains( 'floating' )).to.equal( true );
    // });
});
