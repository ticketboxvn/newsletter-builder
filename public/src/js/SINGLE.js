var SINGLE = React.createClass({displayName: "SINGLE",

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
  	var common = this.props.common;
    var tracking = this.props.tracking;
    var data = this.props.data;
    return (
      React.createElement("tr", {draggable: "true", onDragStart: this.handleDragStart, onDragOver: this.handleDragOver, onDragLeave: this.handleDragLeave, onDrop: this.handleDrop, onMouseOver: this.handleMouseOver}, 
      	React.createElement("td", {style: {textAlign: 'center', paddingLeft: 6, paddingRight: 6}, align: "center"}, 
	        React.createElement("a", {className: "img-link", href: data.link + tracking, style: {textDecoration: 'none'}, target: "_blank"}, 
	        	React.createElement("img", {src: data.img, style: {width: '100%', minWidth: 310, marginTop: 20}})
	        )
        )
      )
    );
  }
});