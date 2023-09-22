import { Link } from "react-router-dom"
// import "../../node_modules/weather-icons/css/weather-icons.css"
// import { } from "react-feather"

const Home = () => {

  return (
    <>
      <Link to={"weather"}><button type="button">&lt;= Weather</button></Link>
      <Link to={"traffic"}><button type="button">Traffic =&gt;</button></Link>
    </>
  )
}

export default Home;