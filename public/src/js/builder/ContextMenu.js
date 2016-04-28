var ContextMenu = React.createClass({displayName: "ContextMenu",
  render: function() {
    return (
      React.createElement("div", {className: "edit-menu", style: {display: this.props.state ? 'block' : 'none', top: this.props.top, right: this.props.right}}, 
        React.createElement("button", {onClick: this.props.toggleEditor}, "✎")
      )
    );
  }
});