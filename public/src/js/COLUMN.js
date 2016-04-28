var COLUMN = React.createClass({displayName: "COLUMN",

  handleMouseOver: function(e){
    e.preventDefault();
    return this.props.handleMouseOver(this);
  },

  render: function() {
    var props = this.props;
    return (
      React.createElement("div", {style: {display: 'inline-block', minWidth: 323, paddingTop: 20, margin: '0 1px'}, onMouseOver: this.handleMouseOver}, 
        React.createElement("a", {className: "img-link", href: props.link, target: "_blank"}, 
        	React.createElement("img", {src: props.img, style: {maxWidth: '100%'}, alt: true})
        )
      )
    );
  }
});