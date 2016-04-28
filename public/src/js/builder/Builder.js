var Input = React.createClass({displayName: "Input",
  onChange: function(event){
    var value = event.target.value;
    var key = this.props.mkey;
    return this.props.handleChangeProperty(key,value);
  },
  render: function() {
    return (React.createElement("input", {className: "w-100", value: this.props.value, type: this.props.type, onChange: this.onChange}));
  }
});

var TextArea = React.createClass({displayName: "TextArea",
  onChange: function(event){
    var value = event.target.value;
    var key = this.props.mkey;
    return this.props.handleChangeProperty(key,value);
  },
  render: function() {
    return (React.createElement("textarea", {className: "w-100", rows: "3", onChange: this.onChange}, this.props.value));
  }
});

var Builder = React.createClass({displayName: "Builder",

  getInitialState: function() {
    this.props;
    return {
      blockType: TAGS.SINGLE
    };
  },

  changeBlockType: function(e){
    var val = e.target.value;
    this.setState({
      blockType: val
    });
  },

  addNewBlock: function(){
    return this.props.addNewBlock(parseInt(this.state.blockType));
  },

  exportNewsletter: function(){
    var content = '<!DOCTYPE HTML><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><title>Cơ hội cuối cùng để gặp huyền thoại thế giới trong tháng 12 này!</title> </head> <body style="margin: 0; padding: 0; border-spacing: 0px !important; font-family: Tahoma, sans-serif, Helvetica; font-size: 13px; color: #333333;"> <div style="background:url(http://i.imgur.com/crA7q0C.jpg) top left repeat-x #E2E2E2; " align="center">' + document.getElementById('content').innerHTML + '</div> </body> </html>';
    var a = document.createElement('a');
    a.href = "data:text/html;charset=UTF-8," + encodeURIComponent(content);
    a.target = '_blank';
    a.style.display = 'none';
    a.download = 'Newsletter-'+ this.props.sendDate + '_' + this.props.lang +'.html';
    document.body.appendChild(a);
    a.click();
  },

  exportJSON: function() {
    var elements = this.props.elements;
    var a = document.createElement('a');
    a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(elements));
    a.target = '_blank';
    a.style.display = 'none';
    a.download = 'Newsletter-'+ this.props.sendDate +'.json';
    document.body.appendChild(a);
    a.click();
  },

  handleSelectFile: function(evt){
    var self = this;
    var f = evt.target.files[0];
    // Only process image files.
    if (f.type == 'application/json') {
      var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
         JsonObj = JSON.parse(e.target.result);
         self.props.handleImportData(JsonObj);
        };
      })(f);
      reader.readAsText(f);
    } else {
      alert('Please select a JSON file');
      return false;
    }
  },

  handleDragOverTrash: function(e){
    var target = e.target;
    e.preventDefault();
    target.className = 'trash drag-over';
  },

  handleDragLeaveTrash: function(e){
    var target = e.target;
    target.className = 'trash';
  },

  handleDropToTrash: function(e){
    var target = e.target;
    target.className = 'trash';
    this.props.handleDeleteElement();
  },

  handleChangeProperty: function(key, value){
    var editedData = this.props.editingElement.data;
    editedData[key] = value;
    this.props.handleEditElement(editedData);
  },

  render: function() {
    var self = this,
        editingElement = this.props.editingElement;

    var editor = (function(){
        switch (editingElement.tag) {
            case TAGS.CATEGORIES:
                console.log(editingElement.data.kind);
                return React.createElement("tr", null, React.createElement("td", null, "a"), React.createElement("td", null, editingElement.data.kind));
                break;
            case TAGS.SINGLE:
                return editingElement.data.map(function(value, key) {
                    var label = '';
                    if (typeof(value) != 'function') {
                      if (key == 'link') {
                        label = 'Link to';
                      } else if(key == 'img'){
                        label = 'Image';
                      }
                      return  React.createElement("tr", null, React.createElement("td", null, label), React.createElement("td", null, 
                              React.createElement(Input, {type: "text", mkey: key, value: value, handleChangeProperty: self.handleChangeProperty})));
                    } else {
                      return;
                    };
                });
                break;
            case TAGS.PLAINTEXT: case TAGS.HTMLCODE:
                return editingElement.data.map(function(value, key) {
                    if (typeof(value) != 'function') {
                      if (key == 'align') {
                        return  React.createElement("tr", null, React.createElement("td", null, "Text align:"), React.createElement("td", null, 
                              React.createElement(Input, {type: "text", mkey: key, value: value, handleChangeProperty: self.handleChangeProperty})));
                      } else {
                        return  React.createElement("tr", null, React.createElement("td", {colSpan: "2"}, 
                              React.createElement(TextArea, {mkey: key, value: value, handleChangeProperty: self.handleChangeProperty})));
                      }
                      
                    } else {
                      return;
                    };
                });
                break;
            default:
                return;
        }
    })();

    return (
      React.createElement("div", {className: this.props.className, id: "builder", onMouseOver: this.props.hideContextMenu}, 
        React.createElement("div", {className: "docker"}, 
          React.createElement("table", {style: {width: '100%'}}, 
            React.createElement("tbody", null, 
              React.createElement("tr", null, 
                React.createElement("th", {colSpan: "2", style: {borderTop: 0}}, "Setting tool")
              ), 
              React.createElement("tr", null, 
                React.createElement("td", null, 
                  React.createElement("label", {className: "w-100"}, "Language:")
                ), 
                React.createElement("td", null, 
                  React.createElement("div", {className: "custom-select w-100"}, 
                    React.createElement("select", {value: this.props.lang, onChange: this.props.handleChangeLanguage}, 
                      React.createElement("option", {value: "vn"}, "Vietnam"), 
                      React.createElement("option", {value: "en"}, "English")
                    )
                  )
                )
              ), 
              React.createElement("tr", null, 
                React.createElement("td", null, 
                  React.createElement("label", null, 
                    "Send date:", React.createElement("br", null), 
                    React.createElement("small", {style: {color: '#ccc'}}, "(mm/dd/yy)")
                  )
                ), 
                React.createElement("td", null, 
                  React.createElement("input", {className: "w-100", value: this.props.sendDate, type: "date", onChange: this.props.handleChangeSendDate})
                )
              ), 
              React.createElement("tr", null, 
                React.createElement("td", {colSpan: "2", height: "10", style: {height: 10}})
              ), 
              React.createElement("tr", null, 
                React.createElement("th", {colSpan: "2"}, "Add Tool")
              ), 
              React.createElement("tr", null, 
                React.createElement("td", null, 
                  React.createElement("label", null, "Row type:")
                ), 
                React.createElement("td", null, 
                  React.createElement("div", {className: "add-row"}, 
                    React.createElement("div", {className: "custom-select"}, 
                      React.createElement("select", {value: this.state.blockType, onChange: this.changeBlockType}, 
                        React.createElement("option", {value: TAGS.SINGLE}, "Row 1 event"), 
                        React.createElement("option", {value: TAGS.COUPLE}, "Row 2 events"), 
                        React.createElement("option", {value: TAGS.PLAINTEXT}, "Plain Text"), 
                        React.createElement("option", {value: TAGS.HTMLCODE}, "Html code")
                      )
                    ), 
                    React.createElement("button", {onClick: this.addNewBlock}, "Add +")
                  )
                )
              ), 
              React.createElement("tr", null, 
                React.createElement("td", {colSpan: "2", height: "10", style: {height: 10}})
              )
            ), 
            React.createElement("tbody", null, 
              React.createElement("tr", null, 
                React.createElement("th", {colSpan: "2"}, "Edit Tool")
              ), 
              editor
            ), 
            React.createElement("tbody", null, 
              React.createElement("tr", null, 
                React.createElement("td", {colSpan: "2"}, 
                  React.createElement("div", {className: "trash", onDragOver: this.handleDragOverTrash, onDragLeave: this.handleDragLeaveTrash, onDrop: this.handleDropToTrash, draggable: "true"}, 
                    "Drop here to delete"
                  )
                )
              )
            )
          ), 
          React.createElement("table", {style: {width: '100%'}}, 
            React.createElement("tbody", null, 
              React.createElement("tr", null, 
                React.createElement("td", null, 
                  React.createElement("button", {className: "btn w-100", disabled: !this.props.hasCache, onClick: this.props.undoChanges}, "⤺ Undo")
                ), 
                React.createElement("td", null, 
                  React.createElement("button", {className: "btn w-100", onClick: this.props.resetElements}, "⟲ Clear")
                )
              ), 
              React.createElement("tr", null, 
                React.createElement("td", null, 
                  React.createElement("button", {className: "btn w-100", onClick: this.exportJSON}, "⇱ Export json")
                ), 
                React.createElement("td", null, 
                  React.createElement("button", {className: "btn w-100", onClick: this.exportNewsletter}, "⇱ View html")
                )
              ), 
              React.createElement("tr", null, 
                React.createElement("td", {colSpan: "2"}, 
                  React.createElement("input", {type: "file", onChange: this.handleSelectFile})
                )
              )
            )
          )
        )
      )
    );
  }
});