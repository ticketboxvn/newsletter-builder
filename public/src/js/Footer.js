var Footer = React.createClass({displayName: "Footer",
  render: function() {
    
    var content = this.props.content;

    return (
      React.createElement("div", {className: "footer", style: {background: '#d5d7db'}}, 
        React.createElement("div", {style: {maxWidth: 665, margin: '0 auto'}}), 
        React.createElement("table", {cellSpacing: 0, cellPadding: 0, width: "100%", align: "center"}, 
          React.createElement("tbody", null, 
            React.createElement("tr", null, 
              React.createElement("td", {style: {paddingLeft: '5px', paddingRight: '5px', textAlign: 'center', fontSize: 10, lineHeight: '17px'}}, 
                React.createElement("p", {style: {paddingTop: '7px', paddingBottom: '7px'}, dangerouslySetInnerHTML: {__html: content.footerContent}})
              )
            )
          )
        )
      )
    );
  }
});