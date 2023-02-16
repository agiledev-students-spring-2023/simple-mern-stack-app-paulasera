import { useState, useEffect } from 'react'
import './About.css'

/* A React component that represents the About page of the app. */ 
const About = props => {
    const [about, setAbout] = useState({})

    const fetchAbout = () => {
        fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
            .then(response => response.json())
            .then(data => {
                setAbout(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchAbout()
    }, [])

    return (
        <>
            <h1>About Me</h1>
            <h2>Paula A Seraphim</h2> 
            <br></br>
            <p> {about.text}</p>
            <p> {about.text2}</p>
            <p> {about.text3}</p>
            <p> {about.text4}</p>
            <img src={about.img_url}/>
            <p> {about.text5}</p>
            <p> {about.text6}</p>
            <p> {about.text7}</p>
            <p> {about.text8}</p>

        </>
    )
}

// make this component available to be imported into any other file
export default About
 