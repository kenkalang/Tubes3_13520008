import React from "react";

export class SearchFilter extends React.Component {
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Filter Hasil</div>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <input type="text" name="" placeholder="cari hasil" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn">
            Search
          </button>
        </div>
      </div>
    );
  }
}
