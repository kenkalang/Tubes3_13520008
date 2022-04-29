import './Masukan.css';
import postTest from '../post/postTest';
import React,{ useState } from 'react';


const Masukan = (props) => {
  const [nama, setNama] = useState('');
  const [dna, setDna] = useState('');
  const [sakit, setSakit] = useState('');


  const [presentase, setPresentase] = useState(0);
  const [status, setStatus] = useState('');
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const [finalNama, setFinalNama] = useState('');
  const [finalDna, setFinalDna] = useState('');
  const [finalSakit, setFinalSakit] = useState('');
  const [finalPresentase, setFinalPresentase] = useState(0);
  const [finalStatus, setFinalStatus] = useState('');

  const[isReponseSuccess,setResponseSuccess]= useState(false);

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
    switch (event.target.name) {
      case "nama":
        setNama(event.target.value);
        break;
      case "prediksi":
        setSakit(event.target.value);
        break;
    }
  };

  const onFormSubmit = async (event) =>{
    if(nama === '' || dna === '' || sakit === ''){
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
        nama : nama,
        dna : dna,
        sakit : sakit,
        date : date,
      }
      // const hasil = await fetch('http://localhost:8080/coba', config);
      const hasil = await postTest(masukan);
      if (hasil.status === 200){
        alert("Data berhasil ditest");
        console.log("JKBAJSBCIKNANCANCNKCLA");
        setPresentase(hasil.data.presentase);
        setStatus(hasil.data.status);
      }
      else{
        alert('Gagal mengambil data');
        // setPresentase(hasil.data.presentase);
        // setStatus(hasil.data.status);
        console.log("JKJBJKDANCKNCSABJKDSBFKJDSBCJKSBNC");
      }


    }
  };

    return(
      <>
    <header className="Mainjudul">TES DNA</header>
    <form onSubmit={onFormSubmit} className='MainInputan'>
      <table className="Masukan" align="center">
        <tr>
          <td>Nama Pengguna :</td><td>Sequence DNA :</td><td>Prediksi Penyakit :</td>
        </tr>
        <tr>
          <td><input className="Inputan" type="text" name="nama" value={nama} onChange={handleMasukan}/></td>
          
          <td>
            <input
                type="file" 
                className="InputanFile" 
                onChange={handleFileUpload}/>
          </td>
          <td><input className="Inputan" type="text" name="prediksi"value={sakit} onChange={handleMasukan}/></td>
        </tr>
        <tr>
          <td></td>
          <td><button className="SubmitButton">Submit</button></td>
        </tr>
        <tr><td></td>

          </tr>
      </table>
      

      {/* <div className='LabelInputan'>Nama Pengguna :
        <input className="Inputan" type='text' placeholder='Masukkan nama'/>
      </div>
      <div className='LabelInputan'>Sequence DNA :</div>
      <div className='LabelInputan'>Prediksi Penyakit :
        <input className="Inputan"type='text'/>
      </div> */}
      

    </form>
    <h1 className='hasilLabel'>Hasil
      <p className='result'>{date} - {nama} - {sakit} - {presentase}% - {status} - {dna}</p>
    </h1>
    </>
    )
}

export default Masukan;

// class Masukan extends React.Component{
//     constructor(props){
//       super(props);
//       this.state = {
//         nama: '',
//       }
//     } 
  
//     onChange(e){
//       let files = e.target.files;
//       let reader = new FileReader();
//       reader.readAsText(files[0]);
//       reader.onload = (e) => {
//         this.setState({
//           nama: e.target.result
//         })
//       }
//     }
  
//     render(){
//       return(
//       <div onSubmit={this.onFormSubmit} className='MainInputan'>
//         <table className="Masukan" align="center">
//           <tr>
//             <td>Nama Pengguna :</td><td>Sequence DNA :</td><td>Prediksi Penyakit :</td>
//           </tr>
//           <tr>
//             <td><input className="Inputan" type="text" name="nama"/></td>
//             {/* <td><input type="file" name="file" className="Inputan" onChange={(e)=>this.onChange(e)}> </input></td> */}
//             <td><input className="Inputan" type="text" name="prediksi"/></td>
//           </tr>
//         </table>
  
//         {/* <div className='LabelInputan'>Nama Pengguna :
//           <input className="Inputan" type='text' placeholder='Masukkan nama'/>
//         </div>
//         <div className='LabelInputan'>Sequence DNA :</div>
//         <div className='LabelInputan'>Prediksi Penyakit :
//           <input className="Inputan"type='text'/>
//         </div> */}
  
//       </div>
//       );
//     }
// }