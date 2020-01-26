import React, {useState, useEffect} from 'react'

function DevForm({onSubmit}){

    const[latitude, setLatitude] = useState('')
    const[longitude, setLongitude] = useState('')
    const[github_username, setgithub_username] = useState('')
    const[techs, settechs] = useState('')

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const {latitude, longitude} = position.coords;
            setLatitude(latitude)
            setLongitude(longitude)
          },
          (err) =>{
            console.log(err);
          },
          {
            timeout:3000,
          } 
         )
        },[]);
    
        async function handleSubmit(e){
            e.preventDefault()
          await  onSubmit({
                github_username,
                techs,
                latitude,
                longitude
            });
            setgithub_username('')
            settechs('')
        }

    return (
        <form onSubmit={handleSubmit}>
                  
        <div className="input-block">
          <label htmlFor="github_username">Usuário do GitHub</label>
          <input name="github_username" id="github_username" required value={github_username} onChange={e => setgithub_username(e.target.value)}/>
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input className="techs" id="techs" required value={techs} onChange={e => settechs(e.target.value)}/>
        </div>

          <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input type="Number" className="latitude" id="latitude" required value={latitude} onChange={e => setLatitude(e.target.value)}/>
          </div>

          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input type="Number" className="longitude" id="longitude" required value={longitude} onChange={e => setLongitude(e.target.value)}/>
          </div>
        </div>
        <button type="submit">Salvar</button>
      </form>
    )
}

export default DevForm