var ContextMenu = React.createClass({
  render: function() {
    return (
      <div className="edit-menu" style={{display: this.props.state ? 'block' : 'none', top: this.props.top, right: this.props.right}}>
        <button onClick={this.props.toggleEditor}>&#x270E;</button>
      </div>
    );
  }
});