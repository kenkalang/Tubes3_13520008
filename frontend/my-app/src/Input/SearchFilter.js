import './Addpenyakit.css';
import postAddPenyakit from '../post/postAddPenyakit';
import React,{ useState } from 'react';


const AddPenyakit = (props) => {
    const [carihasil, setcarihasil] = useState('');
  
    const handleSearch = (event) => {
        setcarihasil(event.target.value);
    };

    const onFormSubmit = async (event) =>{
        if(carihasil === ''){
          alert('Data tidak boleh kosong')
        }
        else{
          event.preventDefault();
          console.log("10000");
          const masukan = {
            carihasil : carihasil,
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
            <td>Masukkan Kriteria:</td>
          </tr>
          <tr>
            <td><input className="Inputan" type="text" name="carihasil" value={carihasil} onChange={handleSearch}/></td>
            <td><button className="SubmitButton">Submit</button></td>           
          </tr>
        </table>
      </form>
      </>
      )
    }

export default AddPenyakit;