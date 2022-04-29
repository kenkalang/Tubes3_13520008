import './SearchFilter.css';
import postPencarian from '../post/postPencarian';
import React,{ useState } from 'react';


const SearchFilter = (props) => {
    const [caritanggal, setcaritanggal] = useState('');
    const [caripenyakit, setcaripenyakit] = useState('');
    const [result , setResult] = useState([]);
  
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
          const hasil = await postPencarian(masukan);
          if (hasil.status === 200){
            alert("Berhasil mencari hasil")
            const Ketemu = hasil.data
            const resultData = Ketemu.map(person => (
                <p className='result'>
                    {person.date}-{person.nama}-{person.sakit}-{person.status}
                </p>
            ))
            setResult(resultData)
            console.log('hasil dari resultData',resultData)
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
          <tr>
            <td>*Format (YYYY-MM-DD)</td>
          </tr>
        </table>
      </form>
      <div>
          <h1 className='hasilLabel'>Hasil Pencarian</h1>
          {result}
      </div>
      </>
      )
    }

export default SearchFilter;