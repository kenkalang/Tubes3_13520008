import axios from "../Axios";

const postAddPenyakit = async (datas) => {
    const result = await axios.post(`pencarian`, datas);
    return result;
    }
export default postAddPenyakit;