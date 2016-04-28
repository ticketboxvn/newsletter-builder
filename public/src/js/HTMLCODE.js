var HTMLCODE = React.createClass({displayName: "HTMLCODE",

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
    return (
      React.createElement("tr", {draggable: "true", onDragStart: this.handleDragStart, onDragOver: this.handleDragOver, onDragLeave: this.handleDragLeave, onDrop: this.handleDrop, onMouseOver: this.handleMouseOver}, 
        React.createElement("td", {style: {paddingLeft: 6, paddingRight: 6}, dangerouslySetInnerHTML: {__html: this.props.data.htmlCode}}
        )
      )
    );
  }
});