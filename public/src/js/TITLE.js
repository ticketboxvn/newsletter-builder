var TITLE = React.createClass({displayName: "TITLE",

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
    return (
      React.createElement("tr", {draggable: "true", onDragStart: this.handleDragStart, onDragOver: this.handleDragOver, onDragLeave: this.handleDragLeave, onDrop: this.handleDrop}, 
        React.createElement("td", {style: {padding: '0 5px'}}, 
          React.createElement("div", {style: {padding: '50px 0 10px'}}, 
            React.createElement("table", {className: "titleCategory", cellSpacing: 0, cellPadding: 0, width: "100%"}, 
              React.createElement("tbody", null, 
                React.createElement("tr", null, 
                  React.createElement("td", {align: "right", style: {width: '21%', minWidth: '10%'}}, 
                    React.createElement("div", {style: {width: '100%', height: 2}})
                  ), 
                  React.createElement("td", {align: "center", style: {width: 378, minWidth: 310}}, React.createElement("img", {src: this.props.img, alt: true, style: {width: '100%', minWidth: 310}})), 
                  React.createElement("td", {align: "left", style: {width: '21%', minWidth: '10%'}}, 
                    React.createElement("div", {style: {width: '100%', height: 2}})
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