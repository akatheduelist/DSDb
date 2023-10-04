import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

import "./Search.css"

export default function Search () {
  const location = useLocation()
  const results = location.state.search

  return (
    <>
      <h1>Search Results...</h1>
      {results?.map(result => {
        return (
            <div className="search-result-card-container" key={result.id}>
            <div className="search-result-card-left">
            <span className="search-result-card-title"><Link to={`/vehicles/${result.id}`} target="_blank">{result.year} {result.make} {result.model}</Link></span>
            <span className="search-result-card-info mid-bold">Dougscore: {result.dougscore.dougscore_total}/100</span>
            <span className="search-result-card-info mid-bold">Daily Total: {result.dougscore.daily_total}/50</span>
            <span className="search-result-card-info mid-bold">Weekend Total: {result.dougscore.weekend_total}/50</span>
            <span className="search-result-card-info mid-bold">YouTube Review: <Link to={{ pathname: result.dougscore.video_link}} target="_blank">{result.dougscore.video_link}</Link></span>
           </div>
            <div className="search-result-card-right">
            <Link to={`/vehicles/${result.id}`} target="_blank"><img className="search-result-card-img" src={result.images[0].image_url} alt={result.model} /></Link>
            </div>
            </div>
        )
      })}
    </>
  )
}
