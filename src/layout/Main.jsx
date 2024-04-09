import React from 'react';
import { Movies } from '../components/Movies';
import { Preloader } from './Preloader'
import { Search } from '../components/Search'

const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends React.Component {
    state = {
        movies: [],
        loading: true,
    }

    componentDidMount(){
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=matrix`)
        .then(res => res.json())
        .then(data => this.setState({movies: data.Search, loading: false}))
        .catch((err) =>{
            console.error(err);
            this.setState({loading: false})
        })
    }

    searchMovies = (str, filter) =>{
        this.setState({loading: true})
        let query = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${str}`;
        if (filter !== 'all') {
            query += `&type=${filter}`;
        }
        fetch(query)
            .then(res => res.json())
            .then(data => this.setState({ movies: data.Search, loading: false }))
            .catch((err) =>{
                console.error(err);
                this.setState({loading: false})
            })
    }

    render() {

        const {movies, loading} = this.state;
        return <main className="content container">
            <Search searchMovies={this.searchMovies}/>
            {
                loading ? <Preloader/> : <Movies movies={movies} />
            }
        </main>
    }
}
export { Main };