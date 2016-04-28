var TITLE = React.createClass({

  handleDragStart: function(){
    return this.props.handleDragStart(this);
  },

  handleDragOver: function(e){
    e.preventDefault();
    return this.props.handleDragOver(this);
  },

  handleDragLeave: function(){
    return this.props.handleDragLeave(this);
  },

  handleDrop: function(){
    return this.props.handleDrop(this);
  },

  render: function() {
    return (
      <tr draggable="true" onDragStart={this.handleDragStart} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleDrop}>
        <td style={{padding: '0 5px'}}>
          <div style={{padding: '50px 0 10px'}}>
            <table className="titleCategory" cellSpacing={0} cellPadding={0} width="100%">
              <tbody>
                <tr>
                  <td align="right" style={{width: '21%', minWidth: '10%'}}>
                    <div style={{width: '100%', height: 2}} />
                  </td>
                  <td align="center" style={{width: 378, minWidth: 310}}><img src={this.props.img} alt style={{width: '100%', minWidth: 310}} /></td>
                  <td align="left" style={{width: '21%', minWidth: '10%'}}>
                    <div style={{width: '100%', height: 2}} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    );
  }
});