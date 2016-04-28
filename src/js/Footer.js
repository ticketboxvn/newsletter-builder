var Footer = React.createClass({
  render: function() {
    
    var content = this.props.content;

    return (
      <div className="footer" style={{background: '#d5d7db'}}>
        <div style={{maxWidth: 665, margin: '0 auto'}} />
        <table cellSpacing={0} cellPadding={0} width="100%" align="center">
          <tbody>
            <tr>
              <td style={{paddingLeft: '5px', paddingRight: '5px', textAlign: 'center', fontSize: 10, lineHeight: '17px'}}>
                <p style={{paddingTop: '7px', paddingBottom: '7px'}} dangerouslySetInnerHTML={{__html: content.footerContent}}></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});