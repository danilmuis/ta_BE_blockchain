import axios from 'axios';
const url = 'api/';


class handler{
    //load hash
    static loadHash(){
        return new Promise((resolve, reject) =>{
            try{
                //let url = 'http://127.0.0.1:9000/';
                
                const res =  axios.get(url);
                const data = res.data;
                console.log(data);
                resolve(
                    data.map(hash =>({
                        ...hash
                    }))
                );
            }catch(e){
                reject(e);
            }
        })
    }  
    static tes(){
        return axios.get(url).then(res => (this.info = res.data)).catch(err => console.log(err))
    }
    //send hash
    static sendHash(data){
        //let url = 'http://127.0.0.1:9000/send';
        return axios.post(`${url}send`,{
            data
        });
    }
    //find hash
    static findHash(data){
        return axios.post(`${url}find`,{
            data
        });
    }
}
export default handler;