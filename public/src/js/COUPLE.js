var COUPLE = React.createClass({displayName: "COUPLE",

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
      React.createElement("tr", {draggable: "true", onDragStart: this.handleDragStart, onDragOver: this.handleDragOver, onDragLeave: this.handleDragLeave, onDrop: this.handleDrop}, 
      	React.createElement("td", {style: {textAlign: 'center'}, align: "center"}, 
          data.map(function(e, i){
            var _data = e.data;
            return React.createElement(COLUMN, {posx: self.props.posx, posy: i, img: _data.img, link: _data.link + tracking, handleMouseOver: self.handleMouseOver});
          })
        )
      )
    );
  }
});