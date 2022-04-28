import React from "react";
import loginImg from "../../login.svg";

export class DNATest extends React.Component {
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Tes DNA</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt='some value'/>
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="pengguna">Nama Pengguna</label>
              <input type="text" name="pengguna" placeholder="nama" />
            </div>
            <div className="form-group">
              <label htmlFor="dnasequence">Sequence DNA</label>
              <input type="file" name="dnasequence" />
            </div>
            <div className="form-group">
              <label htmlFor="prediction">Prediksi Penyakit</label>
              <input type="text" name="prediction" placeholder="penyakit" />
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
