var Header = React.createClass({
  render: function() {
    return (
      <tr>
        <td height="58" style={{paddingLeft: 5, paddingRight: 5}}>
          <table className="header" cellPadding={0} cellSpacing={0} width="100%">
            <tbody>
              <tr>
                <td style={{minWidth: 310, width: '100%', paddingTop: '10px', paddingRight: '0px', paddingBottom: '5px'}}>
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    <tbody>
                      <tr>
                        <td style={{textAlign: 'left'}}>
                          <a href="https://ticketbox.vn/events" target="_blank" style={{textDecoration: 'none'}}><img src="http://i.imgur.com/jMG0A57.png" alt="Ticketbox.vn" /></a>
                        </td>
                        <td style={{textAlign: 'right'}}>
                          <table style={{float: 'right'}}>
                            <tbody>
                              <tr>
                                <td>Hotline: {this.props.hotlineNumber}</td>
                                <td>
                                  <div style={{height: 16, width: 1, background: '#c6c6c6', marginRight: 5, marginLeft: 10}} />
                                </td>
                                <td>
                                  <a style={{textDecoration: 'none'}} target="_blank" href="https://www.facebook.com/ticketbox.vn/?ref=aymt_homepage_panel"><img src="http://i.imgur.com/3ItWVBr.png" alt="Ticketbox's facebook" style={{border: 'none'}} /></a>
                                  <a style={{textDecoration: 'none', paddingLeft: 4}} target="_blank" href="https://www.instagram.com/ticketbox_vn/"><img src="http://i.imgur.com/IJTYTog.png" alt="Ticketbox's instagram" /></a>
                                  <a style={{textDecoration: 'none', paddingLeft: 4}} target="_blank" href="https://twitter.com/TicketboxVn"><img src="http://i.imgur.com/VKuydCK.png" alt="Ticketbox's twitter" /></a>
                                  <a style={{textDecoration: 'none', paddingLeft: 4}} target="_blank" href="https://www.youtube.com/channel/UCke7Kezs4s8pw-17jPiQOOQ"><img src="http://i.imgur.com/VljmHHS.png" alt="Ticketbox's youtube" /></a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    );
  }
});