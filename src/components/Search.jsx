import React from 'react';

class Search extends React.Component {
  state = {
    search: '',
    filter: 'all',
    isValidSearch: false
  }

  handleKey = (e) => {
    if (e.key === 'Enter') {
      this.props.searchMovies(this.state.search, this.state.filter);
    }
  }

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value }, () => {
      this.props.searchMovies(this.state.search, this.state.filter);
    });
  }

  validateSearch = () => {
    const searchRegex = /^[a-zA-Z\s]*$/;
    const searchValue = this.state.search.trim();
    const isValid = searchValue.length > 0 && searchRegex.test(searchValue);

    this.setState({ isValidSearch: isValid });
  }

  render() {
    const { isValidSearch } = this.state;

    return (
      <div className="row">
        <div className="col s12">
          <div className="input-field">
            <input
              className="validate"
              placeholder='Friends'
              type="search"
              value={this.state.search}
              onChange={(e) => this.setState({ search: e.target.value }, this.validateSearch)}
              onKeyDown={this.handleKey}
            />
            <button className={`btn search-btn ${isValidSearch ? '' : 'disabled'}`} onClick={() => this.props.searchMovies(this.state.search, this.state.filter)}>Search</button>
          </div>
        </div>
        <form className='radio-btns'>
          <label>
            <input
              type='radio'
              value='all'
              checked={this.state.filter === 'all' && isValidSearch}
              onChange={this.handleFilterChange}
              disabled={!isValidSearch}
            />
            <span>All</span>
          </label>
          <label>
            <input
              type='radio'
              value='movie'
              checked={this.state.filter === 'movie' && isValidSearch}
              onChange={this.handleFilterChange}
              disabled={!isValidSearch}
            />
            <span>Movies</span>
          </label>
          <label>
            <input
              type='radio'
              value='series'
              checked={this.state.filter === 'series' && isValidSearch}
              onChange={this.handleFilterChange}
              disabled={!isValidSearch}
            />
            <span>Series</span>
          </label>
        </form>
      </div>
    )
  }
}

export { Search };