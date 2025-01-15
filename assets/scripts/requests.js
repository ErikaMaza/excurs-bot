import axios from 'axios'

export async function startParser(){
    axios.post("http:/localhost:2005", {funt: "start_parser"})
}
