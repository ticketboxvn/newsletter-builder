String.prototype.yymmdd = function() {
    var d = this.split('-');
    return d[0].replace('20', '') + '-' + d[1] + '-' + d[2];
};

Object.prototype.saveToStorage = function(name) {
    var data = JSON.stringify(this);
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem(name, data);
    }
};

// obj.map(function(value, key, obj) {})
Object.defineProperty(Object.prototype, 'map', {
    value: function(f, ctx) {
        ctx = ctx || this;
        var self = this, result = {};
        Object.keys(self).forEach(function(k) {
            result[k] = f.call(ctx, self[k], k, self); 
        });
        return result;
    }
});

Array.prototype.move = function(old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; //for testing purposes
};

window.Object.defineProperty(Element.prototype, 'documentOffsetTop', {
    get: function() {
        return this.offsetTop + (this.offsetParent ? this.offsetParent.documentOffsetTop : 0);
    }
});

window.Object.defineProperty(Element.prototype, 'documentOffsetLeft', {
    get: function() {
        return this.offsetLeft + (this.offsetParent ? this.offsetParent.documentOffsetLeft : 0);
    }
});

window.Object.defineProperty(Element.prototype, 'documentOffsetRight', {
    get: function() {
        return window.innerWidth - (this.offsetLeft + this.offsetWidth + (this.offsetParent ? this.offsetParent.documentOffsetLeft : 0));
    }
});

var _dragStartIndex = 0, _editTargetIndex = [], _editingIndex = [], _cacheState = null;

// a = clone(b)
function clone(obj) {
    if(obj === null || typeof(obj) != 'object')
        return obj;
    var temp = new obj.constructor(); 
    for(var key in obj)
        temp[key] = clone(obj[key]);    
    return temp;
}

function cacheState(state) {
    var obj = {
      hasCache: false,
      lang: state.lang,
      sendDate: state.sendDate,
      tracking: state.tracking,
      elements: state.elements
    };
    _cacheState = clone(obj);
}

function getLocalStorage(name){
  if(typeof(Storage) !== "undefined") {
    return JSON.parse(localStorage.getItem(name));
  } else {
    return null;
  }
}

function parseTracking(sendDate){
  return "?utm_medium=email&utm_campaign=newsletter-" + sendDate.yymmdd() + "&utm_source=newsletter";
}

var Newsletter = React.createClass({
  
  builderWidth: 300,

  getInitialState: function() {
    var data = this.props.data;
    var sendDate = '2016-01-20',
        lang = 'vn',
        elements = defaultElements;
    var storageData = getLocalStorage(STORAGE_KEY);
    if (storageData && storageData.version == DB_VERSION) {
      sendDate = storageData.sendDate;
      lang = storageData.lang;
      elements = storageData.elements;
    }
    return {
      hasCache: false,
      windowWidth: window.innerWidth,
      sendDate: sendDate,
      tracking: parseTracking(sendDate),
      lang: lang,
      common: data.common,
      content: data.languages[lang],
      elements: elements,
      contextMenuState: 0,
      contextMenuOffset: {
        top: 0,
        left: 0
      },
      editingElement: {},
      isEditing: false
    };
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  handleResize: function(e) {
    // set state
    this.setState({
      windowWidth: window.innerWidth
    });
  },

  addNewBlock: function(TYPE){
    var _this = this;
    // cache prev state
    cacheState(_this.state);
    // set state
    var elements = _this.state.elements;
    var newItem = {} ;
    switch(TYPE) {
        case TAGS.SINGLE: newItem = SAMPLE_DATA.SINGLE;
            break;
        case TAGS.COUPLE: newItem = SAMPLE_DATA.COUPLE;
            break;
        case TAGS.PLAINTEXT: newItem = SAMPLE_DATA.PLAINTEXT;
            break;
        case TAGS.HTMLCODE:  newItem = SAMPLE_DATA.HTMLCODE;
            break;
        default: break;
    }

    LANGUAGES.forEach(function(lang){
      var els = elements[lang];
      els.splice(els.length - 3, 0, clone(newItem));
    });

    _this.setState({
      hasCache: true,
      elements: elements
    });

    // save sate
    setTimeout(function(){
      _this.saveCurrentState();
    },10);
  },

  handleChangeLanguage: function(e){
    var _this = this;
    // cache prev state
    cacheState(_this.state);
    // set state
    var data = _this.props.data;
    var lang = e.target.value;
    _this.setState({
      hasCache: true,
      lang: lang,
      content: data.languages[lang]
    });
    // save sate
    setTimeout(function(){
      _this.saveCurrentState();
    },10);
  },

  handleChangeSendDate: function(e){
    var _this = this;
    var sendDate = e.target.value;
    if (sendDate) {
      // cache prev state
      cacheState(_this.state);
      // set state
      var tracking = parseTracking(sendDate);
      _this.setState({
        hasCache: true,
        sendDate: sendDate,
        tracking: tracking
      });
      // save sate
      setTimeout(function(){
        _this.saveCurrentState();
      },10);
    } else {
      alert('Pick a date!');
      e.target.value = this.state.sendDate;
      return false;
    }
  },

  handleDragStart: function(e){
    _dragStartIndex = e.props.posx;
    var target = e.getDOMNode();
    target.className = 'draging';
  },

  handleDrop: function(e){
    var _this = this,
        target = e.getDOMNode(),
        targetIndex = e.props.posx,
        elements = this.state.elements;

    // cache prev state
    cacheState(_this.state);
    // set state
    LANGUAGES.forEach(function(lang){
      var els = elements[lang];
      els.move(_dragStartIndex,targetIndex);
    });
    target.className = '';
    _this.setState({
      hasCache: true,
      elements: elements
    });
    // save sate
    setTimeout(function(){
      _this.saveCurrentState();
    },10);
  },

  handleDragOver: function(e){
    var target = e.getDOMNode();
    target.className = 'drag-over';
  },

  handleDragLeave: function(e){
    var target = e.getDOMNode();
    target.className = '';
  },

  handleDeleteElement: function(e){
    var _this = this;
    var elements = this.state.elements;
    // cache prev state
    cacheState(_this.state);
    // set state
    LANGUAGES.forEach(function(lang){
      var els = elements[lang];
      els.splice(_dragStartIndex,1);
    });
    _this.setState({
      hasCache: true,
      elements: elements
    });
    // save sate
    setTimeout(function(){
      _this.saveCurrentState();
    },10);
  },

  handleImportData: function(jsonData){
    var _this = this;
    // cache prev state
    cacheState(_this.state);
    // set state
    _this.setState({
      hasCache: true,
      elements: jsonData
    });
    // save sate
    setTimeout(function(){
      _this.saveCurrentState();
    },10);
  },

  handleMouseOver: function(e){
    var target = e.getDOMNode();
    if (!isNaN(e.props.posy) && e.props.posy > -1) {
      _editTargetIndex = [e.props.posx,e.props.posy];
    } else {
      _editTargetIndex = [e.props.posx];
    }
    
    this.setState({
      contextMenuOffset: {
        top: target.documentOffsetTop,
        right: target.documentOffsetRight
      },
      contextMenuState: 1
    });
  },

  toggleEditor: function(){
    var _currentElements = this.state.elements[this.state.lang], editingElement = {}, _editingIndex = _editTargetIndex;

    if (_editingIndex.length == 2) {
      editingElement = _currentElements[_editingIndex[0]].data[_editingIndex[1]];
    }else if (_editingIndex.length == 1){
      editingElement = _currentElements[_editingIndex[0]];
    }
    this.setState({
      isEditing: true,
      editingElement: editingElement
    });
  },

  handleEditElement: function(data) {
    var _this = this;
    // cache prev state
    cacheState(_this.state);
    // set state
    var elements = this.state.elements;
    var _currentElements = elements[this.state.lang];
    if (_editingIndex.length == 2) {
      _currentElements[_editingIndex[0]].data[_editingIndex[1]].data = data;
    }else if (_editingIndex.length == 1){
      _currentElements[_editingIndex[0]].data = data;
    }
    this.setState({
      hasCache: true,
      elements: elements
    });
    // save sate
    setTimeout(function(){
      _this.saveCurrentState();
    },10);
  },

  hideContextMenu: function(e){
    // this.setState({
    //   contextMenuState: 0
    // });
  },

  undoChanges: function(){
    var _this = this;
    if (_cacheState) {
      // set state
      _this.setState(_cacheState);
      _cacheState = null;
      // save sate
      setTimeout(function(){
        _this.saveCurrentState();
      },10);
    }
  },

  resetElements: function(){
    var confirmed = confirm("Want to reset?");
    if (confirmed) {
      var _this = this;
      // set state
      _this.setState({
        elements: defaultElements
      });
      // save sate
      setTimeout(function(){
        _this.saveCurrentState();
      },10);
    }
  },

  saveCurrentState: function(){
    var state = this.state;
    var obj = {
      version: DB_VERSION,
      sendDate: state.sendDate,
      lang: state.lang,
      elements: this.state.elements
    };
    obj.saveToStorage(STORAGE_KEY);
  },

  render: function(){

    var self = this;
    var common = this.props.data.common;
    var tracking = this.state.tracking;

    var elementProps = {
      handleDragStart: self.handleDragStart,
      handleDrop: self.handleDrop,
      handleDragOver: self.handleDragOver,
      handleDragLeave: self.handleDragLeave,
      handleMouseOver: self.handleMouseOver,
      handleMouseOut: self.handleMouseOut
    };

    var builderProps = {
      hasCache: self.state.hasCache,
      lang: self.state.lang,
      sendDate: self.state.sendDate,
      tracking: self.state.tracking,
      elements: self.state.elements,
      isEditing: self.state.isEditing,
      editingElement: self.state.editingElement,
      handleEditElement: self.handleEditElement,
      handleChangeLanguage: self.handleChangeLanguage,
      handleChangeSendDate: self.handleChangeSendDate,
      handleDeleteElement: self.handleDeleteElement,
      handleImportData: self.handleImportData,
      addNewBlock: self.addNewBlock,
      undoChanges: self.undoChanges,
      resetElements: self.resetElements,
      hideContextMenu: self.hideContextMenu
    };

    var contextMenuProps = {
      toggleEditor: self.toggleEditor,
      top: self.state.contextMenuOffset.top,
      right: self.state.contextMenuOffset.right,
      state: self.state.contextMenuState
    };

    return (
      <div className="email-wrapper">
        <div id="content" className='email-content' style={{width: this.state.windowWidth - this.builderWidth, textAlign: 'center', background: 'url(http://i.imgur.com/crA7q0C.jpg) top left repeat-x #E2E2E2'}}>
          <table cellPadding={0} cellSpacing={0} width="100%" background="http://i.imgur.com/crA7q0C.jpg" style={{backgroundRepeat: 'repeat-x'}}>
            <tbody>
              <tr>
                <td>
                  <center>
                    <div style={{maxWidth: 665, margin: '0 auto'}}>
                    	<table cellPadding={0} cellSpacing={0} style={{minWidth: 320, width: '100%'}} align="center">
                	    	<tbody>
                            <Header hotlineNumber={this.state.common.hotlineNumber} />
                            {this.state.elements[this.state.lang].map(function(tag, i){
                                var tagKind = tag.tag;
                                switch(tagKind) {
                                    case TAGS.CATEGORIES: return <CATEGORIES posx={i} {...elementProps} content={self.state.content}/>;
                                        break;
                                    case TAGS.PLAINTEXT: return <PLAINTEXT posx={i} {...elementProps} data={tag.data} />;
                                        break;
                                    case TAGS.HTMLCODE: return <HTMLCODE posx={i} {...elementProps} data={tag.data} />;
                                        break;
                                    case TAGS.COUPLE: return <COUPLE posx={i} {...elementProps} data={tag.data} common={self.state.common} tracking={tracking}/>;
                                        break;
                                    case TAGS.SINGLE: return <SINGLE posx={i} {...elementProps} data={tag.data} common={self.state.common} tracking={tracking}/>;
                                        break;
                                    case TAGS.TITLE: return <TITLE posx={i} {...elementProps} img={self.state.content[tag.data.kind]} />;
                                        break;
                                    case TAGS.FOOTER: return <BodyFooter posx={i} {...elementProps} content={self.state.content} />;
                                        break;
                                    default: return '';
                                }
                            })}
                	      </tbody>
                      </table>
                    </div>
                  </center>
                  <Footer content={this.state.content} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <ContextMenu {...contextMenuProps} />
        <Builder {...builderProps} className='email-builder' style={{width: this.builderWidth}}/>
      </div>
    )
  }
});