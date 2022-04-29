import './Addpenyakit.css';
import postAddPenyakit from '../post/postAddPenyakit';
import React,{ useState } from 'react';


const AddPenyakit = (props) => {
    const [penyakit, setPenyakit] = useState('');
    const [dna, setDna] = useState('');
  
    const handleFileUpload = (event) => {
      event.preventDefault();
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        console.log(text);
        setDna(text);
      };
      reader.readAsText(event.target.files[0]);
    };
  
    const handleMasukan = (event) => {
        setPenyakit(event.target.value);
    };

    const onFormSubmit = async (event) =>{
        if(penyakit === '' || dna === ''){
          alert('Data tidak boleh kosong')
        }
        else{
          event.preventDefault();
          console.log("10000");
          // const config = {
          //   mode: 'no-cors',
          //   method: 'POST',
          //   body: JSON.stringify({
          //     nama,
          //     dna,
          //     sakit,
          //     date
          //   })
          // };
          const masukan = {
            penyakit : penyakit,
            sequence : dna,
          }
          // const hasil = await fetch('http://localhost:8080/coba', config);
          const hasil = await postAddPenyakit(masukan);
          if (hasil.status === 200){
            alert("Berhasil menambahkan penyakit")
            console.log("JKBAJSBCIKNANCANCNKCLA");
          }
          else{
            alert('Gagal menambahkan penyakit');
            console.log("JKJBJKDANCKNCSABJKDSBFKJDSBCJKSBNC");
          }
        }
      };

    return(
        <>
        <header className="Mainjudul">Tambahkan Penyakit</header>
      <form onSubmit={onFormSubmit} className='MainInputan'>
        <table className="Masukan" align="center">
          <tr>
            <td>Nama Penyakit :</td><td>Sequence DNA :</td>
          </tr>
          <tr>
            <td><input className="Inputan" type="text" name="penyakit" value={penyakit} onChange={handleMasukan}/></td>
            
            <td>
              <input
                  type="file" 
                  className="InputanFile" 
                  onChange={handleFileUpload}/>
            </td>
            <td><button className="SubmitButton">Submit</button></td>           
          </tr>
        </table>
      </form>
      </>
      )
    }

export default AddPenyakit;