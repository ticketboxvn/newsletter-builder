var Input = React.createClass({
  onChange: function(event){
    var value = event.target.value;
    var key = this.props.mkey;
    return this.props.handleChangeProperty(key,value);
  },
  render: function() {
    return (<input className="w-100" value={this.props.value} type={this.props.type} onChange={this.onChange} />);
  }
});

var TextArea = React.createClass({
  onChange: function(event){
    var value = event.target.value;
    var key = this.props.mkey;
    return this.props.handleChangeProperty(key,value);
  },
  render: function() {
    return (<textarea className="w-100" rows="3" onChange={this.onChange} >{this.props.value}</textarea>);
  }
});

var Builder = React.createClass({

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
                return <tr><td>a</td><td>{editingElement.data.kind}</td></tr>;
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
                      return  <tr><td>{label}</td><td>
                              <Input type='text' mkey={key} value={value} handleChangeProperty={self.handleChangeProperty} /></td></tr>;
                    } else {
                      return;
                    };
                });
                break;
            case TAGS.PLAINTEXT: case TAGS.HTMLCODE:
                return editingElement.data.map(function(value, key) {
                    if (typeof(value) != 'function') {
                      if (key == 'align') {
                        return  <tr><td>Text align:</td><td>
                              <Input type='text' mkey={key} value={value} handleChangeProperty={self.handleChangeProperty} /></td></tr>;
                      } else {
                        return  <tr><td colSpan="2">
                              <TextArea mkey={key} value={value} handleChangeProperty={self.handleChangeProperty} /></td></tr>;
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
      <div className={this.props.className} id="builder" onMouseOver={this.props.hideContextMenu}>
        <div className="docker">
          <table style={{width: '100%'}}>
            <tbody>
              <tr>
                <th colSpan="2" style={{borderTop: 0}}>Setting tool</th>
              </tr>
              <tr>
                <td>
                  <label className="w-100">Language:</label>
                </td>
                <td>
                  <div className="custom-select w-100">
                    <select value={this.props.lang} onChange={this.props.handleChangeLanguage}>
                      <option value="vn">Vietnam</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Send date:<br/>
                    <small style={{color: '#ccc'}}>(mm/dd/yy)</small>
                  </label>
                </td>
                <td>
                  <input className="w-100" value={this.props.sendDate} type="date" onChange={this.props.handleChangeSendDate}/>
                </td>
              </tr>
              <tr>
                <td colSpan="2" height="10" style={{height: 10}}></td>
              </tr>
              <tr>
                <th colSpan="2">Add Tool</th>
              </tr>
              <tr>
                <td>
                  <label>Row type:</label>
                </td>
                <td>
                  <div className="add-row">
                    <div className="custom-select">
                      <select value={this.state.blockType} onChange={this.changeBlockType}>
                        <option value={TAGS.SINGLE}>Row 1 event</option>
                        <option value={TAGS.COUPLE}>Row 2 events</option>
                        <option value={TAGS.PLAINTEXT}>Plain Text</option>
                        <option value={TAGS.HTMLCODE}>Html code</option>
                      </select>
                    </div>
                    <button onClick={this.addNewBlock}>Add &#43;</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="2" height="10" style={{height: 10}}></td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th colSpan="2">Edit Tool</th>
              </tr>
              {editor}
            </tbody>
            <tbody>
              <tr>
                <td colSpan="2">
                  <div className="trash" onDragOver={this.handleDragOverTrash} onDragLeave={this.handleDragLeaveTrash} onDrop={this.handleDropToTrash} draggable="true">
                    Drop here to delete
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table style={{width: '100%'}}>
            <tbody>
              <tr>
                <td>
                  <button className="btn w-100" disabled={!this.props.hasCache} onClick={this.props.undoChanges}>&#10554; Undo</button>
                </td>
                <td>
                  <button className="btn w-100" onClick={this.props.resetElements}>&#10226; Clear</button>
                </td>
              </tr>
              <tr>
                <td>
                  <button className="btn w-100" onClick={this.exportJSON}>&#8689; Export json</button>
                </td>
                <td>
                  <button className="btn w-100" onClick={this.exportNewsletter}>&#8689; View html</button>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input type="file" onChange={this.handleSelectFile} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});