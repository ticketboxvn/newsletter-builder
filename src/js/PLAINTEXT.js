var PLAINTEXT = React.createClass({

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

  handleMouseOver: function(e){
    e.preventDefault();
    return this.props.handleMouseOver(this);
  },

  render: function() {
    var data = this.props.data;
    return (
      <tr draggable="true" onDragStart={this.handleDragStart} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleDrop} onMouseOver={this.handleMouseOver}>
        <td style={{textAlign: data.align, paddingLeft: 6, paddingRight: 6}} align={data.align}>
          <p>{data.text}</p>
        </td>
      </tr>
    );
  }
});