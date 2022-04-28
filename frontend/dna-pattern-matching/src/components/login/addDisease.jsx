import React from "react";
import loginImg from "../../login.svg";

export class AddDisease extends React.Component {
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Tambahkan Penyakit</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt='some value'/>
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="namapenyakit">Nama Penyakit</label>
              <input type="text" name="namapenyakit" placeholder="penyakit" />
            </div>
            <div className="form-group">
              <label htmlFor="dnasequence">Sequence DNA</label>
              <input type="file" name="dnasequence"/>
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn">
            Submit
          </button>
        </div>
      </div>
    );
  }
}
