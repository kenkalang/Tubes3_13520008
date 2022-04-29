import axios from "../Axios";

const postTest = async (datas) => {
    const result = await axios.post(`coba`, datas);
    return result;
    }
export default postTest;