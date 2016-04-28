var COLUMN = React.createClass({

  handleMouseOver: function(e){
    e.preventDefault();
    return this.props.handleMouseOver(this);
  },

  render: function() {
    var props = this.props;
    return (
      <div style={{display: 'inline-block', minWidth: 323, paddingTop: 20, margin: '0 1px'}} onMouseOver={this.handleMouseOver}>
        <a className='img-link' href={props.link} target="_blank">
        	<img src={props.img} style={{maxWidth: '100%'}} alt />
        </a>
      </div>
    );
  }
});