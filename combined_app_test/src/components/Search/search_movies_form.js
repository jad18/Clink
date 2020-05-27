import SearchGeneralForm from './search_general_form.js';

class SearchMoviesForm extends SearchGeneralForm
{
    constructor(props)
    {
        super(props);
        sessionStorage.setItem("lastValidPage", "/search/movies");
    }
}

export default SearchMoviesForm;