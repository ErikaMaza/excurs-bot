import axios from 'axios'

export async function startParser(){
    axios.post("http://127.0.0.1/", {funt: "start_parser"})
}