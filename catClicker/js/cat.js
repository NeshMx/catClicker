// Model

var model = {
    currentCat: null,
    cats: [
        {
            clickCount: 0,
            name: 'Cat 1',
            imgSrc: 'img/cat1.jpg'
        },
        {
            clickCount: 0,
            name: 'Cat 2',
            imgSrc: 'img/cat2.jpg'
        },
        {
            clickCount: 0,
            name: 'Cat 3',
            imgSrc: 'img/cat3.jpg'
        },
        {
            clickCount: 0,
            name: 'Cat 4',
            imgSrc: 'img/cat4.jpg'
        },
        {
            clickCount: 0,
            name: 'Cat 5',
            imgSrc: 'img/cat5.jpg'
        }
    ]
};

// Octopus

var octopus = {
    init: function() {
        // Set our current cat to the first one in the list
        model.currentCat = model.cats[0]

        // Tell our views to initialize
        catListView.init();
        catView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // Set the currently selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // Increment the counter for the currently selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    }
};

// View

var catView = {
    init: function() {
        // Store pointer to our DOM elements for easy access later
        this.catElem =  document.getElementById('cat');
        this.catNameElem =  document.getElementById('cat-name');
        this.catImageElem =  document.getElementById('cat-img');
        this.countElem =  document.getElementById('cat-count');

        // On click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(e) {
            octopus.incrementCounter();
        });

        // Render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // Update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {
    init: function() {
        // Store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // Render this view (update the DOM elements with the right values)
        this.render();
    },

    render:  function() {
        // Get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // Empty the cat list
        this.catListElem.innerHTML = '';

        //Loop over the cats
        for (var i = 0; i < cats.length; i++) {
            // This is the cat we're currently looping over
            var cat = cats[i];

            // Make a new cat list item and set its text
            var elem = document.createElement('li');
            elem.textContent = cat.name;

            // On click, setCurrentCat and render the CatView
            /* (This uses our closure-in-a-loop trick to connect to the... )*/
            elem.addEventListener('click', (function(cat) {
                return function() {
                    octopus.setCurrentCat(cat);
                    catView.render();
                };
            })(cat));

            // Finally, add the element to the list
            this.catListElem.appendChild(elem);
        };
    }
};

// Make it go
octopus.init();