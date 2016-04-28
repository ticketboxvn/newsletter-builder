var COUPLE = React.createClass({

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
    return this.props.handleMouseOver(e);
  },

  render: function() {
    var self = this;
    var tracking = this.props.tracking;
    var data = this.props.data;
    return (
      <tr draggable="true" onDragStart={this.handleDragStart} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleDrop}>
      	<td style={{textAlign: 'center'}} align="center">
          {data.map(function(e, i){
            var _data = e.data;
            return <COLUMN posx={self.props.posx} posy={i} img={_data.img} link={_data.link + tracking} handleMouseOver={self.handleMouseOver}/>;
          })}
        </td>
      </tr>
    );
  }
});