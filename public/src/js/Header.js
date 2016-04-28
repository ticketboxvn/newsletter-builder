var Header = React.createClass({displayName: "Header",
  render: function() {
    return (
      React.createElement("tr", null, 
        React.createElement("td", {height: "58", style: {paddingLeft: 5, paddingRight: 5}}, 
          React.createElement("table", {className: "header", cellPadding: 0, cellSpacing: 0, width: "100%"}, 
            React.createElement("tbody", null, 
              React.createElement("tr", null, 
                React.createElement("td", {style: {minWidth: 310, width: '100%', paddingTop: '10px', paddingRight: '0px', paddingBottom: '5px'}}, 
                  React.createElement("table", {cellPadding: 0, cellSpacing: 0, width: "100%"}, 
                    React.createElement("tbody", null, 
                      React.createElement("tr", null, 
                        React.createElement("td", {style: {textAlign: 'left'}}, 
                          React.createElement("a", {href: "https://ticketbox.vn/events", target: "_blank", style: {textDecoration: 'none'}}, React.createElement("img", {src: "http://i.imgur.com/jMG0A57.png", alt: "Ticketbox.vn"}))
                        ), 
                        React.createElement("td", {style: {textAlign: 'right'}}, 
                          React.createElement("table", {style: {float: 'right'}}, 
                            React.createElement("tbody", null, 
                              React.createElement("tr", null, 
                                React.createElement("td", null, "Hotline: ", this.props.hotlineNumber), 
                                React.createElement("td", null, 
                                  React.createElement("div", {style: {height: 16, width: 1, background: '#c6c6c6', marginRight: 5, marginLeft: 10}})
                                ), 
                                React.createElement("td", null, 
                                  React.createElement("a", {style: {textDecoration: 'none'}, target: "_blank", href: "https://www.facebook.com/ticketbox.vn/?ref=aymt_homepage_panel"}, React.createElement("img", {src: "http://i.imgur.com/3ItWVBr.png", alt: "Ticketbox's facebook", style: {border: 'none'}})), 
                                  React.createElement("a", {style: {textDecoration: 'none', paddingLeft: 4}, target: "_blank", href: "https://www.instagram.com/ticketbox_vn/"}, React.createElement("img", {src: "http://i.imgur.com/IJTYTog.png", alt: "Ticketbox's instagram"})), 
                                  React.createElement("a", {style: {textDecoration: 'none', paddingLeft: 4}, target: "_blank", href: "https://twitter.com/TicketboxVn"}, React.createElement("img", {src: "http://i.imgur.com/VKuydCK.png", alt: "Ticketbox's twitter"})), 
                                  React.createElement("a", {style: {textDecoration: 'none', paddingLeft: 4}, target: "_blank", href: "https://www.youtube.com/channel/UCke7Kezs4s8pw-17jPiQOOQ"}, React.createElement("img", {src: "http://i.imgur.com/VljmHHS.png", alt: "Ticketbox's youtube"}))
                                )
                              )
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    );
  }
});