class Evento {
     
    dolookup(ciudad){
        fetch('/lookup/')
.then(res => res.json())


.then (data => {
 console.log(data);
 return data;
}
    ) } }

export default Evento;



//mockap en mockachino====== 
