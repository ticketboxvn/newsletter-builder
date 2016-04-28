var BodyFooter = React.createClass({

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
    var content = this.props.content;
    return (
      <tr onDragStart={this.handleDragStart} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleDrop} draggable="true">
        <td>
          <p style={{textAlign: 'center', fontSize: 12, lineHeight: '20px', paddingTop: '10px', paddingRight: '20px', paddingBottom: '20px'}}><a href="https://ticketbox.vn" style={{fontWeight: 'bold', color: '#333', textDecoration: 'none'}} target="_blank">® Ticketbox 2015</a>
          <br />{content.developBy}</p>
        </td>
      </tr>
    );
  }
});