var TAGS = {
    SINGLE: 1,
    COUPLE: 2,
    TITLE: 3,
    CATEGORIES: 4,
    PLAINTEXT: 5,
    HTMLCODE: 6,
    FOOTER: 7
};

var STORAGE_KEY = 'tkbNewsletter',
    DB_VERSION = 2;

var SAMPLE_DATA = {
    SINGLE: {
        tag: TAGS.SINGLE,
        data: {
            link: '#',
            img: 'http://dummyimage.com/655x150/c3e0a3/ffffff'
        }
    },
    COUPLE: {
        tag: TAGS.COUPLE,
        data: [{
            tag: TAGS.SINGLE,
            data: {
                link: '#',
                img: 'http://dummyimage.com/323x510/c3e0a3/ffffff'
            }
        }, {
            tag: TAGS.SINGLE,
            data: {
                link: '#',
                img: 'http://dummyimage.com/323x510/c3e0a3/ffffff'
            }
        }]
    },
    PLAINTEXT: {
        tag: TAGS.PLAINTEXT,
        data: {
            text: 'Lorem ipsum dolor sit amet, diam et mollis nec torquent vitae. Ipsum pharetra amet eu, ut porttitor interdum leo euismod volutpat, in integer vitae, eget potenti eget leo rhoncus. Cras sem. A elementum nascetur et praesent.',
            align: 'left'
        }
    },
    HTMLCODE: {
        tag: TAGS.HTMLCODE,
        data: {
            htmlCode: '<p>Lorem <b>ipsum dolor</b> sit amet, diam et mollis nec torquent vitae. <i>Ipsum pharetra amet eu, ut porttitor interdum leo euismod volutpat, in integer vitae, eget potenti eget leo rhoncus. Cras sem. A elementum nascetur et praesent.</i></p>'
        }
    }
};

var LANGUAGES = ['vn', 'en'];

var defaultElements = {
    vn: [{
        tag: TAGS.SINGLE,
        data: {
            link: 'https://ticketbox.vn/mobile-app',
            img: 'http://i.imgur.com/qSFFqdL.jpg'
        }
    }, {
        tag: TAGS.TITLE,
        data: {
            kind: 'eventTitleHot'
        }
    }, {
        tag: TAGS.TITLE,
        data: {
            kind: 'eventTitleNew'
        }
    }, {
        tag: TAGS.TITLE,
        data: {
            kind: 'eventTitleCategory'
        }
    }, {
        tag: TAGS.TITLE,
        data: {
            kind: 'eventTitleOther'
        }
    }, {
        tag: TAGS.CATEGORIES
    }, {
        tag: TAGS.FOOTER
    }],
    en: [{
        tag: TAGS.SINGLE,
        data: {
            link: 'https://ticketbox.vn/mobile-app',
            img: 'http://i.imgur.com/qSFFqdL.jpg'
        }
    }, {
        tag: TAGS.TITLE,
        data: {
            kind: 'eventTitleHot'
        }
    }, {
        tag: TAGS.TITLE,
        data: {
            kind: 'eventTitleNew'
        }
    }, {
        tag: TAGS.TITLE,
        data: {
            kind: 'eventTitleCategory'
        }
    }, {
        tag: TAGS.TITLE,
        data: {
            kind: 'eventTitleOther'
        }
    }, {
        tag: TAGS.CATEGORIES
    }, {
        tag: TAGS.FOOTER
    }]
};