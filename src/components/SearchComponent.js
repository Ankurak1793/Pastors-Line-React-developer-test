import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setSearchQuery, updateCurrentPage, setSearchResults, loadMoreContacts } from '../redux/actions';
import axios from 'axios';

const SearchComponent = ({ query, page, results, setSearchQuery, updateCurrentPage, setSearchResults, loadMoreContacts }) => {
  // useEffect(() => {
  //   handleSearch(); // Load initial page on component mount
  // }, [page]);

  useEffect(() => {
    if(query.length > 2) {
      setTimeout(() => {
        handleSearch();
      },500)
    }
  },[query]);

  const handleSearch = async () => {
    try {
      const companyId = 171;
      const countryId = 226;
      const response = await axios.get(`https://api.dev.pastorsline.com/api/contacts.json`, {
        params: {
          companyId,
          query,
          page,
          countryId,
        }
      });
      if (page === 1) {
        setSearchResults(response.data);
      } else {
        // Append to existing results for infinite scroll
        setSearchResults([...results, ...response.data]); 
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight - 1) {
      loadMoreContacts();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [results, page]);

  return (
    <div>
     <div className='m-2'>
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => {
                      e.preventDefault();
                      setSearchQuery(e.target.value)}
                    }
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {/* <div>
                <input
                    type="text"
                    placeholder="search..."
                    value={page}
                    onChange={(e) => updateCurrentPage(e.target.value)}
                />
            </div> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    query: state.query,
    page: state.page,
    results: state.results
  };
};

const mapDispatchToProps = {
  setSearchQuery,
  updateCurrentPage,
  setSearchResults,
  loadMoreContacts
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
