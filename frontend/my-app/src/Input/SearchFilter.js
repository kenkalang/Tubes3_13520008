import './Addpenyakit.css';
import postAddPenyakit from '../post/postAddPenyakit';
import React,{ useState } from 'react';


const AddPenyakit = (props) => {
    const [caritanggal, setcaritanggal] = useState('');
    const [caripenyakit, setcaripenyakit] = useState('');
  
    const handleSearchTanggal = (event) => {
        setcaritanggal(event.target.value);
    };

    const handleSearchPenyakit = (event) => {
      setcaripenyakit(event.target.value);
    };

    const onFormSubmit = async (event) =>{
        if(caripenyakit === '' && caritanggal === ''){
          alert('Data tidak boleh kosong')
        }
        else{
          event.preventDefault();
          console.log("10000");
          const masukan = {
            caripenyakit : caripenyakit,
            caritanggal : caritanggal,
          }
          // const hasil = await fetch('http://localhost:8080/coba', config);
          const hasil = await postAddPenyakit(masukan);
          if (hasil.status === 200){
            alert("Berhasil mencari hasil")
          }
          else{
            alert('Gagal mencari hasil');
          }
        }
      };

    return(
        <>
        <header className="Mainjudul">Cari Hasil</header>
      <form onSubmit={onFormSubmit} className='MainInputan'>
        <table className="Masukan" align="center">
          <tr>
            <td>Masukkan Tanggal:</td><td>Masukkan Penyakit :</td>
          </tr>
          <tr>
            <td><input className="Inputan" type="text" name="caritanggal" value={caritanggal} onChange={handleSearchTanggal}/></td>
            <td><input className="Inputan" type="text" name="caripenyakit" value={caripenyakit} onChange={handleSearchPenyakit}/></td>
            <td><button className="SubmitButton">Submit</button></td>           
          </tr>
        </table>
      </form>
      </>
      )
    }

export default AddPenyakit;