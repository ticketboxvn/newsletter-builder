var CATEGORIES = React.createClass({

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
    var content = this.props.content;
    return (
      <tr draggable="true" onDragStart={this.handleDragStart} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleDrop} onMouseOut={this.props.handleMouseOut}>
        <td style={{padding: '0 5px', textAlign: 'center'}} valign="top">
          <div style={{width: '100%', textAlign: 'center'}}>
            <div style={{display: 'inline-block', width: '26%', verticalAlign: 'top', textAlign: 'center', marginBottom: 30}}>
              <a className="img-link" href="https://ticketbox.vn/events?Categories=8%2C9%2C10%2C11%2C12" style={{textDecoration: 'none', color: '#333'}} target="_blank">
                <img src="http://i.imgur.com/AuwV5Be.png" alt style={{maxWidth: '100%'}} />
                <p style={{textTransform: 'uppercase', fontSize: 12}}>{content.cateEntertainment}</p>
              </a>
            </div>
            <div style={{display: 'inline-block', width: '26%', verticalAlign: 'top', textAlign: 'center', marginBottom: 30, marginRight: '7%', marginLeft: '7%'}}>
              <a className="img-link" href="https://ticketbox.vn/events?Categories=2%2C4" style={{textDecoration: 'none', color: '#333'}} target="_blank">
                <img src="http://i.imgur.com/Gnpcl45.png" alt style={{maxWidth: '100%'}} />
                <p style={{textTransform: 'uppercase', fontSize: 12}}>{content.cateLearning}</p>
              </a>
            </div>
            <div style={{display: 'inline-block', width: '26%', verticalAlign: 'top', textAlign: 'center', marginBottom: 30}}>
              <a className="img-link" href="https://ticketbox.vn/events?Categories=3%2C5%2C6%2C7%2C13" style={{textDecoration: 'none', color: '#333'}} target="_blank">
                <img src="http://i.imgur.com/D5P9e6v.png" alt style={{maxWidth: '100%'}} />
                <p style={{textTransform: 'uppercase', fontSize: 12}}>{content.cateEverythingElse}</p>
              </a>
            </div>
          </div>
          <div style={{width: '100%', textAlign: 'center'}}>
            <div style={{padding: '0 5px', textAlign: 'center', paddingBottom: 30}}>
              <a href="https://ticketbox.vn/events" style={{display: 'inline-block', padding: '15px 30px', textTransform: 'uppercase', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 'bold', background: '#90b933'}} target="_blank">{content.cateBrowseAll}</a>
            </div>
          </div>
        </td>
      </tr>
    );
  }
});