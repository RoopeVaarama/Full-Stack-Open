import { useState, useEffect } from 'react'
import countryService from './services/countries';
import './App.css';
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {

    const [countries, setCountries] = useState(null)
    const [filter, setFilter] = useState('')

    useEffect(() => {
        console.log('effect')
        countryService.getAll().then(response => {
            console.log('promise fulfilled')
            setCountries(response.data)
        })
    }, [])


    return (
        <div>
            <Filter filter={filter} setFilter={setFilter} />
            <Countries countries={countries} filter={filter} setFilter={setFilter} />
        </div>
    )

}

export default App